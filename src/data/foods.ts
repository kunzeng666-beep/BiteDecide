import type { FoodCategory, FoodItem } from "../types/food";

// 8 大类扭蛋颜色映射 (仅靠颜色区分大类，对应 FR-02)
export const GACHA_COLORS: Record<FoodCategory, string> = {
  hotpot: "#ef4444", // 锅物烫菜 -> 红色
  noodle: "#f97316", // 粉面汤水 -> 橙色
  rice: "#eab308", // 中式饭食 -> 黄色
  fastfood: "#84cc16", // 西快炸物 -> 绿色
  snack: "#06b6d4", // 街头小吃 -> 青色
  bbq: "#8b5cf6", // 烧烤江湖 -> 紫色
  porridge: "#14b8a6", // 温和粥点 -> 碧色
  light: "#ec4899", // 轻食甜品 -> 粉色
};

// 内置精选美食库 (通俗品类名称，便于地图精准检索)
export const FOOD_ITEMS: FoodItem[] = [
  // ================= 1. hotpot (锅物和麻辣烫类) =================
  {
    name: "麻辣烫",
    category: "hotpot",
    visual: {
      image: "/images/foods/malatang.jpg",
      description: "红油滚烫食材吸饱浓醇汤汁，麻辣鲜香直击灵魂",
    },
    temperature: ["hot"],
    mealTime: ["lunch", "dinner", "supper"],
    moodTags: ["stressed", "casual"],
    flavor: ["spicy", "savory"],
    texture: ["soup"],
    scale: ["simple", "hearty"],
  },
  {
    name: "小火锅",
    category: "hotpot",
    visual: {
      image: "/images/foods/mini_hotpot.jpg",
      description: "一人一锅自选涮煮，肥牛嫩滑毛肚清脆，热气翻滚中的自由解压",
    },
    temperature: ["hot"],
    mealTime: ["lunch", "dinner"],
    moodTags: ["reward", "casual"],
    flavor: ["spicy", "savory"],
    texture: ["soup"],
    scale: ["hearty", "feast"],
  },
  {
    name: "重庆火锅",
    category: "hotpot",
    visual: {
      image: "/images/foods/chongqing_hotpot.jpg",
      description: "牛油醇厚红亮沸腾，鸭肠脆嫩毛肚七上八下，大汗淋漓的爽快大餐",
    },
    temperature: ["hot"],
    mealTime: ["dinner", "supper"],
    moodTags: ["stressed", "reward"],
    flavor: ["spicy"],
    texture: ["soup"],
    scale: ["feast"],
  },
  {
    name: "潮汕牛肉火锅",
    category: "hotpot",
    visual: {
      image: "/images/foods/beef_hotpot.jpg",
      description: "牛骨清汤鲜甜醇润，鲜切牛肉几秒即熟，蘸上沙茶酱的纯正享受",
    },
    temperature: ["hot"],
    mealTime: ["lunch", "dinner"],
    moodTags: ["reward", "tired"],
    flavor: ["savory", "mild"],
    texture: ["soup"],
    scale: ["hearty", "feast"],
  },
  {
    name: "麻辣香锅",
    category: "hotpot",
    visual: {
      image: "/images/foods/spicy_pot.jpg",
      description: "大火猛炒锅气四溢，秘制酱料浓郁裹满肉菜，干香下饭越吃越过瘾",
    },
    temperature: ["hot", "warm"],
    mealTime: ["lunch", "dinner"],
    moodTags: ["stressed", "reward"],
    flavor: ["spicy", "savory"],
    texture: ["dry"],
    scale: ["hearty"],
  },

  // ================= 2. noodle (粉面汤水类) =================
  {
    name: "日式拉面",
    category: "noodle",
    visual: {
      image: "/images/foods/ramen.jpg",
      description: "奶白浓醇骨汤配软嫩叉烧，吸一口裹满汤汁的面条暖心治愈",
    },
    temperature: ["hot"],
    mealTime: ["lunch", "dinner"],
    moodTags: ["tired", "casual"],
    flavor: ["savory", "mild"],
    texture: ["soup"],
    scale: ["simple", "hearty"],
  },
  {
    name: "螺蛳粉",
    category: "noodle",
    visual: {
      image: "/images/foods/luosifen.jpg",
      description: "酸笋酸辣扑鼻炸蛋吸满汤汁，一口下去酸爽过瘾停不下来",
    },
    temperature: ["hot"],
    mealTime: ["lunch", "dinner", "supper"],
    moodTags: ["stressed", "casual"],
    flavor: ["spicy", "sour"],
    texture: ["soup"],
    scale: ["simple"],
  },
  {
    name: "牛肉面",
    category: "noodle",
    visual: {
      image: "/images/foods/beef_noodles.jpg",
      description: "清亮浓汤麦香扑鼻，手工劲道面条配鲜香牛肉片，经典日常之选",
    },
    temperature: ["hot"],
    mealTime: ["breakfast", "lunch", "dinner"],
    moodTags: ["casual", "tired"],
    flavor: ["savory", "mild"],
    texture: ["soup"],
    scale: ["simple"],
  },
  {
    name: "米线",
    category: "noodle",
    visual: {
      image: "/images/foods/mixian.jpg",
      description: "滚烫鲜汤封住热气，爽滑米线哧溜入口，鲜香暖胃好吸收",
    },
    temperature: ["hot"],
    mealTime: ["lunch", "dinner"],
    moodTags: ["tired", "casual"],
    flavor: ["savory", "mild"],
    texture: ["soup"],
    scale: ["simple", "hearty"],
  },
  {
    name: "重庆小面",
    category: "noodle",
    visual: {
      image: "/images/foods/xiaomian.jpg",
      description: "红油酱汁裹满劲道碱面，佐以酥香肉末或软糯豌豆，麻辣喷香",
    },
    temperature: ["hot", "warm"],
    mealTime: ["breakfast", "lunch", "dinner"],
    moodTags: ["stressed", "casual"],
    flavor: ["spicy", "savory"],
    texture: ["dry", "soup"],
    scale: ["simple"],
  },

  // ================= 3. rice (盖饭和中式快餐) =================
  {
    name: "猪脚饭",
    category: "rice",
    visual: {
      image: "/images/foods/zhujiaofan.jpg",
      description: "卤香透骨软糯入味，肉皮胶质满满，浓稠卤汁拌饭大口扒拉最满足",
    },
    temperature: ["warm"],
    mealTime: ["lunch", "dinner"],
    moodTags: ["tired", "casual"],
    flavor: ["savory"],
    texture: ["dry"],
    scale: ["simple", "hearty"],
  },
  {
    name: "黄焖鸡米饭",
    category: "rice",
    visual: {
      image: "/images/foods/huangmenji.jpg",
      description: "砂锅文火鲜香浓郁，鸡肉鲜嫩多汁吸足汤汁，配米饭绝妙搭档",
    },
    temperature: ["hot", "warm"],
    mealTime: ["lunch", "dinner"],
    moodTags: ["casual", "tired"],
    flavor: ["savory"],
    texture: ["dry"],
    scale: ["simple"],
  },
  {
    name: "煲仔饭",
    category: "rice",
    visual: {
      image: "/images/foods/baozai_rice.jpg",
      description: "瓦煲现焗丝苗米吸收腊味油润，底部金黄酥脆焦香锅巴回味无穷",
    },
    temperature: ["hot"],
    mealTime: ["lunch", "dinner"],
    moodTags: ["reward", "casual"],
    flavor: ["savory", "sour"],
    texture: ["dry", "crispy"],
    scale: ["hearty"],
  },
  {
    name: "小炒肉盖饭",
    category: "rice",
    visual: {
      image: "/images/foods/chao_rou.jpg",
      description: "青椒猛火颠炒五花肉薄片，油香辣爽锅气爆棚，干饭人的灵魂救赎",
    },
    temperature: ["hot", "warm"],
    mealTime: ["lunch", "dinner"],
    moodTags: ["stressed", "casual"],
    flavor: ["spicy", "savory"],
    texture: ["dry"],
    scale: ["simple"],
  },

  // ================= 4. fastfood (西式快餐和炸物) =================
  {
    name: "牛肉汉堡",
    category: "fastfood",
    visual: {
      image: "/images/foods/burger.jpg",
      description: "煎至焦香流油的厚牛肉饼配熔化芝士，大口咬下肉汁四溢",
    },
    temperature: ["warm"],
    mealTime: ["lunch", "dinner", "supper"],
    moodTags: ["stressed", "reward"],
    flavor: ["savory"],
    texture: ["crispy", "dry"],
    scale: ["simple", "hearty"],
  },
  {
    name: "炸鸡",
    category: "fastfood",
    visual: {
      image: "/images/foods/fried_chicken.jpg",
      description: "金黄外壳咬破咔滋作响，鲜嫩鸡肉滚烫爆汁，治愈所有不开心",
    },
    temperature: ["hot", "warm"],
    mealTime: ["lunch", "tea", "dinner", "supper"],
    moodTags: ["stressed", "reward"],
    flavor: ["savory", "spicy"],
    texture: ["crispy"],
    scale: ["snack", "simple", "hearty"],
  },
  {
    name: "牛排",
    category: "fastfood",
    visual: {
      image: "/images/foods/steak.jpg",
      description: "高温炙烤肉香四溢，厚切牛肉软嫩多汁，仪式感满满的大餐之选",
    },
    temperature: ["hot"],
    mealTime: ["lunch", "dinner"],
    moodTags: ["reward"],
    flavor: ["savory"],
    texture: ["dry"],
    scale: ["feast"],
  },
  {
    name: "披萨",
    category: "fastfood",
    visual: {
      image: "/images/foods/pizza.jpg",
      description: "手工饼底麦香扑鼻，金黄芝士浓郁拉丝，用料丰富聚会必备",
    },
    temperature: ["hot", "warm"],
    mealTime: ["lunch", "dinner"],
    moodTags: ["reward", "casual"],
    flavor: ["savory", "sour"],
    texture: ["crispy", "soft"],
    scale: ["hearty", "feast"],
  },

  // ================= 5. snack (街头小吃和地方风味) =================
  {
    name: "肉夹馍",
    category: "snack",
    visual: {
      image: "/images/foods/roujiamo.jpg",
      description: "馍皮酥脆掉渣，腊汁肉肥瘦相间软烂醇香，经典解馋小吃",
    },
    temperature: ["warm"],
    mealTime: ["breakfast", "lunch", "tea", "dinner"],
    moodTags: ["casual", "stressed"],
    flavor: ["savory"],
    texture: ["crispy", "soft"],
    scale: ["snack", "simple"],
  },
  {
    name: "煎饼果子",
    category: "snack",
    visual: {
      image: "/images/foods/jianbing.jpg",
      description: "薄摊鸡蛋刷上酱料，裹上香脆薄脆趁热咬下，简单热乎的一餐",
    },
    temperature: ["hot", "warm"],
    mealTime: ["breakfast", "tea", "supper"],
    moodTags: ["casual", "tired"],
    flavor: ["savory"],
    texture: ["crispy", "soft"],
    scale: ["snack", "simple"],
  },
  {
    name: "肠粉",
    category: "snack",
    visual: {
      image: "/images/foods/changfen.jpg",
      description: "米浆蒸出如白玉般晶莹透亮，淋上鲜甜酱油，口感滑嫩顺喉",
    },
    temperature: ["hot", "warm"],
    mealTime: ["breakfast", "tea", "supper"],
    moodTags: ["tired", "casual"],
    flavor: ["savory", "mild"],
    texture: ["soft"],
    scale: ["snack", "simple"],
  },
  {
    name: "生煎包",
    category: "snack",
    visual: {
      image: "/images/foods/shengjian.jpg",
      description: "底板焦脆金黄，咬开一小口吸出滚烫鲜美肉汁，香浓过瘾",
    },
    temperature: ["hot"],
    mealTime: ["breakfast", "lunch", "dinner"],
    moodTags: ["tired", "casual"],
    flavor: ["savory", "mild"],
    texture: ["crispy", "soft"],
    scale: ["simple", "snack"],
  },

  // ================= 6. bbq (烧烤和夜宵江湖菜) =================
  {
    name: "烤串",
    category: "bbq",
    visual: {
      image: "/images/foods/chuanr.jpg",
      description: "炭火炙烤外焦里嫩，孜然辣椒与油脂交织升腾，深夜烟火气担当",
    },
    temperature: ["hot"],
    mealTime: ["dinner", "supper"],
    moodTags: ["stressed", "reward"],
    flavor: ["spicy", "savory"],
    texture: ["crispy", "dry"],
    scale: ["hearty", "feast"],
  },
  {
    name: "烤冷面",
    category: "bbq",
    visual: {
      image: "/images/foods/kaolengmian.jpg",
      description: "铁板压烤鸡蛋面皮，刷上酸甜开胃酱汁，洋葱香肠翻炒焦香扑鼻",
    },
    temperature: ["hot", "warm"],
    mealTime: ["tea", "supper"],
    moodTags: ["casual", "stressed"],
    flavor: ["sour", "savory", "spicy"],
    texture: ["soft"],
    scale: ["snack"],
  },
  {
    name: "烤鱼",
    category: "bbq",
    visual: {
      image: "/images/foods/kaoyu.jpg",
      description: "先炭烤皮脆肉嫩，再入铁盘慢煨入味，魔芋藕片吸饱香辣浓汁",
    },
    temperature: ["hot"],
    mealTime: ["dinner", "supper"],
    moodTags: ["reward", "stressed"],
    flavor: ["spicy", "savory"],
    texture: ["soup", "crispy"],
    scale: ["feast"],
  },
  {
    name: "韩式烤肉",
    category: "bbq",
    visual: {
      image: "/images/foods/korean_bbq.jpg",
      description:
        "五花肉在烤盘上滋滋煎出金黄，裹上大蒜泡菜包进苏子叶一整个满足",
    },
    temperature: ["hot"],
    mealTime: ["lunch", "dinner"],
    moodTags: ["reward"],
    flavor: ["savory", "spicy"],
    texture: ["crispy", "dry"],
    scale: ["feast"],
  },

  // ================= 7. porridge (温和养胃和粥品) =================
  {
    name: "皮蛋瘦肉粥",
    category: "porridge",
    visual: {
      image: "/images/foods/pidan_zhou.jpg",
      description: "大米熬出浓稠米油，瘦肉与皮蛋香气温润交融，暖胃安心好消化",
    },
    temperature: ["hot", "warm"],
    mealTime: ["breakfast", "lunch", "dinner", "supper"],
    moodTags: ["tired", "casual"],
    flavor: ["savory", "mild"],
    texture: ["soft", "soup"],
    scale: ["simple"],
  },
  {
    name: "砂锅粥",
    category: "porridge",
    visual: {
      image: "/images/foods/shaguo_zhou.jpg",
      description: "砂锅现点现熬，鲜虾蟹膏熬出天然鲜甜，撒上冬菜芹菜粒温润滋补",
    },
    temperature: ["hot"],
    mealTime: ["dinner", "supper"],
    moodTags: ["tired", "reward"],
    flavor: ["savory", "mild"],
    texture: ["soup", "soft"],
    scale: ["hearty", "feast"],
  },
  {
    name: "馄饨",
    category: "porridge",
    visual: {
      image: "/images/foods/yuntun.jpg",
      description: "皮薄馅嫩弹牙，金黄清汤配虾皮紫菜，一口一个温热顺滑",
    },
    temperature: ["hot"],
    mealTime: ["breakfast", "lunch", "supper"],
    moodTags: ["tired", "casual"],
    flavor: ["savory", "mild"],
    texture: ["soup"],
    scale: ["simple"],
  },
  {
    name: "银耳甜羹",
    category: "porridge",
    visual: {
      image: "/images/foods/yiner_geng.jpg",
      description: "慢熬胶质浓稠起丝，雪梨甘甜枸杞清润，温和滋润疲惫的身心",
    },
    temperature: ["warm", "cool"],
    mealTime: ["tea", "supper"],
    moodTags: ["tired", "casual"],
    flavor: ["mild"],
    texture: ["soft"],
    scale: ["snack"],
  },

  // ================= 8. light (轻食和甜品下午茶) =================
  {
    name: "轻食沙拉",
    category: "light",
    visual: {
      image: "/images/foods/salad.jpg",
      description: "低卡鸡胸肉搭配新鲜生菜与甜玉米，淋上开胃油醋汁清爽无负担",
    },
    temperature: ["cool", "warm"],
    mealTime: ["lunch", "dinner"],
    moodTags: ["casual", "tired"],
    flavor: ["sour", "mild"],
    texture: ["soft"],
    scale: ["simple"],
  },
  {
    name: "三明治",
    category: "light",
    visual: {
      image: "/images/foods/sandwich.jpg",
      description: "麦香吐司夹入金枪鱼、水煮蛋与爽脆黄瓜，清爽低卡饱腹感强",
    },
    temperature: ["cool", "warm"],
    mealTime: ["breakfast", "lunch", "tea"],
    moodTags: ["casual"],
    flavor: ["mild", "savory"],
    texture: ["soft"],
    scale: ["simple", "snack"],
  },
  {
    name: "杨枝甘露",
    category: "light",
    visual: {
      image: "/images/foods/yangzhiganlu.jpg",
      description: "芒果泥融入椰奶，西柚粒酸甜爆汁西米晶莹Q弹，冰爽解腻",
    },
    temperature: ["cold", "cool"],
    mealTime: ["tea", "supper"],
    moodTags: ["reward", "tired"],
    flavor: ["sour", "mild"],
    texture: ["soft"],
    scale: ["snack"],
  },
  {
    name: "芝士蛋糕",
    category: "light",
    visual: {
      image: "/images/foods/cheesecake.jpg",
      description: "外层焦香微苦，内里半熟流心乳酪细腻丝滑，下午茶惬意犒劳",
    },
    temperature: ["cool", "warm"],
    mealTime: ["tea"],
    moodTags: ["reward", "tired"],
    flavor: ["mild"],
    texture: ["soft"],
    scale: ["snack"],
  },
];
