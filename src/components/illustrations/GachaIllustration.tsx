import type { CSSProperties } from 'react';
import { GACHA_COLORS } from '../../data/foods';

interface GachaIllustrationProps {
  knobAngle: number;
}

interface BallConfig {
  id: number;
  cx: number;
  cy: number;
  r: number;
  color: string;
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

// 12 颗错落堆叠的独立纯色扭蛋球（每颗拥有各自独立的位移向量、频率与相位延迟）
const GACHA_BALLS: BallConfig[] = [
  {
    id: 1,
    cx: 96,
    cy: 142,
    r: 14.5,
    color: GACHA_COLORS.hotpot,
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
    cx: 124,
    cy: 150,
    r: 15,
    color: GACHA_COLORS.noodle,
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
    cx: 154,
    cy: 149,
    r: 15,
    color: GACHA_COLORS.rice,
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
    cx: 182,
    cy: 140,
    r: 14.5,
    color: GACHA_COLORS.fastfood,
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
    cx: 88,
    cy: 115,
    r: 14,
    color: GACHA_COLORS.snack,
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
    cx: 115,
    cy: 122,
    r: 15,
    color: GACHA_COLORS.bbq,
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
    cx: 143,
    cy: 123,
    r: 14.5,
    color: GACHA_COLORS.porridge,
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
    cx: 171,
    cy: 118,
    r: 14.5,
    color: GACHA_COLORS.light,
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
    cx: 192,
    cy: 112,
    r: 13.5,
    color: GACHA_COLORS.hotpot,
    idleX: '-3px',
    idleY: '-3.5px',
    idleRot: '-6deg',
    idleDur: '2.9s',
    hopX: '-11px',
    hopY: '-14px',
    hopRot: '-20deg',
    hopDur: '0.51s',
    delay: '-1.7s',
  },
  {
    id: 10,
    cx: 104,
    cy: 94,
    r: 13.5,
    color: GACHA_COLORS.rice,
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
    id: 11,
    cx: 132,
    cy: 96,
    r: 14,
    color: GACHA_COLORS.fastfood,
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
    id: 12,
    cx: 160,
    cy: 93,
    r: 13.5,
    color: GACHA_COLORS.snack,
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
}: GachaIllustrationProps) {
  return (
    <svg
      viewBox="0 0 280 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[310px] h-[300px] md:w-[365px] md:h-[350px] shrink-0 drop-shadow-[0_10px_20px_rgba(59,35,20,0.08)]"
    >
      <defs>
        {/* 球仓圆形裁剪遮罩：确保扭蛋球剧烈弹跳时不超出玻璃球罩边界 */}
        <clipPath id="gachaGlobeClip">
          <circle cx="140" cy="108" r="61" />
        </clipPath>
      </defs>

      {/* 暖粉橙背景光晕圆 */}
      <circle
        cx="140"
        cy="145"
        r="108"
        fill="#FED7AA"
        stroke="#3B2314"
        strokeWidth="3.5"
        strokeDasharray="8 6"
      />

      {/* 扭蛋机玻璃球仓底色 */}
      <circle
        cx="140"
        cy="108"
        r="64"
        fill="#FFFDF9"
        stroke="#3B2314"
        strokeWidth="4"
      />

      {/* 12 颗各自独立晃动弹跳的纯色扭蛋球 */}
      <g clipPath="url(#gachaGlobeClip)">
        {GACHA_BALLS.map((ball) => {
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
            >
              {/* 纯色扭蛋球体 */}
              <circle
                cx={ball.cx}
                cy={ball.cy}
                r={ball.r}
                fill={ball.color}
                stroke="#3B2314"
                strokeWidth="3"
              />
              {/* 扭蛋中缝线（增强立体真实感） */}
              <path
                d={`M${ball.cx - ball.r + 2} ${ball.cy} Q${ball.cx} ${
                  ball.cy + 4
                } ${ball.cx + ball.r - 2} ${ball.cy}`}
                stroke="#3B2314"
                strokeWidth="1.8"
                strokeOpacity="0.45"
                fill="none"
              />
              {/* 高光圆点 */}
              <circle
                cx={ball.cx - ball.r * 0.32}
                cy={ball.cy - ball.r * 0.32}
                r={ball.r * 0.24}
                fill="#FFFFFF"
                opacity="0.78"
              />
            </g>
          );
        })}
      </g>

      {/* 玻璃球仓外圈描边与高光弧线 */}
      <circle
        cx="140"
        cy="108"
        r="64"
        fill="none"
        stroke="#3B2314"
        strokeWidth="4"
      />
      <path
        d="M92 76C102 60 120 54 138 54"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* 扭蛋机顶部复古圆帽 */}
      <path
        d="M98 50C98 36 182 36 182 50H98Z"
        fill="#EF4444"
        stroke="#3B2314"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle
        cx="140"
        cy="34"
        r="8"
        fill="#F59E0B"
        stroke="#3B2314"
        strokeWidth="3.5"
      />

      {/* 扭蛋机下半部梯形红珊瑚机身 */}
      <path
        d="M84 160H196L208 238H72L84 160Z"
        fill="#EF5B44"
        stroke="#3B2314"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect
        x="78"
        y="154"
        width="124"
        height="12"
        rx="6"
        fill="#F59E0B"
        stroke="#3B2314"
        strokeWidth="3.5"
      />

      {/* 旋转金属圆盘与把手 */}
      <circle
        cx="140"
        cy="186"
        r="18"
        fill="#FEF08A"
        stroke="#3B2314"
        strokeWidth="3.5"
      />
      <g
        style={{
          transformOrigin: '140px 186px',
          transform: `rotate(${knobAngle}deg)`,
          transition: 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <rect
          x="122"
          y="181"
          width="36"
          height="10"
          rx="5"
          fill="#F59E0B"
          stroke="#3B2314"
          strokeWidth="3"
        />
      </g>

      {/* 底部出球口挡板 */}
      <rect x="116" y="212" width="48" height="26" rx="8" fill="#3B2314" />
      <rect x="122" y="216" width="36" height="18" rx="5" fill="#78350F" />
    </svg>
  );
}
