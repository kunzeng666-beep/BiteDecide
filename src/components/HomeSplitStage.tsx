import { useCallback, useState } from 'react';
import type { FoodItem } from '../types/food';
import type { EnvironmentContextData } from '../utils/amapWeather';
import TopHud from './TopHud';
import GachaStageView from './gacha/GachaStageView';
import ChefIllustration from './illustrations/ChefIllustration';
import GachaIllustration from './illustrations/GachaIllustration';

export type StageMode = 'overview' | 'chef' | 'gacha';

export default function HomeSplitStage() {
  const [mode, setMode] = useState<StageMode>('overview');
  const [envContext, setEnvContext] = useState<EnvironmentContextData | null>(
    null
  );
  const [confirmedFood, setConfirmedFood] = useState<FoodItem | null>(null);

  const handleEnvLoaded = useCallback((env: EnvironmentContextData) => {
    setEnvContext(env);
  }, []);

  const handleBackToOverview = () => {
    setConfirmedFood(null);
    setMode('overview');
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
                  <div className="sketch-sticker sticker-float-a hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl -rotate-6 absolute -top-2 -left-8 xl:-left-12 bg-[#fffbeb] text-3xl z-20 group-hover:-translate-x-2 transition-transform">
                    🍜
                  </div>
                  <div className="sketch-sticker sticker-float-b hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl rotate-6 absolute top-1 -right-8 xl:-right-12 bg-[#fde68a] text-3xl z-20 group-hover:translate-x-2 transition-transform">
                    🍛
                  </div>
                  <div className="sketch-sticker sticker-float-b hidden md:flex items-center justify-center w-13 h-13 rounded-2xl rotate-6 absolute bottom-38 -left-9 xl:-left-14 bg-white text-2xl z-20 group-hover:-translate-x-2 transition-transform">
                    🍲
                  </div>
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

          {mode === 'overview' ? (
            /* 首页分屏态下的扭蛋机与引导卡片 */
            <div className="relative z-10 flex flex-col items-center justify-center p-6 mt-8">
              <div className="relative flex flex-col items-center text-center shrink-0 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2 group-hover:scale-[1.03]">
                <div className="sketch-sticker sticker-float-b hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl -rotate-6 absolute -top-2 -left-8 xl:-left-12 bg-[#fed7aa] text-3xl z-20 group-hover:-translate-x-2 transition-transform">
                  🍗
                </div>
                <div className="sketch-sticker sticker-float-a hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl rotate-6 absolute top-1 -right-8 xl:-right-12 bg-[#fffbeb] text-3xl z-20 group-hover:translate-x-2 transition-transform">
                  🍔
                </div>
                <div className="sketch-sticker sticker-float-a hidden md:flex items-center justify-center w-13 h-13 rounded-2xl rotate-6 absolute bottom-40 -left-8 xl:-left-12 bg-white text-2xl z-20 group-hover:-translate-x-2 transition-transform">
                  🍢
                </div>
                <div className="sketch-sticker sticker-float-b hidden md:flex items-center justify-center w-13 h-13 rounded-2xl -rotate-6 absolute bottom-38 -right-9 xl:-right-14 bg-white text-2xl z-20 group-hover:translate-x-2 transition-transform">
                  🍱
                </div>

                <GachaIllustration knobAngle={0} />

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
              </div>
            </div>
          ) : (
            /* 进入扭蛋机全屏态：沉浸式居中扭蛋舞台 + 完整三段式破壳动效 */
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <GachaStageView
                onConfirmFood={(food) => {
                  setConfirmedFood(food);
                }}
              />
            </div>
          )}
        </section>
      </main>

      {/* ==================== 临时决定确认弹窗（后续将对接高德周边餐厅列表组件） ==================== */}
      {confirmedFood && (
        <div
          onClick={() => setConfirmedFood(null)}
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="sketch-box max-w-md w-full p-7 text-center bg-[#fffbeb] animate-pop-in"
          >
            <div className="text-4xl mb-2">🔨</div>
            <h3 className="text-2xl font-black mb-2">
              一锤定食：{confirmedFood.name}！
            </h3>
            <p className="text-sm text-[#6e4730] font-semibold mb-5">
              已锁定今日目标美味！待我们完成「周边餐厅检索模块」后，这里将直接为你列出附近评分最高、距离最近的【
              {confirmedFood.name}】好店与导航跳转。
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmedFood(null)}
                className="sketch-btn bg-[#fde68a] px-6 py-2.5 text-sm"
              >
                好嘞，继续体验
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
