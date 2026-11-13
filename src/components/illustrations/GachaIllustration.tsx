import type { CSSProperties } from 'react';
import { GACHA_COLORS } from '../../data/foods';

interface GachaIllustrationProps {
  knobAngle: number;
  onKnobClick?: () => void;
  interactiveKnob?: boolean;
  size?: 'normal' | 'large';
  showHalo?: boolean;
}

interface BallConfig {
  id: number;
  cx: number;
  cy: number;
  r: number;
  color: string;
  layer: 'back' | 'front';
  idleX: string;
  idleY: string;
  idleRot: string;
  idleDur: string;
  hopX: string;
  hopY: string;
  hopRot: string;
  hopDur: string;
  delay: string;
}

// 14 颗错落堆叠的独立纯色扭蛋球（分前后两层景深，严格保持纯色无文字图标）
const GACHA_BALLS: BallConfig[] = [
  // ---- 后景深层（稍微靠后填补缝隙） ----
  {
    id: 101,
    cx: 112,
    cy: 132,
    r: 13.5,
    color: GACHA_COLORS.light,
    layer: 'back',
    idleX: '1.5px',
    idleY: '-2.5px',
    idleRot: '5deg',
    idleDur: '2.8s',
    hopX: '6px',
    hopY: '-14px',
    hopRot: '18deg',
    hopDur: '0.54s',
    delay: '-0.4s',
  },
  {
    id: 102,
    cx: 142,
    cy: 134,
    r: 14,
    color: GACHA_COLORS.hotpot,
    layer: 'back',
    idleX: '-1.5px',
    idleY: '-3px',
    idleRot: '-6deg',
    idleDur: '2.6s',
    hopX: '-5px',
    hopY: '-15px',
    hopRot: '-20deg',
    hopDur: '0.5s',
    delay: '-1.1s',
  },
  {
    id: 103,
    cx: 168,
    cy: 130,
    r: 13.5,
    color: GACHA_COLORS.noodle,
    layer: 'back',
    idleX: '2px',
    idleY: '-2.5px',
    idleRot: '6deg',
    idleDur: '2.9s',
    hopX: '7px',
    hopY: '-13px',
    hopRot: '22deg',
    hopDur: '0.58s',
    delay: '-0.7s',
  },

  // ---- 前景主层（饱满立体，各自独立弹跳） ----
  {
    id: 1,
    cx: 96,
    cy: 142,
    r: 14.5,
    color: GACHA_COLORS.hotpot,
    layer: 'front',
    idleX: '2.5px',
    idleY: '-3.5px',
    idleRot: '8deg',
    idleDur: '2.3s',
    hopX: '8px',
    hopY: '-16px',
    hopRot: '25deg',
    hopDur: '0.52s',
    delay: '0s',
  },
  {
    id: 2,
    cx: 125,
    cy: 148,
    r: 15,
    color: GACHA_COLORS.noodle,
    layer: 'front',
    idleX: '-2px',
    idleY: '-4px',
    idleRot: '-7deg',
    idleDur: '2.7s',
    hopX: '-7px',
    hopY: '-19px',
    hopRot: '-28deg',
    hopDur: '0.46s',
    delay: '-0.35s',
  },
  {
    id: 3,
    cx: 155,
    cy: 147,
    r: 15,
    color: GACHA_COLORS.rice,
    layer: 'front',
    idleX: '3px',
    idleY: '-3px',
    idleRot: '9deg',
    idleDur: '2.1s',
    hopX: '6px',
    hopY: '-17px',
    hopRot: '22deg',
    hopDur: '0.58s',
    delay: '-0.8s',
  },
  {
    id: 4,
    cx: 183,
    cy: 138,
    r: 14.5,
    color: GACHA_COLORS.fastfood,
    layer: 'front',
    idleX: '-2.5px',
    idleY: '-4.5px',
    idleRot: '-10deg',
    idleDur: '2.5s',
    hopX: '-9px',
    hopY: '-15px',
    hopRot: '-24deg',
    hopDur: '0.5s',
    delay: '-1.2s',
  },
  {
    id: 5,
    cx: 89,
    cy: 114,
    r: 14,
    color: GACHA_COLORS.snack,
    layer: 'front',
    idleX: '3px',
    idleY: '-5px',
    idleRot: '11deg',
    idleDur: '2.6s',
    hopX: '10px',
    hopY: '-18px',
    hopRot: '30deg',
    hopDur: '0.48s',
    delay: '-0.5s',
  },
  {
    id: 6,
    cx: 117,
    cy: 118,
    r: 15,
    color: GACHA_COLORS.bbq,
    layer: 'front',
    idleX: '-3px',
    idleY: '-4px',
    idleRot: '-8deg',
    idleDur: '2.2s',
    hopX: '-8px',
    hopY: '-22px',
    hopRot: '-32deg',
    hopDur: '0.54s',
    delay: '-1.5s',
  },
  {
    id: 7,
    cx: 145,
    cy: 119,
    r: 14.5,
    color: GACHA_COLORS.porridge,
    layer: 'front',
    idleX: '2px',
    idleY: '-5.5px',
    idleRot: '7deg',
    idleDur: '2.8s',
    hopX: '7px',
    hopY: '-20px',
    hopRot: '26deg',
    hopDur: '0.44s',
    delay: '-0.2s',
  },
  {
    id: 8,
    cx: 173,
    cy: 114,
    r: 14.5,
    color: GACHA_COLORS.light,
    layer: 'front',
    idleX: '-2px',
    idleY: '-4px',
    idleRot: '-9deg',
    idleDur: '2.4s',
    hopX: '-10px',
    hopY: '-19px',
    hopRot: '-25deg',
    hopDur: '0.6s',
    delay: '-0.95s',
  },
  {
    id: 9,
    cx: 105,
    cy: 90,
    r: 13.5,
    color: GACHA_COLORS.rice,
    layer: 'front',
    idleX: '2.5px',
    idleY: '-4.5px',
    idleRot: '10deg',
    idleDur: '2.35s',
    hopX: '9px',
    hopY: '-15px',
    hopRot: '28deg',
    hopDur: '0.49s',
    delay: '-0.65s',
  },
  {
    id: 10,
    cx: 134,
    cy: 92,
    r: 14,
    color: GACHA_COLORS.fastfood,
    layer: 'front',
    idleX: '-2.5px',
    idleY: '-5px',
    idleRot: '-8deg',
    idleDur: '2.15s',
    hopX: '-6px',
    hopY: '-18px',
    hopRot: '-24deg',
    hopDur: '0.56s',
    delay: '-1.1s',
  },
  {
    id: 11,
    cx: 162,
    cy: 89,
    r: 13.5,
    color: GACHA_COLORS.snack,
    layer: 'front',
    idleX: '2px',
    idleY: '-4.5px',
    idleRot: '9deg',
    idleDur: '2.65s',
    hopX: '-8px',
    hopY: '-16px',
    hopRot: '27deg',
    hopDur: '0.47s',
    delay: '-1.4s',
  },
];

export default function GachaIllustration({
  knobAngle,
  onKnobClick,
  interactiveKnob = false,
  size = 'normal',
  showHalo = true,
}: GachaIllustrationProps) {
  const sizeClass =
    size === 'large'
      ? 'w-[385px] h-[372px] md:w-[480px] md:h-[462px]'
      : 'w-[310px] h-[300px] md:w-[365px] md:h-[350px]';

  return (
    <svg
      viewBox="0 0 280 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClass} shrink-0 drop-shadow-[0_10px_20px_rgba(59,35,20,0.08)] transition-all duration-300`}
    >
      <defs>
        {/* 球仓圆形裁剪遮罩 */}
        <clipPath id="gachaGlobeClip">
          <circle cx="140" cy="107" r="59" />
        </clipPath>

        {/* 玻璃球仓内部柔和立体渐变 */}
        <radialGradient id="gachaGlassGrad" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="68%" stopColor="#FFF7ED" />
          <stop offset="100%" stopColor="#E0F2FE" />
        </radialGradient>

        {/* 机身正面暗部边缘渐变感 */}
        <linearGradient id="gachaBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FB7161" />
          <stop offset="18%" stopColor="#EF5B44" />
          <stop offset="82%" stopColor="#EF5B44" />
          <stop offset="100%" stopColor="#D63E2A" />
        </linearGradient>
      </defs>

      {/* 首页分屏模式才显示的虚线光晕圆环；独立展台模式下隐藏以避免穿帮 */}
      {showHalo && (
        <circle
          cx="140"
          cy="145"
          r="108"
          fill="#FED7AA"
          stroke="#3B2314"
          strokeWidth="3.5"
          strokeDasharray="8 6"
        />
      )}

      {/* 机器底座接触阴影 */}
      <ellipse
        cx="140"
        cy="256"
        rx="74"
        ry="8"
        fill="#3B2314"
        opacity="0.16"
      />

      {/* ==================== 1. 玻璃球仓与立体反光 ==================== */}
      <circle
        cx="140"
        cy="107"
        r="62"
        fill="url(#gachaGlassGrad)"
        stroke="#3B2314"
        strokeWidth="4"
      />

      {/* 球仓内部顶部与底部的微阴影弧，增强球形进深 */}
      <path
        d="M84 82 A59 59 0 0 1 196 82 A64 38 0 0 0 84 82 Z"
        fill="#BAE6FD"
        opacity="0.35"
      />

      {/* 14 颗各自独立晃动弹跳的纯色扭蛋球 */}
      <g clipPath="url(#gachaGlobeClip)">
        {GACHA_BALLS.map((ball) => {
          const isBack = ball.layer === 'back';
          const ballStyle = {
            '--idle-x': ball.idleX,
            '--idle-y': ball.idleY,
            '--idle-rot': ball.idleRot,
            '--idle-dur': ball.idleDur,
            '--hop-x': ball.hopX,
            '--hop-y': ball.hopY,
            '--hop-rot': ball.hopRot,
            '--hop-dur': ball.hopDur,
            '--anim-delay': ball.delay,
          } as CSSProperties;

          return (
            <g
              key={ball.id}
              className="gacha-single-ball"
              style={ballStyle}
              opacity={isBack ? 0.72 : 1}
            >
              {/* 纯色球体底色 */}
              <circle
                cx={ball.cx}
                cy={ball.cy}
                r={ball.r}
                fill={ball.color}
                stroke="#3B2314"
                strokeWidth={isBack ? 2.4 : 2.9}
              />

              {/* 球体右下月牙立体暗影 */}
              <path
                d={`M${ball.cx - ball.r * 0.65} ${ball.cy + ball.r * 0.65} A${ball.r} ${ball.r} 0 0 0 ${ball.cx + ball.r * 0.75} ${ball.cy - ball.r * 0.55} A${ball.r * 1.15} ${ball.r * 1.15} 0 0 1 ${ball.cx - ball.r * 0.65} ${ball.cy + ball.r * 0.65} Z`}
                fill="#3B2314"
                opacity="0.18"
              />

              {/* 扭蛋赤道中缝卡扣线 */}
              <path
                d={`M${ball.cx - ball.r + 2} ${ball.cy} Q${ball.cx} ${
                  ball.cy + 3.8
                } ${ball.cx + ball.r - 2} ${ball.cy}`}
                stroke="#3B2314"
                strokeWidth="1.7"
                strokeOpacity="0.4"
                fill="none"
              />

              {/* 晶莹高光圆点 */}
              <ellipse
                cx={ball.cx - ball.r * 0.34}
                cy={ball.cy - ball.r * 0.34}
                rx={ball.r * 0.25}
                ry={ball.r * 0.17}
                transform={`rotate(-30 ${ball.cx - ball.r * 0.34} ${ball.cy - ball.r * 0.34})`}
                fill="#FFFFFF"
                opacity="0.85"
              />
            </g>
          );
        })}
      </g>

      {/* 玻璃球仓外圈描边 + 多重通透玻璃反光 */}
      <circle
        cx="140"
        cy="107"
        r="62"
        fill="none"
        stroke="#3B2314"
        strokeWidth="4"
      />
      {/* 左上主弧光 */}
      <path
        d="M90 80 C97 61 116 52 135 51"
        stroke="#FFFFFF"
        strokeWidth="5.5"
        strokeLinecap="round"
        opacity="0.92"
      />
      <circle cx="88" cy="91" r="2.8" fill="#FFFFFF" opacity="0.9" />
      {/* 右下微弱玻璃反光 */}
      <path
        d="M188 128 C184 140 175 149 164 154"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* ==================== 2. 顶部复古穹顶冠盖与黄铜颈环 ==================== */}
      {/* 顶珠底座与宝石顶钮 */}
      <rect
        x="130"
        y="24"
        width="20"
        height="7"
        rx="3"
        fill="#D97706"
        stroke="#3B2314"
        strokeWidth="3"
      />
      <circle
        cx="140"
        cy="19"
        r="8.5"
        fill="#FBBF24"
        stroke="#3B2314"
        strokeWidth="3.5"
      />
      <circle cx="137" cy="16.5" r="2.5" fill="#FFFBEB" />

      {/* 穹顶弧形红盖 */}
      <path
        d="M94 50 C96 27 184 27 186 50 Z"
        fill="#EF4444"
        stroke="#3B2314"
        strokeWidth="3.8"
        strokeLinejoin="round"
      />
      {/* 穹顶高光条与暗部阴影 */}
      <path
        d="M107 45 C112 34 126 31 138 31"
        stroke="#FCA5A5"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M168 36 C176 39 181 44 183 49 H169 C169 44 168 39 168 36 Z"
        fill="#B91C1C"
        opacity="0.45"
      />

      {/* 上部黄铜压边带与铆钉 */}
      <rect
        x="90"
        y="48"
        width="100"
        height="10"
        rx="5"
        fill="#F59E0B"
        stroke="#3B2314"
        strokeWidth="3.5"
      />
      <line
        x1="96"
        y1="51.5"
        x2="184"
        y2="51.5"
        stroke="#FEF08A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="101" cy="53" r="1.8" fill="#3B2314" />
      <circle cx="140" cy="53" r="1.8" fill="#3B2314" />
      <circle cx="179" cy="53" r="1.8" fill="#3B2314" />

      {/* ==================== 3. 中部双层黄铜腰环（衔接球仓与机身） ==================== */}
      <rect
        x="81"
        y="151"
        width="118"
        height="8"
        rx="4"
        fill="#D97706"
        stroke="#3B2314"
        strokeWidth="3.2"
      />
      <rect
        x="75"
        y="157"
        width="130"
        height="12"
        rx="6"
        fill="#FBBF24"
        stroke="#3B2314"
        strokeWidth="3.6"
      />
      <line
        x1="84"
        y1="160.5"
        x2="196"
        y2="160.5"
        stroke="#FEF9C3"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* 腰环两侧小螺钉 */}
      <circle cx="88" cy="163" r="2" fill="#3B2314" />
      <circle cx="192" cy="163" r="2" fill="#3B2314" />

      {/* ==================== 4. 下半部精致复古机身与机械操作面板 ==================== */}
      {/* 底部左右防滑黄铜机脚 */}
      <path
        d="M78 246 H98 L95 256 H81 L78 246 Z"
        fill="#D97706"
        stroke="#3B2314"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M182 246 H202 L199 256 H185 L182 246 Z"
        fill="#D97706"
        stroke="#3B2314"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 机身主箱体 */}
      <path
        d="M81 169 H199 L211 242 Q212 247 206 247 H74 Q68 247 69 242 L81 169 Z"
        fill="url(#gachaBodyGrad)"
        stroke="#3B2314"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* 左侧边缘立体亮条 */}
      <path
        d="M86 174 L76 239"
        stroke="#FDA4AF"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.65"
      />
      {/* 底部黄铜围边基座 */}
      <rect
        x="67"
        y="240"
        width="146"
        height="8"
        rx="4"
        fill="#F59E0B"
        stroke="#3B2314"
        strokeWidth="3.4"
      />

      {/* 正面奶油色机械操纵面板底板 */}
      <rect
        x="85"
        y="175"
        width="110"
        height="61"
        rx="12"
        fill="#FFF8EB"
        stroke="#3B2314"
        strokeWidth="3.2"
      />
      {/* 面板四角精密铆钉 */}
      <circle cx="92" cy="182" r="1.8" fill="#92400E" />
      <circle cx="188" cy="182" r="1.8" fill="#92400E" />
      <circle cx="92" cy="229" r="1.8" fill="#92400E" />
      <circle cx="188" cy="229" r="1.8" fill="#92400E" />

      {/* ---- 面板左侧：精巧投币口与退币小按钮 ---- */}
      <rect
        x="93"
        y="186"
        width="19"
        height="27"
        rx="5"
        fill="#FDE68A"
        stroke="#3B2314"
        strokeWidth="2.5"
      />
      {/* 竖向投币狭缝 */}
      <rect x="100.5" y="190" width="4" height="13" rx="2" fill="#3B2314" />
      {/* 退币红色小圆钮 */}
      <circle
        cx="102.5"
        cy="208"
        r="3"
        fill="#EF4444"
        stroke="#3B2314"
        strokeWidth="1.8"
      />

      {/* ---- 面板右侧：绿色指示小灯与星形铭牌铆钉 ---- */}
      <circle
        cx="178"
        cy="192"
        r="4.5"
        fill="#84CC16"
        stroke="#3B2314"
        strokeWidth="2.2"
      />
      <circle cx="176.8" cy="190.8" r="1.3" fill="#FFFFFF" />
      <rect
        x="171"
        y="202"
        width="14"
        height="8"
        rx="3"
        fill="#FED7AA"
        stroke="#3B2314"
        strokeWidth="2"
      />

      {/* ---- 面板中央：精细多层次金属旋转把手（支持点击拧动） ---- */}
      <g
        onClick={(e) => {
          if (interactiveKnob && onKnobClick) {
            e.stopPropagation();
            onKnobClick();
          }
        }}
        className={
          interactiveKnob
            ? 'cursor-pointer hover:brightness-105 transition-all'
            : ''
        }
      >
        {/* 底座外圈刻度盘 */}
        <circle
          cx="140"
          cy="193"
          r="20"
          fill="#FBBF24"
          stroke="#3B2314"
          strokeWidth="3.2"
        />
        <circle
          cx="140"
          cy="193"
          r="14.5"
          fill="#FEF9C3"
          stroke="#3B2314"
          strokeWidth="2.4"
        />

        {/* 可旋转把手组 */}
        <g
          style={{
            transformOrigin: '140px 193px',
            transform: `rotate(${knobAngle}deg)`,
            transition: 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* 立体 T 型旋钮柄 */}
          <rect
            x="119"
            y="187"
            width="42"
            height="12"
            rx="6"
            fill="#F59E0B"
            stroke="#3B2314"
            strokeWidth="2.8"
          />
          {/* 把手高光条 */}
          <line
            x1="124"
            y1="190"
            x2="156"
            y2="190"
            stroke="#FEF08A"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* 两侧捏手抓握凹槽 */}
          <line x1="126" y1="190" x2="126" y2="196" stroke="#3B2314" strokeWidth="1.8" />
          <line x1="154" y1="190" x2="154" y2="196" stroke="#3B2314" strokeWidth="1.8" />
          {/* 中心金属轴帽 */}
          <circle
            cx="140"
            cy="193"
            r="6"
            fill="#EF4444"
            stroke="#3B2314"
            strokeWidth="2.4"
          />
          <circle cx="138.5" cy="191.5" r="1.6" fill="#FFFFFF" opacity="0.85" />
        </g>
      </g>

      {/* ==================== 5. 底部带半透明推拉挡板的出球通道 ==================== */}
      {/* 出球口拱形外框 */}
      <rect
        x="113"
        y="217"
        width="54"
        height="27"
        rx="8"
        fill="#D97706"
        stroke="#3B2314"
        strokeWidth="3.2"
      />
      {/* 深色内槽通道 */}
      <rect x="118" y="221" width="44" height="20" rx="5" fill="#29160B" />
      {/* 内部斜坡微光 */}
      <path d="M120 240 L126 232 H154 L160 240 Z" fill="#5C341E" />
      {/* 半透明亚克力推拉挡板 + 顶部合页 + 斜向反光 */}
      <rect
        x="119"
        y="222"
        width="42"
        height="17"
        rx="4"
        fill="#FFFDF9"
        fillOpacity="0.22"
        stroke="#FDE68A"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <line
        x1="126"
        y1="235"
        x2="136"
        y2="225"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <line
        x1="135"
        y1="235"
        x2="141"
        y2="229"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* 挡板底部推拉把手边 */}
      <rect
        x="128"
        y="236"
        width="24"
        height="3.5"
        rx="1.7"
        fill="#FBBF24"
        stroke="#3B2314"
        strokeWidth="1.5"
      />
    </svg>
  );
}
