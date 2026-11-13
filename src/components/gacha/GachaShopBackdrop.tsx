/**
 * 全屏手绘“街角美食扭蛋铺”柔焦室内背景（100vw × 100vh）
 * 视觉层级设计：
 * - 背景统一采用柔和的“浅焦糖单色线稿（#C48F65）+ 低饱和暖调柔焦（blur + opacity）”
 * - 对称布置日式木格花窗、垂挂美食徽章暖帘、柔光灯笼与美食木架，完全不与前景主角抢戏
 */
export default function GachaShopBackdrop() {
  const line = '#C48F65'; // 柔和浅焦糖描边，取代刺眼的粗黑线

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* ==================== 1. 墙面暖色竖条纹壁纸 + 四周柔焦暗角 ==================== */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#FFF3E4',
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(217, 155, 95, 0.08) 0px, rgba(217, 155, 95, 0.08) 40px, transparent 40px, transparent 80px)',
        }}
      />

      {/* 四周边缘温和暖褐暗角（把视觉焦点聚拢到正中央扭蛋机） */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(255, 253, 249, 0.35) 0%, rgba(245, 208, 169, 0.12) 55%, rgba(168, 108, 62, 0.22) 100%)',
        }}
      />

      {/* ==================== 2. 顶部：柔焦波浪遮阳棚 + 彩色三角旗与暖光灯笼 ==================== */}
      <svg
        viewBox="0 0 1600 185"
        preserveAspectRatio="none"
        className="absolute top-0 inset-x-0 w-full h-[120px] md:h-[150px] z-10 opacity-80 blur-[0.4px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 左侧彩旗线 */}
        <path
          d="M-20 42 Q 230 142 520 35"
          stroke={line}
          strokeWidth="2.8"
          fill="none"
        />
        <polygon points="58,66 96,76 72,116" fill="#F4A999" stroke={line} strokeWidth="2.5" />
        <polygon points="126,82 164,88 142,128" fill="#F8D286" stroke={line} strokeWidth="2.5" />
        <polygon points="196,91 234,93 214,133" fill="#C5DFA0" stroke={line} strokeWidth="2.5" />
        <polygon points="266,93 304,91 286,131" fill="#A5DCE4" stroke={line} strokeWidth="2.5" />
        <polygon points="336,88 374,82 358,122" fill="#F5B8C8" stroke={line} strokeWidth="2.5" />
        <polygon points="404,76 442,66 428,108" fill="#F8D286" stroke={line} strokeWidth="2.5" />

        {/* 右侧彩旗线 */}
        <path
          d="M1080 35 Q 1370 142 1620 42"
          stroke={line}
          strokeWidth="2.8"
          fill="none"
        />
        <polygon points="1158,66 1196,76 1172,108" fill="#D4C2EE" stroke={line} strokeWidth="2.5" />
        <polygon points="1226,82 1264,88 1242,122" fill="#F6BD94" stroke={line} strokeWidth="2.5" />
        <polygon points="1296,91 1334,93 1314,131" fill="#A5DDD6" stroke={line} strokeWidth="2.5" />
        <polygon points="1366,93 1404,91 1386,133" fill="#F8D286" stroke={line} strokeWidth="2.5" />
        <polygon points="1436,88 1474,82 1458,128" fill="#F4A999" stroke={line} strokeWidth="2.5" />
        <polygon points="1504,76 1542,66 1528,116" fill="#C5DFA0" stroke={line} strokeWidth="2.5" />

        {/* 柔和发光小圆灯 */}
        <circle cx="178" cy="92" r="9" fill="#FEF3C7" stroke={line} strokeWidth="2.2" />
        <circle cx="318" cy="90" r="9" fill="#FEF3C7" stroke={line} strokeWidth="2.2" />
        <circle cx="1282" cy="90" r="9" fill="#FEF3C7" stroke={line} strokeWidth="2.2" />
        <circle cx="1422" cy="92" r="9" fill="#FEF3C7" stroke={line} strokeWidth="2.2" />

        {/* 顶部柔焦红白相间波浪遮阳棚 */}
        {Array.from({ length: 16 }).map((_, idx) => {
          const x = idx * 100;
          const isCoral = idx % 2 === 0;
          return (
            <path
              key={idx}
              d={`M${x} 0 H${x + 100} V36 C${x + 100} 58 ${x} 58 ${x} 36 Z`}
              fill={isCoral ? '#F4A999' : '#FFFBF5'}
              stroke={line}
              strokeWidth="2.5"
            />
          );
        })}
      </svg>

      {/* ==================== 3. 左侧背景墙：日式木格花窗 + 垂挂美食暖帘 + 柔光灯笼 + 美食木架 ==================== */}
      <div className="hidden lg:block absolute left-[2.5%] xl:left-[5%] top-[16%] w-[240px] xl:w-[300px] z-10 opacity-80 blur-[0.5px]">
        <svg
          viewBox="0 0 320 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          {/* 木格花窗外框与窗台 */}
          <rect x="28" y="16" width="236" height="218" rx="14" fill="#E8BA88" stroke={line} strokeWidth="3" />
          {/* 温暖透光和纸窗底 */}
          <rect x="42" y="30" width="208" height="190" rx="8" fill="#FFF9ED" stroke={line} strokeWidth="2.2" />
          {/* 日式细密木格窗棂 */}
          <line x1="111" y1="30" x2="111" y2="220" stroke={line} strokeWidth="2.2" />
          <line x1="181" y1="30" x2="181" y2="220" stroke={line} strokeWidth="2.2" />
          <line x1="42" y1="92" x2="250" y2="92" stroke={line} strokeWidth="2.2" />
          <line x1="42" y1="156" x2="250" y2="156" stroke={line} strokeWidth="2.2" />
          {/* 窗台横木板 */}
          <rect x="18" y="226" width="256" height="14" rx="5" fill="#DFAA74" stroke={line} strokeWidth="2.5" />

          {/* 窗上垂挂三片式日式暖帘 (Noren) */}
          <line x1="22" y1="22" x2="270" y2="22" stroke={line} strokeWidth="4" strokeLinecap="round" />
          <path d="M36 22H106V88C106 94 102 96 96 96H46C40 96 36 94 36 88V22Z" fill="#F2B89B" stroke={line} strokeWidth="2.4" />
          <path d="M111 22H181V88C181 94 177 96 171 96H121C115 96 111 94 111 88V22Z" fill="#F4A999" stroke={line} strokeWidth="2.4" />
          <path d="M186 22H256V88C256 94 252 96 246 96H196C190 96 186 94 186 88V22Z" fill="#F2B89B" stroke={line} strokeWidth="2.4" />
          {/* 暖帘中间的美食碗筷剪影徽章（无文字） */}
          <circle cx="146" cy="58" r="20" fill="#FFFBF5" stroke={line} strokeWidth="2" />
          <path d="M134 60C134 68 158 68 158 60H134Z" fill="#E8BA88" stroke={line} strokeWidth="1.8" />
          <path d="M140 53C139 49 142 47 141 44M151 53C150 49 153 47 152 44" stroke={line} strokeWidth="1.8" strokeLinecap="round" />

          {/* 花窗右下角垂挂的柔和纸灯笼 */}
          <line x1="286" y1="0" x2="286" y2="115" stroke={line} strokeWidth="2.2" />
          <ellipse cx="286" cy="148" rx="26" ry="33" fill="#FDE6B8" stroke={line} strokeWidth="2.5" />
          <path d="M262 140Q286 146 310 140M262 156Q286 162 310 156" stroke={line} strokeWidth="1.6" />
          <rect x="275" y="112" width="22" height="7" rx="3" fill="#DFAA74" stroke={line} strokeWidth="2" />
          <rect x="275" y="179" width="22" height="7" rx="3" fill="#DFAA74" stroke={line} strokeWidth="2" />
          <line x1="286" y1="186" x2="286" y2="204" stroke="#E5987E" strokeWidth="3" strokeLinecap="round" />

          {/* ---- 下方美食展示木架：热拉面碗 + 三层竹蒸笼 + 陶瓷茶壶 ---- */}
          {/* 冒热气的拉面碗 */}
          <path d="M52 290C51 284 56 280 54 274M68 288C67 282 72 278 70 272" stroke={line} strokeWidth="2" strokeLinecap="round" />
          <path d="M36 306H96C94 328 80 338 66 338C52 338 38 328 36 306Z" fill="#FFFBF5" stroke={line} strokeWidth="2.4" />
          <path d="M40 315H92" stroke="#F4A999" strokeWidth="3" />
          <line x1="48" y1="296" x2="98" y2="288" stroke={line} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="52" y1="301" x2="100" y2="295" stroke={line} strokeWidth="2.2" strokeLinecap="round" />

          {/* 三层竹蒸笼与小包子 */}
          <rect x="122" y="324" width="54" height="14" rx="4" fill="#F4D39C" stroke={line} strokeWidth="2.2" />
          <rect x="122" y="310" width="54" height="14" rx="4" fill="#F7DCAC" stroke={line} strokeWidth="2.2" />
          <path d="M122 310C122 298 176 298 176 310H122Z" fill="#E8BA88" stroke={line} strokeWidth="2.2" />
          <circle cx="149" cy="298" r="5" fill="#DFAA74" stroke={line} strokeWidth="2" />

          {/* 暖瓷小茶壶 */}
          <ellipse cx="222" cy="321" rx="22" ry="17" fill="#F8D286" stroke={line} strokeWidth="2.4" />
          <path d="M198 316L187 308M244 313C254 313 254 329 244 329" stroke={line} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="222" cy="302" r="5" fill="#FFFBF5" stroke={line} strokeWidth="2" />

          {/* 美食陈列架木板 */}
          <rect x="20" y="338" width="248" height="14" rx="5" fill="#DFAA74" stroke={line} strokeWidth="2.5" />
          <path d="M46 352V370L66 352H46Z" fill="#CFA072" stroke={line} strokeWidth="2" />
          <path d="M242 352V370L222 352H242Z" fill="#CFA072" stroke={line} strokeWidth="2" />
        </svg>
      </div>

      {/* ==================== 4. 右侧背景墙：对称日式木格花窗 + 美食暖帘 + 柔光灯笼 + 甜点美食木架 ==================== */}
      <div className="hidden lg:block absolute right-[2.5%] xl:right-[5%] top-[16%] w-[240px] xl:w-[300px] z-10 opacity-80 blur-[0.5px]">
        <svg
          viewBox="0 0 320 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          {/* 木格花窗外框（对称靠右布局） */}
          <rect x="56" y="16" width="236" height="218" rx="14" fill="#E8BA88" stroke={line} strokeWidth="3" />
          <rect x="70" y="30" width="208" height="190" rx="8" fill="#FFF9ED" stroke={line} strokeWidth="2.2" />
          <line x1="139" y1="30" x2="139" y2="220" stroke={line} strokeWidth="2.2" />
          <line x1="209" y1="30" x2="209" y2="220" stroke={line} strokeWidth="2.2" />
          <line x1="70" y1="92" x2="278" y2="92" stroke={line} strokeWidth="2.2" />
          <line x1="70" y1="156" x2="278" y2="156" stroke={line} strokeWidth="2.2" />
          <rect x="46" y="226" width="256" height="14" rx="5" fill="#DFAA74" stroke={line} strokeWidth="2.5" />

          {/* 窗上垂挂三片式日式暖帘 */}
          <line x1="50" y1="22" x2="298" y2="22" stroke={line} strokeWidth="4" strokeLinecap="round" />
          <path d="M64 22H134V88C134 94 130 96 124 96H74C68 96 64 94 64 88V22Z" fill="#F8D286" stroke={line} strokeWidth="2.4" />
          <path d="M139 22H209V88C209 94 205 96 199 96H149C143 96 139 94 139 88V22Z" fill="#F5C076" stroke={line} strokeWidth="2.4" />
          <path d="M214 22H284V88C284 94 280 96 274 96H224C218 96 214 94 214 88V22Z" fill="#F8D286" stroke={line} strokeWidth="2.4" />
          {/* 暖帘中间的美食团子剪影徽章（无文字） */}
          <circle cx="174" cy="58" r="20" fill="#FFFBF5" stroke={line} strokeWidth="2" />
          <line x1="164" y1="68" x2="184" y2="48" stroke={line} strokeWidth="2" strokeLinecap="round" />
          <circle cx="169" cy="63" r="4.5" fill="#C5DFA0" stroke={line} strokeWidth="1.6" />
          <circle cx="175" cy="57" r="4.5" fill="#FFFBF5" stroke={line} strokeWidth="1.6" />
          <circle cx="181" cy="51" r="4.5" fill="#F5B8C8" stroke={line} strokeWidth="1.6" />

          {/* 花窗左侧垂挂的柔和红橙纸灯笼 */}
          <line x1="34" y1="0" x2="34" y2="115" stroke={line} strokeWidth="2.2" />
          <ellipse cx="34" cy="148" rx="26" ry="33" fill="#FAC7B8" stroke={line} strokeWidth="2.5" />
          <path d="M10 140Q34 146 58 140M10 156Q34 162 58 156" stroke={line} strokeWidth="1.6" />
          <rect x="23" y="112" width="22" height="7" rx="3" fill="#DFAA74" stroke={line} strokeWidth="2" />
          <rect x="23" y="179" width="22" height="7" rx="3" fill="#DFAA74" stroke={line} strokeWidth="2" />
          <line x1="34" y1="186" x2="34" y2="204" stroke="#E5987E" strokeWidth="3" strokeLinecap="round" />

          {/* ---- 下方美食展示木架：叠放松饼/铜锣烧 + 团子圆盘 + 冰饮珍珠杯 ---- */}
          {/* 叠放松饼配黄油 */}
          <ellipse cx="96" cy="332" rx="28" ry="6" fill="#F4D39C" stroke={line} strokeWidth="2.2" />
          <ellipse cx="96" cy="324" rx="26" ry="6" fill="#F7DCAC" stroke={line} strokeWidth="2.2" />
          <ellipse cx="96" cy="316" rx="25" ry="6" fill="#F4D39C" stroke={line} strokeWidth="2.2" />
          <rect x="89" y="306" width="14" height="7" rx="2" fill="#FEF08A" stroke={line} strokeWidth="2" />

          {/* 三色团子瓷盘 */}
          <ellipse cx="174" cy="332" rx="30" ry="6" fill="#FFFBF5" stroke={line} strokeWidth="2.2" />
          <line x1="154" y1="324" x2="196" y2="306" stroke={line} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="164" cy="320" r="7" fill="#C5DFA0" stroke={line} strokeWidth="2" />
          <circle cx="176" cy="315" r="7" fill="#FFFBF5" stroke={line} strokeWidth="2" />
          <circle cx="188" cy="310" r="7" fill="#F5B8C8" stroke={line} strokeWidth="2" />

          {/* 冰爽波霸奶茶杯 */}
          <path d="M228 298H264L259 338H233L228 298Z" fill="#FDE6B8" stroke={line} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M225 298C225 286 267 286 267 298H225Z" fill="#FFFBF5" stroke={line} strokeWidth="2.2" />
          <line x1="248" y1="274" x2="245" y2="294" stroke={line} strokeWidth="3" strokeLinecap="round" />
          <circle cx="240" cy="330" r="3" fill={line} />
          <circle cx="249" cy="331" r="3" fill={line} />
          <circle cx="245" cy="323" r="3" fill={line} />

          {/* 美食陈列架木板 */}
          <rect x="52" y="338" width="248" height="14" rx="5" fill="#DFAA74" stroke={line} strokeWidth="2.5" />
          <path d="M78 352V370L98 352H78Z" fill="#CFA072" stroke={line} strokeWidth="2" />
          <path d="M274 352V370L254 352H274Z" fill="#CFA072" stroke={line} strokeWidth="2" />
        </svg>
      </div>

      {/* ==================== 5. 底部：柔和浅焦糖通铺木吧台与护墙板 ==================== */}
      <div className="absolute bottom-0 inset-x-0 h-[175px] md:h-[205px] z-10 flex flex-col justify-end">
        {/* 通铺木吧台台面（柔和高对比度低于前景主角） */}
        <div
          className="w-full h-[66px] relative"
          style={{
            backgroundColor: '#F3C98B',
            borderTop: '3.5px solid #B8865B',
            borderBottom: '3.5px solid #B8865B',
          }}
        >
          <div className="w-full h-2 bg-[#FFF6E5]/70 mt-1" />
        </div>

        {/* 吧台下方木格纹护墙板 */}
        <div
          className="w-full h-[108px] md:h-[128px] relative"
          style={{
            backgroundColor: '#E3AE6B',
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent 0px, transparent 92px, rgba(168, 114, 68, 0.35) 92px, rgba(168, 114, 68, 0.35) 96px)',
          }}
        >
          <div className="w-full h-3 bg-[#C48F65]/40" />
        </div>
      </div>
    </div>
  );
}
