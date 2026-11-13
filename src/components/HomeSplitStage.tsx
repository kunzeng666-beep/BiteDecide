import { useCallback, useState } from 'react';
import { FOOD_ITEMS, GACHA_COLORS } from '../data/foods';
import type { FoodCategory, FoodItem } from '../types/food';
import type { EnvironmentContextData } from '../utils/amapWeather';
import TopHud from './TopHud';
import ChefIllustration from './illustrations/ChefIllustration';
import GachaIllustration from './illustrations/GachaIllustration';

export type StageMode = 'overview' | 'chef' | 'gacha';

const CATEGORY_LABELS: Record<FoodCategory, string> = {
  hotpot: '锅物烫菜',
  noodle: '粉面汤水',
  rice: '中式饭食',
  fastfood: '西快炸物',
  snack: '街头小吃',
  bbq: '烧烤江湖',
  porridge: '温和粥点',
  light: '轻食甜品',
};

export default function HomeSplitStage() {
  const [mode, setMode] = useState<StageMode>('overview');
  const [envContext, setEnvContext] = useState<EnvironmentContextData | null>(
    null
  );

  // 扭蛋机状态
  const [knobAngle, setKnobAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [excludedNames, setExcludedNames] = useState<string[]>([]);
  const [currentGachaFood, setCurrentGachaFood] = useState<FoodItem | null>(
    null
  );

  const handleEnvLoaded = useCallback((env: EnvironmentContextData) => {
    setEnvContext(env);
  }, []);

  const handleBackToOverview = () => {
    setMode('overview');
  };

  // 抽取一颗随机扭蛋（自动过滤已排除的食物）
  const triggerGachaSpin = (customExcluded = excludedNames) => {
    if (isSpinning) return;

    const pool = FOOD_ITEMS.filter(
      (item) => !customExcluded.includes(item.name)
    );
    const activePool = pool.length > 0 ? pool : FOOD_ITEMS;

    setIsSpinning(true);
    setKnobAngle((prev) => prev + 360);

    setTimeout(() => {
      const randomPick =
        activePool[Math.floor(Math.random() * activePool.length)];
      setCurrentGachaFood(randomPick);
      setIsSpinning(false);
    }, 650);
  };

  // 排除当前结果并立即重抽
  const handleRejectAndReroll = () => {
    if (!currentGachaFood || isSpinning) return;
    const nextExcluded = [...excludedNames, currentGachaFood.name];
    setExcludedNames(nextExcluded);
    triggerGachaSpin(nextExcluded);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none text-[#3b2314]">
      {/* 1. 顶部 HUD（仅在首页分屏态显示，进入子模式自动上移隐藏） */}
      <TopHud visible={mode === 'overview'} onEnvLoaded={handleEnvLoaded} />

      {/* 2. 左上角“返回首页”按钮（仅在进入小厨师或扭蛋机后显示） */}
      <button
        type="button"
        onClick={handleBackToOverview}
        className={`sketch-btn fixed top-6 left-7 z-50 px-5 py-2.5 text-[15px] inline-flex items-center gap-2 bg-[#fffbeb] transition-all duration-300 ${
          mode !== 'overview'
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
      >
        <span>←</span>
        <span>返回首页</span>
      </button>

      {/* 3. 左右一分为二主舞台 */}
      <main className="w-screen h-screen flex relative">
        {/* ==================== 左半屏：小厨师（美食主理人） ==================== */}
        <section
          onClick={() => {
            if (mode === 'overview') setMode('chef');
          }}
          className={`group h-full relative overflow-hidden flex flex-col items-center justify-center pane-left-bg transition-[flex,background-color,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mode === 'overview'
              ? 'flex-1 hover:flex-[1.45] cursor-pointer border-r-4 border-[#3b2314]'
              : mode === 'chef'
                ? 'flex-1 cursor-default border-r-0'
                : 'flex-0 opacity-0 pointer-events-none border-r-0'
          }`}
        >
          {/* 背景底层海报超大水印 */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex flex-col justify-end p-8">
            <div className="text-[110px] xl:text-[145px] font-black leading-none tracking-tighter text-[#f59e0b]/12 select-none -mb-6 -ml-4">
              KITCHEN
            </div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-12 w-full max-w-[1160px] p-6 mt-8">
            {/* 小厨师手绘插画 + 环绕纯图案美食贴纸 + 分屏说明卡 */}
            <div
              className={`relative flex flex-col items-center text-center shrink-0 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                mode === 'overview'
                  ? 'group-hover:-translate-y-2 group-hover:scale-[1.03]'
                  : ''
              }`}
            >
              {/* 环绕小厨师的纯美食图案贴纸（无文字，仅在首页分屏态展示） */}
              {mode === 'overview' && (
                <>
                  {/* 左上：拉面图案贴纸 */}
                  <div className="sketch-sticker sticker-float-a hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl -rotate-6 absolute -top-2 -left-8 xl:-left-12 bg-[#fffbeb] text-3xl z-20 group-hover:-translate-x-2 transition-transform">
                    🍜
                  </div>

                  {/* 右上：煎蛋/盖饭图案贴纸 */}
                  <div className="sketch-sticker sticker-float-b hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl rotate-6 absolute top-1 -right-8 xl:-right-12 bg-[#fde68a] text-3xl z-20 group-hover:translate-x-2 transition-transform">
                    🍛
                  </div>

                  {/* 左下：火锅图案贴纸 */}
                  <div className="sketch-sticker sticker-float-b hidden md:flex items-center justify-center w-13 h-13 rounded-2xl rotate-6 absolute bottom-38 -left-9 xl:-left-14 bg-white text-2xl z-20 group-hover:-translate-x-2 transition-transform">
                    🍲
                  </div>

                  {/* 右下：小笼包/蒸点图案贴纸 */}
                  <div className="sketch-sticker sticker-float-a hidden md:flex items-center justify-center w-13 h-13 rounded-2xl -rotate-6 absolute bottom-40 -right-8 xl:-right-12 bg-white text-2xl z-20 group-hover:translate-x-2 transition-transform">
                    🥟
                  </div>
                </>
              )}

              <ChefIllustration />

              {mode === 'overview' && (
                <div className="sketch-box mt-2 max-w-[340px] px-6 py-4 text-center">
                  <div className="text-[22px] font-black mb-1.5 flex items-center justify-center gap-2">
                    <span>👨‍🍳</span>
                    <span>美食主理人</span>
                  </div>
                  <p className="text-[14px] text-[#6e4730] font-semibold leading-relaxed mb-3.5">
                    心里大概有谱，但还差点灵感？跟大厨聊两句，端出最懂你的那道菜。
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full text-[13.5px] font-extrabold bg-[#fde68a] border-[2.5px] border-[#3b2314] shadow-[2px_2px_0px_#3b2314] group-hover:scale-105 transition-transform">
                    <span>找大厨聊聊</span>
                    <span>→</span>
                  </div>
                </div>
              )}
            </div>

            {/* 点击进入“小厨师”全屏态后展开的问答气泡面板 */}
            {mode === 'chef' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="sketch-box w-[480px] max-w-[90vw] p-7 flex flex-col gap-4 animate-pop-in"
              >
                <div className="flex items-center justify-between">
                  <span className="bg-[#fde68a] border-2 border-[#3b2314] px-3 py-1 rounded-full text-xs font-extrabold">
                    💬 小厨师定制问答 · 准备就绪
                  </span>
                  <span className="text-xs text-[#6e4730] font-bold">
                    已感知：{envContext?.temperature ?? 20}°C{' '}
                    {envContext?.weather ?? '晴'} ·{' '}
                    {envContext?.mealTimeLabel ?? '今日食光'}
                  </span>
                </div>

                <h2 className="text-[21px] font-black leading-snug">
                  “客官里面请！接下来告诉我你此刻的心情、口味、口感与分量偏好，我立刻为你掌勺推荐！”
                </h2>

                <p className="text-sm text-[#6e4730] font-semibold">
                  （4 步图文问答与智能加权算分面板将在下一步正式接入）
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ==================== 右半屏：美食扭蛋机（随机盲盒） ==================== */}
        <section
          onClick={() => {
            if (mode === 'overview') setMode('gacha');
          }}
          className={`group h-full relative overflow-hidden flex flex-col items-center justify-center pane-right-bg transition-[flex,background-color,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mode === 'overview'
              ? 'flex-1 hover:flex-[1.45] cursor-pointer'
              : mode === 'gacha'
                ? 'flex-1 cursor-default'
                : 'flex-0 opacity-0 pointer-events-none'
          }`}
        >
          {/* 背景底层海报超大水印 */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex flex-col justify-end items-end p-8">
            <div className="text-[110px] xl:text-[145px] font-black leading-none tracking-tighter text-[#ef5b44]/12 select-none -mb-6 -mr-4">
              CAPSULE
            </div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-12 w-full max-w-[1160px] p-6 mt-8">
            {/* 扭蛋机手绘插画 + 环绕纯图案美食贴纸 + 分屏说明卡 */}
            <div
              className={`relative flex flex-col items-center text-center shrink-0 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                mode === 'overview'
                  ? 'group-hover:-translate-y-2 group-hover:scale-[1.03]'
                  : ''
              } ${isSpinning ? 'gacha-spinning' : ''}`}
            >
              {/* 环绕扭蛋机的纯美食图案贴纸（无文字，仅在首页分屏态展示） */}
              {mode === 'overview' && (
                <>
                  {/* 左上：炸鸡腿图案贴纸 */}
                  <div className="sketch-sticker sticker-float-b hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl -rotate-6 absolute -top-2 -left-8 xl:-left-12 bg-[#fed7aa] text-3xl z-20 group-hover:-translate-x-2 transition-transform">
                    🍗
                  </div>

                  {/* 右上：汉堡图案贴纸 */}
                  <div className="sketch-sticker sticker-float-a hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl rotate-6 absolute top-1 -right-8 xl:-right-12 bg-[#fffbeb] text-3xl z-20 group-hover:translate-x-2 transition-transform">
                    🍔
                  </div>

                  {/* 左下：烤串图案贴纸 */}
                  <div className="sketch-sticker sticker-float-a hidden md:flex items-center justify-center w-13 h-13 rounded-2xl rotate-6 absolute bottom-40 -left-8 xl:-left-12 bg-white text-2xl z-20 group-hover:-translate-x-2 transition-transform">
                    🍢
                  </div>

                  {/* 右下：便当饭食图案贴纸 */}
                  <div className="sketch-sticker sticker-float-b hidden md:flex items-center justify-center w-13 h-13 rounded-2xl -rotate-6 absolute bottom-38 -right-9 xl:-right-14 bg-white text-2xl z-20 group-hover:translate-x-2 transition-transform">
                    🍱
                  </div>
                </>
              )}

              <GachaIllustration knobAngle={knobAngle} />

              {mode === 'overview' && (
                <div className="sketch-box mt-2 max-w-[340px] px-6 py-4 text-center">
                  <div className="text-[22px] font-black mb-1.5 flex items-center justify-center gap-2">
                    <span>🎲</span>
                    <span>美食扭蛋机</span>
                  </div>
                  <p className="text-[14px] text-[#6e4730] font-semibold leading-relaxed mb-3.5">
                    脑子已经罢工？干脆别想了，拧一下交给老天爷安排！
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full text-[13.5px] font-extrabold bg-[#fed7aa] border-[2.5px] border-[#3b2314] shadow-[2px_2px_0px_#3b2314] group-hover:scale-105 transition-transform">
                    <span>拧一颗试试</span>
                    <span>→</span>
                  </div>
                </div>
              )}
            </div>

            {/* 点击进入“扭蛋机”全屏态后展开的抽奖面板 */}
            {mode === 'gacha' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="sketch-box w-[480px] max-w-[90vw] p-7 flex flex-col gap-4 animate-pop-in"
              >
                <div className="flex items-center justify-between">
                  <span className="bg-[#fed7aa] border-2 border-[#3b2314] px-3 py-1 rounded-full text-xs font-extrabold">
                    🎰 命运盲盒模式 · 8 色纯色扭蛋
                  </span>
                  <span className="text-xs text-[#6e4730] font-bold">
                    本轮已排除: {excludedNames.length} 项
                  </span>
                </div>

                {/* 扭蛋掉落与破壳揭晓舞台 */}
                <div className="min-h-[160px] border-[2.5px] border-dashed border-[#3b2314]/30 rounded-2xl bg-[#fff8f5] flex flex-col items-center justify-center p-5 text-center">
                  {isSpinning ? (
                    <div className="text-[15px] font-extrabold text-[#d97706]">
                      ✨ 正在从球仓摇出纯色扭蛋...
                    </div>
                  ) : currentGachaFood ? (
                    <>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span
                          className="inline-block w-5 h-5 rounded-full border-[2.5px] border-[#3b2314]"
                          style={{
                            backgroundColor:
                              GACHA_COLORS[currentGachaFood.category],
                          }}
                        />
                        <span className="text-xs font-extrabold text-[#6e4730]">
                          破壳而出 ·{' '}
                          {CATEGORY_LABELS[currentGachaFood.category]}
                        </span>
                      </div>
                      <div className="text-2xl font-black text-[#3b2314] mb-1.5">
                        🔨 一锤定食：{currentGachaFood.name}
                      </div>
                      <p className="text-[13px] text-[#6e4730] font-semibold mb-4">
                        {currentGachaFood.visual.description}
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-2.5">
                        <button
                          type="button"
                          onClick={handleRejectAndReroll}
                          className="sketch-btn bg-white px-3.5 py-2 text-xs"
                        >
                          🔄 不想吃，排除重抽
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-[15px] text-[#6e4730] font-bold">
                      👇 点击下方按钮拧动旋钮，随机掉落一颗纯色美食扭蛋！
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  disabled={isSpinning}
                  onClick={() => triggerGachaSpin()}
                  className="sketch-btn bg-[#f59e0b] py-3.5 text-[17px] disabled:opacity-60"
                >
                  {isSpinning
                    ? '🎲 扭蛋咕噜噜滚落中...'
                    : currentGachaFood
                      ? '🎲 再拧一次扭蛋'
                      : '🎲 拧动旋钮 · 摇出今日盲盒！'}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
