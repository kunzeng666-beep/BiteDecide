import { FOOD_ITEMS } from '../data/foods';
import type {
  Flavor,
  FoodItem,
  MealTime,
  MoodTag,
  Scale,
  Temperature,
  Texture,
} from '../types/food';
import type { QuestionDimension } from '../types/question';
import {
  getCurrentMealTime,
  type EnvironmentContextData,
} from './amapWeather';

/** 用户在 4 步大厨问答中做出的偏好选择 */
export interface ChefAnswers {
  moodTags: MoodTag;
  flavor: Flavor;
  texture: Texture;
  scale: Scale;
}

/** 算分细节拆解（总基准分 100：用户偏好 82 分 + 环境适配 18 分） */
export interface ScoreBreakdown {
  flavor: number;
  scale: number;
  texture: number;
  mood: number;
  mealTime: number;
  climate: number;
  jitter: number;
}

/** 单道菜品的推荐结果（含匹配度与大厨解释语） */
export interface RecommendedFoodResult {
  food: FoodItem;
  totalScore: number;
  baseScore: number;
  matchPercent: number;
  breakdown: ScoreBreakdown;
  matchedDimensions: QuestionDimension[];
  reasonTags: string[];
  chefPitch: string;
}

/** 推荐引擎可选项 */
export interface RecommendOptions {
  /** 待推荐菜品库，默认使用内置 FOOD_ITEMS */
  foods?: readonly FoodItem[];
  /** 需要剔除的菜名（用于“换一批 / 换一道”） */
  excludeFoodNames?: readonly string[];
  /** 是否忽略环境因素（时段/天气/气温），仅按 4 项主观偏好算分 */
  ignoreEnvironment?: boolean;
  /** 可控随机扰动上限（默认 3.5 分，用于打破同分/近分固化） */
  jitterRange?: number;
  /** 返回结果最大数量（默认返回全部排序结果） */
  limit?: number;
  /** 注入随机数生成器（便于单元测试复现） */
  rng?: () => number;
}

/**
 * 分层权重配置（总基准分 = 100）：
 * - 用户偏好（82 分）：口味(26) + 规格(24) 决定底线不踩雷，口感(19) 次之，心情(13) 作情绪加成
 * - 环境因子（18 分）：用餐时段(10) + 气温天气(8)，提供温和引导而不一票否决
 */
export const SCORE_WEIGHTS = {
  flavor: 26,
  scale: 24,
  texture: 19,
  moodTags: 13,
  mealTime: 10,
  climate: 8,
} as const;

const DEFAULT_JITTER_RANGE = 3.5;

/** 同一食物拥有多个标签时，按数组先后顺序区分主属性与次属性 */
const POSITION_DECAY = [1.0, 0.85, 0.75] as const;

const SCALE_ORDER: readonly Scale[] = ['snack', 'simple', 'hearty', 'feast'];

const FLAVOR_LABELS: Record<Flavor, string> = {
  spicy: '麻辣过瘾',
  savory: '浓香咸鲜',
  sour: '酸爽开胃',
  mild: '清淡温和',
};

const TEXTURE_LABELS: Record<Texture, string> = {
  soup: '热汤暖胃',
  dry: '酱香十足',
  crispy: '酥脆过瘾',
  soft: '软糯好入口',
};

const SCALE_LABELS: Record<Scale, string> = {
  snack: '解馋轻份',
  simple: '一人刚好',
  hearty: '丰盛管饱',
  feast: '大餐排面',
};

function getPositionFactor(index: number): number {
  if (index <= 0) return POSITION_DECAY[0];
  if (index === 1) return POSITION_DECAY[1];
  return POSITION_DECAY[2];
}

function roundScore(value: number): number {
  return Math.round(value * 100) / 100;
}

function scoreFlavor(foodFlavors: readonly Flavor[], target: Flavor): {
  score: number;
  matched: boolean;
} {
  const idx = foodFlavors.indexOf(target);
  if (idx !== -1) {
    return {
      score: SCORE_WEIGHTS.flavor * getPositionFactor(idx),
      matched: true,
    };
  }

  // 用户明确想吃清淡温和时，给纯重辣食物温和降权，避免推荐踩雷
  if (target === 'mild' && foodFlavors[0] === 'spicy') {
    return { score: -4, matched: false };
  }

  // “清淡”与“咸鲜”之间、“麻辣”与“酸爽”之间有一定风味兼容性
  const isMildSavoryCompat =
    (target === 'mild' && foodFlavors.includes('savory')) ||
    (target === 'savory' && foodFlavors.includes('mild'));
  if (isMildSavoryCompat) {
    return { score: SCORE_WEIGHTS.flavor * 0.25, matched: false };
  }

  return { score: 0, matched: false };
}

function scoreScale(foodScales: readonly Scale[], target: Scale): {
  score: number;
  matched: boolean;
} {
  const idx = foodScales.indexOf(target);
  if (idx !== -1) {
    return {
      score: SCORE_WEIGHTS.scale * getPositionFactor(idx),
      matched: true,
    };
  }

  // 计算与理想份量的最小相邻距离（如“一人简餐”与“丰盛正餐”距离为 1，给 35% 兼容分）
  const targetIdx = SCALE_ORDER.indexOf(target);
  const minDistance = foodScales.reduce((best, item) => {
    const dist = Math.abs(SCALE_ORDER.indexOf(item) - targetIdx);
    return Math.min(best, dist);
  }, Number.POSITIVE_INFINITY);

  if (minDistance === 1) {
    return { score: SCORE_WEIGHTS.scale * 0.35, matched: false };
  }

  // 份量跨度过大（如想吃小点心却遇上满桌盛宴）略作降权
  if (minDistance >= 3) {
    return { score: -4, matched: false };
  }

  return { score: 0, matched: false };
}

function scoreTexture(foodTextures: readonly Texture[], target: Texture): {
  score: number;
  matched: boolean;
} {
  const idx = foodTextures.indexOf(target);
  if (idx !== -1) {
    return {
      score: SCORE_WEIGHTS.texture * getPositionFactor(idx),
      matched: true,
    };
  }

  // 汤水与软糯（如粥/馄饨）、酥脆与干拌（如煎炸/烤物）之间存在局部口感兼容
  const softSoupCompat =
    (target === 'soup' && foodTextures.includes('soft')) ||
    (target === 'soft' && foodTextures.includes('soup'));
  const dryCrispyCompat =
    (target === 'dry' && foodTextures.includes('crispy')) ||
    (target === 'crispy' && foodTextures.includes('dry'));

  if (softSoupCompat || dryCrispyCompat) {
    return { score: SCORE_WEIGHTS.texture * 0.25, matched: false };
  }

  return { score: 0, matched: false };
}

function scoreMood(foodMoods: readonly MoodTag[], target: MoodTag): {
  score: number;
  matched: boolean;
} {
  const idx = foodMoods.indexOf(target);
  if (idx !== -1) {
    return {
      score: SCORE_WEIGHTS.moodTags * getPositionFactor(idx),
      matched: true,
    };
  }
  return { score: 0, matched: false };
}

function scoreMealTime(foodMealTimes: readonly MealTime[], current: MealTime): number {
  // 用餐时段列表按早晚时间序排列，不区分主次，命中即得满分
  if (foodMealTimes.includes(current)) {
    return SCORE_WEIGHTS.mealTime;
  }

  // 温和过渡：下午茶时段兼容午餐/晚餐以防可选项过少；晚餐与夜宵、早午餐同理给予微弱过渡分
  const softBridges: Record<MealTime, readonly MealTime[]> = {
    breakfast: ['lunch'],
    lunch: ['tea', 'dinner'],
    tea: ['lunch', 'dinner'],
    dinner: ['lunch', 'supper'],
    supper: ['dinner'],
  };

  const hasBridge = softBridges[current].some((m) => foodMealTimes.includes(m));
  return hasBridge ? 3 : 0;
}

function getTempAffinityMap(effectiveTemp: number): Record<Temperature, number> {
  if (effectiveTemp < 14) {
    return { hot: 1.0, warm: 0.85, cool: 0.2, cold: 0.0 };
  }
  if (effectiveTemp < 24) {
    return { hot: 0.9, warm: 1.0, cool: 0.55, cold: 0.2 };
  }
  if (effectiveTemp < 30) {
    return { hot: 0.55, warm: 0.9, cool: 1.0, cold: 0.7 };
  }
  return { hot: 0.3, warm: 0.55, cool: 1.0, cold: 1.0 };
}

function scoreClimate(
  food: FoodItem,
  temperature: number,
  weather: string
): number {
  const isRainOrSnow =
    weather.includes('雨') || weather.includes('雪') || weather.includes('雹');
  const effectiveTemp = isRainOrSnow ? temperature - 4 : temperature;

  const affinity = getTempAffinityMap(effectiveTemp);
  const bestTempAffinity = food.temperature.reduce(
    (max, temp) => Math.max(max, affinity[temp]),
    0
  );

  let score = SCORE_WEIGHTS.climate * bestTempAffinity;

  // 雨雪天气下对汤水类热食额外贴合微调（不超过环境气候分上限）
  if (isRainOrSnow && food.texture.includes('soup')) {
    score = Math.min(SCORE_WEIGHTS.climate, score + 1.5);
  }

  return score;
}

function buildRecommendationReason(
  food: FoodItem,
  answers: ChefAnswers,
  env: {
    temperature: number;
    weather: string;
    mealTime: MealTime;
    mealTimeLabel: string;
    ignoreEnvironment: boolean;
  },
  matchedDimensions: QuestionDimension[]
): { reasonTags: string[]; chefPitch: string } {
  const isRainOrSnow =
    !env.ignoreEnvironment &&
    (env.weather.includes('雨') || env.weather.includes('雪'));
  const isHotWeather = !env.ignoreEnvironment && env.temperature >= 28;
  const isCoolFood =
    food.temperature.includes('cool') || food.temperature.includes('cold');
  const isWarmFood =
    food.temperature.includes('hot') || food.temperature.includes('warm');

  let envLead = '';
  let highlightEnvTag = '';
  let normalEnvTag = '';
  if (!env.ignoreEnvironment) {
    if (isRainOrSnow && isWarmFood) {
      highlightEnvTag = '雨天暖胃';
      envLead = `外面${env.weather}微凉，正适合来份热乎的`;
    } else if (isHotWeather && isCoolFood) {
      highlightEnvTag = '清爽解暑';
      envLead = `这会儿 ${env.temperature}°C 有点闷热，吃点清爽的最舒坦`;
    } else if (isHotWeather && answers.flavor === 'spicy') {
      envLead = `热天偏要吃口过瘾的`;
    } else if (env.mealTime === 'supper' && food.mealTime.includes('supper')) {
      highlightEnvTag = '夜宵绝配';
      envLead = `深夜烟火气正浓，这份夜宵最慰藉`;
    } else if (env.mealTime === 'breakfast' && food.mealTime.includes('breakfast')) {
      highlightEnvTag = '元气早餐';
      envLead = `清晨赶着开局，来份踏实的刚好`;
    } else if (env.mealTime === 'tea' && food.mealTime.includes('tea')) {
      highlightEnvTag = '午后小憩';
      envLead = `下午茶时间到了，用它解解馋最惬意`;
    } else if (food.mealTime.includes(env.mealTime)) {
      normalEnvTag = `贴合${env.mealTimeLabel}`;
    }
  }

  const reasonTags: string[] = [];
  if (matchedDimensions.includes('flavor')) {
    reasonTags.push(FLAVOR_LABELS[answers.flavor]);
  }
  if (highlightEnvTag) {
    reasonTags.push(highlightEnvTag);
  }
  if (matchedDimensions.includes('texture')) {
    reasonTags.push(TEXTURE_LABELS[answers.texture]);
  }
  if (matchedDimensions.includes('scale')) {
    reasonTags.push(SCALE_LABELS[answers.scale]);
  }
  if (normalEnvTag) {
    reasonTags.push(normalEnvTag);
  }

  let moodClause = '';
  if (matchedDimensions.includes('moodTags')) {
    switch (answers.moodTags) {
      case 'stressed':
        moodClause =
          answers.flavor === 'spicy' || answers.texture === 'crispy'
            ? '够味又解压，一口把烦躁统统甩掉'
            : '用实在的好味道帮你把压力卸下来';
        break;
      case 'tired':
        moodClause = '今天辛苦了，吃点温润顺口、不用费神的最治愈';
        break;
      case 'reward':
        moodClause = '心情这么好，就该用这顿有仪式感的美味好好犒劳自己';
        break;
      case 'casual':
        moodClause = '不纠结不折腾，稳稳当当吃得舒心';
        break;
    }
  }

  const flavorTexturePart = [
    matchedDimensions.includes('flavor') ? FLAVOR_LABELS[answers.flavor] : '',
    matchedDimensions.includes('texture') ? TEXTURE_LABELS[answers.texture] : '',
  ]
    .filter(Boolean)
    .join('又');

  const parts: string[] = [];
  if (envLead) parts.push(envLead);
  if (moodClause) {
    parts.push(moodClause);
  } else if (flavorTexturePart) {
    parts.push(`主打一个${flavorTexturePart}，很贴你现在胃口`);
  } else {
    parts.push(`综合口味与份量最稳妥，盲选也不踩雷`);
  }

  return {
    reasonTags: reasonTags.slice(0, 3),
    chefPitch: `${parts.join('，')}！`,
  };
}

/**
 * 为单道菜品计算与当前偏好及环境的综合得分
 */
export function scoreSingleFood(
  food: FoodItem,
  answers: ChefAnswers,
  envContext: EnvironmentContextData | null,
  options: Pick<RecommendOptions, 'ignoreEnvironment' | 'jitterRange' | 'rng'> = {}
): RecommendedFoodResult {
  const ignoreEnvironment = options.ignoreEnvironment ?? false;
  const jitterRange = options.jitterRange ?? DEFAULT_JITTER_RANGE;
  const rng = options.rng ?? Math.random;

  const fallbackMeal = getCurrentMealTime();
  const mealTime = envContext?.mealTime ?? fallbackMeal.mealTime;
  const mealTimeLabel = envContext?.mealTimeLabel ?? fallbackMeal.label;
  const temperature = envContext?.temperature ?? 20;
  const weather = envContext?.weather ?? '晴';

  const flavorRes = scoreFlavor(food.flavor, answers.flavor);
  const scaleRes = scoreScale(food.scale, answers.scale);
  const textureRes = scoreTexture(food.texture, answers.texture);
  const moodRes = scoreMood(food.moodTags, answers.moodTags);

  const mealTimeScore = ignoreEnvironment
    ? 0
    : scoreMealTime(food.mealTime, mealTime);
  const climateScore = ignoreEnvironment
    ? 0
    : scoreClimate(food, temperature, weather);

  const jitter = jitterRange > 0 ? rng() * jitterRange : 0;

  const rawBaseScore =
    flavorRes.score +
    scaleRes.score +
    textureRes.score +
    moodRes.score +
    mealTimeScore +
    climateScore;

  const maxPossibleBase = ignoreEnvironment
    ? SCORE_WEIGHTS.flavor +
      SCORE_WEIGHTS.scale +
      SCORE_WEIGHTS.texture +
      SCORE_WEIGHTS.moodTags
    : 100;

  const clampedBase = Math.max(0, rawBaseScore);
  const matchPercent = Math.min(
    99,
    Math.max(55, Math.round((clampedBase / maxPossibleBase) * 100))
  );

  const matchedDimensions: QuestionDimension[] = [];
  if (flavorRes.matched) matchedDimensions.push('flavor');
  if (scaleRes.matched) matchedDimensions.push('scale');
  if (textureRes.matched) matchedDimensions.push('texture');
  if (moodRes.matched) matchedDimensions.push('moodTags');

  const { reasonTags, chefPitch } = buildRecommendationReason(
    food,
    answers,
    {
      temperature,
      weather,
      mealTime,
      mealTimeLabel,
      ignoreEnvironment,
    },
    matchedDimensions
  );

  return {
    food,
    totalScore: roundScore(rawBaseScore + jitter),
    baseScore: roundScore(rawBaseScore),
    matchPercent,
    breakdown: {
      flavor: roundScore(flavorRes.score),
      scale: roundScore(scaleRes.score),
      texture: roundScore(textureRes.score),
      mood: roundScore(moodRes.score),
      mealTime: roundScore(mealTimeScore),
      climate: roundScore(climateScore),
      jitter: roundScore(jitter),
    },
    matchedDimensions,
    reasonTags,
    chefPitch,
  };
}

/**
 * 综合 4 步问答偏好与当前气象/时段，对美食库进行加权算分与排序
 */
export function recommendFoods(
  answers: ChefAnswers,
  envContext: EnvironmentContextData | null,
  options: RecommendOptions = {}
): RecommendedFoodResult[] {
  const poolSource = options.foods ?? FOOD_ITEMS;
  const excludeSet = new Set(options.excludeFoodNames ?? []);

  // 若全部菜品都已被排除（例如反复点击“换一批”），自动重置排除列表兜底
  const candidateFoods = poolSource.filter((item) => !excludeSet.has(item.name));
  const effectivePool =
    candidateFoods.length > 0 ? candidateFoods : poolSource;

  const scored = effectivePool.map((food) =>
    scoreSingleFood(food, answers, envContext, options)
  );

  scored.sort((a, b) => {
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }
    return b.baseScore - a.baseScore;
  });

  if (options.limit !== undefined && options.limit >= 0) {
    return scored.slice(0, options.limit);
  }
  return scored;
}
