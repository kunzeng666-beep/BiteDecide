export default function ChefIllustration() {
  return (
    <svg
      viewBox="0 0 280 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[310px] h-[300px] md:w-[365px] md:h-[350px] shrink-0 drop-shadow-[0_10px_20px_rgba(59,35,20,0.08)]"
    >
      {/* 暖黄背景光晕圆 */}
      <circle
        cx="140"
        cy="145"
        r="105"
        fill="#FDE68A"
        stroke="#3B2314"
        strokeWidth="3.5"
        strokeDasharray="8 6"
      />

      {/* 厨师帽 (蓬松云朵造型) */}
      <path
        d="M95 82C82 82 74 70 80 58C85 46 98 45 106 50C114 34 138 30 152 44C165 36 184 44 185 60C194 66 192 82 178 82H95Z"
        fill="#FFFFFF"
        stroke="#3B2314"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect
        x="96"
        y="76"
        width="80"
        height="18"
        rx="6"
        fill="#FFFFFF"
        stroke="#3B2314"
        strokeWidth="4"
      />
      <path
        d="M115 76V64M136 76V60M157 76V64"
        stroke="#3B2314"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 挥动木勺的右手臂 (带动画) */}
      <g className="chef-wave-arm">
        {/* 木柄汤勺 */}
        <line
          x1="215"
          y1="142"
          x2="242"
          y2="92"
          stroke="#92400E"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <line
          x1="215"
          y1="142"
          x2="242"
          y2="92"
          stroke="#3B2314"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <ellipse
          cx="246"
          cy="84"
          rx="14"
          ry="10"
          transform="rotate(-25 246 84)"
          fill="#D97706"
          stroke="#3B2314"
          strokeWidth="3.5"
        />
        {/* 厨师右袖子与圆手 */}
        <path
          d="M182 168C198 162 212 150 220 138"
          stroke="#FFFFFF"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          d="M182 168C198 162 212 150 220 138"
          stroke="#3B2314"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle
          cx="222"
          cy="136"
          r="10"
          fill="#FED7AA"
          stroke="#3B2314"
          strokeWidth="3.5"
        />
      </g>

      {/* 厨师身体双排扣白袍 */}
      <path
        d="M88 195C88 158 106 144 136 144C166 144 184 158 184 195H88Z"
        fill="#FFFFFF"
        stroke="#3B2314"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* 红色领巾 */}
      <path
        d="M114 146L136 168L158 146"
        fill="#EF4444"
        stroke="#3B2314"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <circle cx="126" cy="176" r="3.5" fill="#3B2314" />
      <circle cx="146" cy="176" r="3.5" fill="#3B2314" />

      {/* 厨师圆润笑脸 */}
      <rect
        x="98"
        y="88"
        width="76"
        height="62"
        rx="30"
        fill="#FED7AA"
        stroke="#3B2314"
        strokeWidth="4"
      />
      {/* 弯弯笑眼 */}
      <path
        d="M114 114C116 109 122 109 124 114"
        stroke="#3B2314"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M148 114C150 109 156 109 158 114"
        stroke="#3B2314"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* 温暖红脸蛋 */}
      <ellipse cx="110" cy="124" rx="6" ry="3.5" fill="#FB7185" opacity="0.65" />
      <ellipse cx="162" cy="124" rx="6" ry="3.5" fill="#FB7185" opacity="0.65" />
      {/* 笑容 */}
      <path
        d="M126 126C131 133 141 133 146 126"
        stroke="#3B2314"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 前方暖木料理台面 */}
      <rect
        x="34"
        y="195"
        width="212"
        height="44"
        rx="12"
        fill="#D97706"
        stroke="#3B2314"
        strokeWidth="4"
      />
      <rect
        x="42"
        y="203"
        width="196"
        height="28"
        rx="8"
        fill="#F59E0B"
        stroke="#3B2314"
        strokeWidth="2.5"
      />

      {/* 料理台左侧：冒热气的黑陶砂锅 */}
      <g className="steam-1">
        <path
          d="M74 162C71 155 77 150 74 143"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>
      <g className="steam-2">
        <path
          d="M86 158C83 151 89 146 86 139"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>
      <g className="steam-3">
        <path
          d="M98 162C95 155 101 150 98 143"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M62 174H110L104 195H68L62 174Z"
        fill="#292524"
        stroke="#3B2314"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <ellipse
        cx="86"
        cy="174"
        rx="25"
        ry="6"
        fill="#EF4444"
        stroke="#3B2314"
        strokeWidth="3.5"
      />

      {/* 料理台右侧：三层竹编蒸笼 */}
      <rect
        x="168"
        y="181"
        width="46"
        height="14"
        rx="4"
        fill="#FCD34D"
        stroke="#3B2314"
        strokeWidth="3.5"
      />
      <rect
        x="168"
        y="167"
        width="46"
        height="14"
        rx="4"
        fill="#FBBF24"
        stroke="#3B2314"
        strokeWidth="3.5"
      />
      <path
        d="M168 167C168 158 214 158 214 167H168Z"
        fill="#D97706"
        stroke="#3B2314"
        strokeWidth="3.5"
      />
    </svg>
  );
}
