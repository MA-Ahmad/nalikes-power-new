interface HexagonPolygonProps {
  value: string | number
  isHighlight?: boolean
}

export function HexagonPolygon({
  value,
  isHighlight = false,
}: HexagonPolygonProps) {
  return (
    <svg
      width="60"
      height="65"
      viewBox="0 0 75 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <g filter="url(#filter0_di_3308_19108)">
        <path
          d="M33.5069 13.9245C35.6798 12.67 38.3568 12.67 40.5297 13.9245L57.5415 23.7463C59.7143 25.0008 61.0529 27.3192 61.0529 29.8282V49.4717C61.0529 51.9807 59.7143 54.2991 57.5415 55.5536L40.5297 65.3754C38.3568 66.6299 35.6798 66.6299 33.5069 65.3754L16.4951 55.5536C14.3223 54.2991 12.9837 51.9807 12.9837 49.4717V29.8282C12.9837 27.3192 14.3223 25.0008 16.4951 23.7463L33.5069 13.9245Z"
          fill={isHighlight ? '#EE4FFB' : '#EE4FFB'}
          fillOpacity={isHighlight ? '0.5' : '0.3'}
          shapeRendering="crispEdges"
        />
        <path
          d="M33.9462 14.6843C35.8473 13.587 38.1897 13.5868 40.0908 14.6843L57.1025 24.5066C59.0037 25.6042 60.1746 27.6326 60.1748 29.8279V49.4714C60.1748 51.6668 59.0037 53.696 57.1025 54.7937L40.0908 64.615C38.1896 65.7126 35.8475 65.7125 33.9462 64.615L16.9345 54.7937C15.0333 53.696 13.8613 51.6668 13.8613 49.4714V29.8279C13.8614 27.6326 15.0334 25.6042 16.9345 24.5066L33.9462 14.6843Z"
          stroke="#EE4FFB"
          strokeWidth="1.7557"
          shapeRendering="crispEdges"
        />
      </g>
      <text
        x="37.5"
        y="42"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="20"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        {value}
      </text>
      <defs>
        <filter
          id="filter0_di_3308_19108"
          x="-5.72205e-06"
          y="-9.72748e-05"
          width="74.0366"
          height="79.3"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="6.49187" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.933333 0 0 0 0 0.309804 0 0 0 0 0.984314 0 0 0 0.43 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3308_19108"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3308_19108"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="12.9837" />
          <feGaussianBlur stdDeviation="6.49187" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_3308_19108"
          />
        </filter>
      </defs>
    </svg>
  )
}
