import { useEffect, useRef, useState } from 'react';
import { FOOD_ITEMS, GACHA_COLORS } from '../../data/foods';
import type { FoodItem } from '../../types/food';
import GachaIllustration from '../illustrations/GachaIllustration';
import GachaShopBackdrop from './GachaShopBackdrop';

export type GachaAnimPhase =
  | 'idle'
  | 'rolling'
  | 'dropping'
  | 'popping'
  | 'revealed';

interface GachaStageViewProps {
  onConfirmFood?: (food: FoodItem) => void;
}

/**
 * 统一的手绘餐盘与刀叉占位图组件
 * 当 public/images/foods/ 下的真实图片尚未放入时自动呈现此占位图
 */
function FoodImagePlaceholder() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative select-none"
      style={{
        backgroundColor: '#FFF8EB',
        backgroundImage:
          'linear-gradient(rgba(245, 158, 11, 0.12) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(245, 158, 11, 0.12) 1.5px, transparent 1.5px)',
        backgroundSize: '20px 20px',
      }}
    >
      <svg
        width="180"
        height="130"
        viewBox="0 0 180 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 餐垫椭圆阴影 */}
        <ellipse cx="90" cy="72" rx="64" ry="44" fill="#FDE68A" opacity="0.6" />

        {/* 左侧手绘餐叉 */}
        <g transform="rotate(-12 30 65)">
          <rect
            x="26"
            y="52"
            width="6"
            height="42"
            rx="3"
            fill="#F59E0B"
            stroke="#3B2314"
            strokeWidth="2.8"
          />
          <path
            d="M22 32V48C22 52 36 52 36 48V32M29 32V48"
            stroke="#3B2314"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </g>

        {/* 中央手绘双层白瓷餐盘 */}
        <circle
          cx="90"
          cy="66"
          r="44"
          fill="#FFFDF9"
          stroke="#3B2314"
          strokeWidth="3.5"
        />
        <circle
          cx="90"
          cy="66"
          r="31"
          fill="#FFF8EB"
          stroke="#3B2314"
          strokeWidth="2.5"
          strokeDasharray="6 4"
        />
        {/* 盘中餐盖小装饰 */}
        <path
          d="M74 72C74 60 106 60 106 72H74Z"
          fill="#F59E0B"
          stroke="#3B2314"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <circle
          cx="90"
          cy="59"
          r="4"
          fill="#EF5B44"
          stroke="#3B2314"
          strokeWidth="2.5"
        />
        <path
          d="M70 72H110"
          stroke="#3B2314"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* 右侧手绘汤勺 */}
        <g transform="rotate(12 150 65)">
          <rect
            x="147"
            y="54"
            width="6"
            height="40"
            rx="3"
            fill="#F59E0B"
            stroke="#3B2314"
            strokeWidth="2.8"
          />
          <ellipse
            cx="150"
            cy="42"
            rx="9"
            ry="13"
            fill="#FFFDF9"
            stroke="#3B2314"
            strokeWidth="2.8"
          />
        </g>

        {/* 闪光小星星点缀 */}
        <path
          d="M52 26L54 31L59 33L54 35L52 40L50 35L45 33L50 31L52 26Z"
          fill="#F59E0B"
        />
        <path
          d="M132 22L133.5 26L137.5 27.5L133.5 29L132 33L130.5 29L126.5 27.5L130.5 26L132 22Z"
          fill="#EF5B44"
        />
      </svg>
    </div>
  );
}

export default function GachaStageView({ onConfirmFood }: GachaStageViewProps) {
  const [phase, setPhase] = useState<GachaAnimPhase>('idle');
  const [knobAngle, setKnobAngle] = useState(0);
  const [excludedNames, setExcludedNames] = useState<string[]>([]);
  const [pickedFood, setPickedFood] = useState<FoodItem | null>(null);
  const [imgError, setImgError] = useState(false);

  const timersRef = useRef<number[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const startGachaSequence = (customExcluded = excludedNames) => {
    if (phase === 'rolling' || phase === 'dropping' || phase === 'popping') {
      return;
    }

    clearAllTimers();

    const pool = FOOD_ITEMS.filter(
      (item) => !customExcluded.includes(item.name)
    );
    const activePool = pool.length > 0 ? pool : FOOD_ITEMS;
    const candidate =
      activePool[Math.floor(Math.random() * activePool.length)];

    setPickedFood(candidate);
    setImgError(false);
    setKnobAngle((prev) => prev + 360);
    setPhase('rolling');

    const t1 = window.setTimeout(() => {
      setPhase('dropping');
    }, 500);

    const t2 = window.setTimeout(() => {
      setPhase('popping');
    }, 880);

    const t3 = window.setTimeout(() => {
      setPhase('revealed');
    }, 1160);

    timersRef.current.push(t1, t2, t3);
  };

  const handleExcludeAndReroll = () => {
    if (!pickedFood) return;
    const nextExcluded = excludedNames.includes(pickedFood.name)
      ? excludedNames
      : [...excludedNames, pickedFood.name];
    setExcludedNames(nextExcluded);
    startGachaSequence(nextExcluded);
  };

  const activeColor = pickedFood
    ? GACHA_COLORS[pickedFood.category]
    : '#F59E0B';

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative w-full h-full flex flex-col items-center justify-end pb-[75px] md:pb-[95px] px-4 overflow-hidden"
    >
      {/* 1. 柔焦浅焦糖日式美食小铺内景（花窗+暖帘+美食架+木吧台） */}
      <GachaShopBackdrop />

      {/* ==================== 2. 主角聚光灯光环 + 居中大扭蛋机 + 桌面美食与彩壳道具 ==================== */}
      <div
        className={`relative z-20 flex flex-col items-center transition-all duration-300 ${
          phase === 'revealed'
            ? 'scale-95 opacity-30 blur-[1px]'
            : 'scale-100 opacity-100'
        }`}
      >
        <div className="relative flex flex-col items-center">
          {/* 扭蛋机背后的明亮暖白聚光光环（强烈拉开主次，瞬间聚焦主角） */}
          <div
            className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[580px] md:h-[580px] rounded-full pointer-events-none z-10"
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.96) 0%, rgba(254,249,195,0.85) 38%, rgba(253,230,138,0.28) 62%, rgba(253,230,138,0) 76%)',
            }}
          />

          {/* 扭蛋机本体（粗黑描边 + 鲜艳纯色，从柔焦背景中跳脱而出） */}
          <div
            className={`relative z-20 -mb-7 drop-shadow-[0_14px_24px_rgba(59,35,20,0.16)] ${
              phase === 'rolling' ? 'gacha-spinning gacha-machine-shaking' : ''
            }`}
          >
            <GachaIllustration
              size="large"
              showHalo={false}
              knobAngle={knobAngle}
              interactiveKnob={phase === 'idle' || phase === 'revealed'}
              onKnobClick={() => startGachaSequence()}
            />
          </div>

          {/* 扭蛋机两侧吧台桌面散落物（美食点心盘 + 裂开彩壳 + 游戏币，均使用前景清晰描边） */}
          <div className="relative z-20 w-[640px] max-w-[96vw] pointer-events-none">
            <svg
              viewBox="0 0 640 78"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              {/* ---- 左桌角：金黄鲷鱼烧瓷盘 + 裂开的红扭蛋半壳 + 游戏币 ---- */}
              {/* 小瓷盘与热呼呼鲷鱼烧（美食元素） */}
              <g transform="translate(14, 14)">
                <ellipse
                  cx="52"
                  cy="44"
                  rx="48"
                  ry="13"
                  fill="#FFFDF9"
                  stroke="#3B2314"
                  strokeWidth="3.5"
                />
                <ellipse
                  cx="52"
                  cy="43"
                  rx="36"
                  ry="8"
                  fill="#FEF3C7"
                  stroke="#3B2314"
                  strokeWidth="2"
                  strokeOpacity="0.35"
                />
                {/* 鱼形鲷鱼烧 */}
                <g transform="translate(18, 12) rotate(-6)">
                  <path
                    d="M8 22C16 7 42 7 52 20L64 12V32L52 24C42 37 16 37 8 22Z"
                    fill="#F59E0B"
                    stroke="#3B2314"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                  />
                  <circle cx="20" cy="20" r="2.2" fill="#3B2314" />
                  <path
                    d="M32 16Q36 22 32 28M39 16Q43 22 39 28"
                    stroke="#92400E"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </g>
              </g>

              {/* 裂开的红色扭蛋半壳 */}
              <g transform="translate(120, 22) rotate(-16)">
                <path
                  d="M0 24 A22 22 0 0 1 44 24 Z"
                  fill="#EF4444"
                  stroke="#3B2314"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 12 C14 7 20 5 26 5"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </g>

              {/* 叠放的游戏币 */}
              <g transform="translate(174, 30)">
                <ellipse
                  cx="18"
                  cy="14"
                  rx="14"
                  ry="6"
                  fill="#F59E0B"
                  stroke="#3B2314"
                  strokeWidth="3"
                />
                <ellipse
                  cx="18"
                  cy="9"
                  rx="14"
                  ry="6"
                  fill="#FBBF24"
                  stroke="#3B2314"
                  strokeWidth="3"
                />
                <ellipse
                  cx="20"
                  cy="4"
                  rx="14"
                  ry="6"
                  fill="#FDE047"
                  stroke="#3B2314"
                  strokeWidth="3"
                />
              </g>

              {/* ---- 右桌角：海苔三角饭团餐盘 + 完整紫色扭蛋 + 裂开青色半壳 ---- */}
              {/* 完整紫色扭蛋与游戏币 */}
              <g transform="translate(430, 16) rotate(20)">
                <circle
                  cx="18"
                  cy="18"
                  r="17"
                  fill="#8B5CF6"
                  stroke="#3B2314"
                  strokeWidth="3.5"
                />
                <path
                  d="M2 18 Q18 23 34 18"
                  stroke="#3B2314"
                  strokeWidth="3"
                  fill="none"
                />
                <circle cx="12" cy="11" r="4" fill="#FFFFFF" opacity="0.8" />
              </g>

              <g transform="translate(480, 22) rotate(14)">
                <path
                  d="M0 22 A20 20 0 0 1 40 22 Z"
                  fill="#06B6D4"
                  stroke="#3B2314"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 11 C13 6 19 4 24 4"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </g>

              {/* 托盘与两枚海苔三角饭团（美食元素） */}
              <g transform="translate(526, 12)">
                <ellipse
                  cx="48"
                  cy="46"
                  rx="46"
                  ry="13"
                  fill="#FFFDF9"
                  stroke="#3B2314"
                  strokeWidth="3.5"
                />
                {/* 饭团 A */}
                <path
                  d="M16 44C12 44 10 38 14 32L24 14C27 9 33 9 36 14L46 32C50 38 48 44 44 44H16Z"
                  fill="#FFFDF9"
                  stroke="#3B2314"
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                />
                <rect
                  x="22"
                  y="30"
                  width="16"
                  height="14"
                  rx="3"
                  fill="#292524"
                  stroke="#3B2314"
                  strokeWidth="2.2"
                />
                {/* 饭团 B（略前叠放） */}
                <path
                  d="M44 48C40 48 38 42 42 36L52 18C55 13 61 13 64 18L74 36C78 42 76 48 72 48H44Z"
                  fill="#FFFDF9"
                  stroke="#3B2314"
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                />
                <rect
                  x="50"
                  y="34"
                  width="16"
                  height="14"
                  rx="3"
                  fill="#292524"
                  stroke="#3B2314"
                  strokeWidth="2.2"
                />
              </g>
            </svg>
          </div>

          {/* 镶嵌在通铺木吧台正前方的操作大按钮 */}
          <div className="-mt-4 flex justify-center relative z-30">
            <button
              type="button"
              disabled={
                phase === 'rolling' ||
                phase === 'dropping' ||
                phase === 'popping'
              }
              onClick={() => startGachaSequence()}
              className="sketch-btn bg-[#fde047] hover:bg-[#facc15] px-11 py-3.5 text-xl flex items-center gap-2.5 disabled:opacity-60"
            >
              <span>🎲</span>
              <span>
                {phase === 'idle' || phase === 'revealed'
                  ? '拧一下！'
                  : '咕噜噜...'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ==================== 阶段 2 & 3：纯色扭蛋滚落弹跳 & 上下破壳动效层 ==================== */}
      {(phase === 'dropping' || phase === 'popping') && pickedFood && (
        <div className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center">
          {phase === 'dropping' && (
            <div className="animate-capsule-drop">
              <svg width="145" height="145" viewBox="0 0 130 130" fill="none">
                <circle
                  cx="65"
                  cy="65"
                  r="52"
                  fill={activeColor}
                  stroke="#3B2314"
                  strokeWidth="5"
                />
                {/* 立体月牙暗影 */}
                <path
                  d="M28 100 A52 52 0 0 0 102 28 A58 58 0 0 1 28 100 Z"
                  fill="#3B2314"
                  opacity="0.16"
                />
                <path
                  d="M14 65 Q65 78 116 65"
                  stroke="#3B2314"
                  strokeWidth="4.5"
                  fill="none"
                />
                <circle
                  cx="65"
                  cy="69"
                  r="10"
                  fill="#FFFDF9"
                  stroke="#3B2314"
                  strokeWidth="4"
                />
                <circle cx="65" cy="69" r="3.5" fill="#F59E0B" />
                <path
                  d="M34 42 C40 30 52 25 64 25"
                  stroke="#FFFFFF"
                  strokeWidth="7"
                  strokeLinecap="round"
                  opacity="0.88"
                />
                <circle cx="30" cy="52" r="3.5" fill="#FFFFFF" opacity="0.8" />
              </svg>
            </div>
          )}

          {phase === 'popping' && (
            <div className="relative flex items-center justify-center">
              <div className="animate-burst-flash absolute flex items-center justify-center">
                <div
                  className="w-40 h-40 rounded-full border-4 border-[#3b2314]"
                  style={{ backgroundColor: '#FDE68A' }}
                />
                <span className="absolute -top-12 -left-10 text-3xl">✨</span>
                <span className="absolute -top-10 -right-12 text-3xl">⭐</span>
                <span className="absolute -bottom-10 -left-12 text-3xl">🎉</span>
                <span className="absolute -bottom-12 -right-10 text-3xl">✨</span>
              </div>

              <div className="animate-shell-top absolute">
                <svg width="145" height="80" viewBox="0 0 130 72" fill="none">
                  <path
                    d="M13 65 A52 52 0 0 1 117 65 Z"
                    fill={activeColor}
                    stroke="#3B2314"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M34 40 C40 28 52 23 64 23"
                    stroke="#FFFFFF"
                    strokeWidth="7"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </svg>
              </div>

              <div className="animate-shell-bottom absolute">
                <svg width="145" height="80" viewBox="0 0 130 72" fill="none">
                  <path
                    d="M13 7 A52 52 0 0 0 117 7 Z"
                    fill={activeColor}
                    stroke="#3B2314"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== 阶段 4：破壳揭晓 · 美食卡片（含统一手绘餐盘占位图） ==================== */}
      {phase === 'revealed' && pickedFood && (
        <div
          onClick={() => setPhase('idle')}
          className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/20"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="sketch-box w-[400px] max-w-[90vw] p-6 bg-[#fffdf9] flex flex-col gap-4 animate-pop-in relative"
          >
            {/* 右上角关闭按钮 */}
            <button
              type="button"
              onClick={() => setPhase('idle')}
              title="关闭"
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full border-2 border-[#3b2314] bg-[#fff8eb] hover:bg-[#fde68a] font-black text-sm flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>

            {/* 美食图片框：有真图时显示真图，否则显示统一的手绘刀叉餐盘占位图 */}
            <div className="w-full h-44 rounded-2xl border-[3px] border-[#3b2314] overflow-hidden relative">
              {!imgError && pickedFood.visual.image ? (
                <img
                  src={pickedFood.visual.image}
                  alt={pickedFood.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FoodImagePlaceholder />
              )}
            </div>

            {/* 食物名称与一句诱人描述 */}
            <div className="text-center px-2">
              <h2 className="text-3xl font-black text-[#3b2314] mb-2">
                {pickedFood.name}
              </h2>
              <p className="text-[15px] text-[#6e4730] font-semibold leading-relaxed">
                “{pickedFood.visual.description}”
              </p>
            </div>

            {/* 底部双按钮 */}
            <div className="flex gap-3 mt-1">
              <button
                type="button"
                onClick={() => onConfirmFood?.(pickedFood)}
                className="sketch-btn flex-1 bg-[#fde047] hover:bg-[#facc15] py-3 px-4 text-base flex items-center justify-center gap-1.5"
              >
                <span>🔨</span>
                <span>就吃这个！</span>
              </button>

              <button
                type="button"
                onClick={handleExcludeAndReroll}
                className="sketch-btn bg-white hover:bg-[#fff8eb] py-3 px-5 text-base flex items-center justify-center gap-1.5"
              >
                <span>🔄</span>
                <span>换一个</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
