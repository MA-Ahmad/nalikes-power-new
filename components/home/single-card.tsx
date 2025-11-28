'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Play } from 'lucide-react'
import { useState } from 'react'
import { ButtonBlue, ButtonPink, ButtonPinkSmall } from '../game/buttons'
import { HeartIconGray } from '../game/svgs'

interface GameCardProps {
  title: string
  amount: string
  badges?: Array<{
    text: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  }>
  isNew?: boolean
  isHot?: boolean
  image?: string
  progress: number
}

export function GameCard({
  title,
  amount,
  badges = [],
  isNew = false,
  isHot = false,
  image,
  progress,
}: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative border-0 text-white overflow-hidden cursor-pointer transition-transform hover:scale-102 px-4 min-h-[17rem] sm:min-h-[19rem] py-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* <Card
      className="relative bg-gradient-dark border-pink-light/10 text-white overflow-hidden cursor-pointer transition-transform hover:scale-102 px-4 min-h-[24rem]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    > */}
      <GameCardSvg />
      <div className="absolute object-contain w-full flex items-center justify-center top-0 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <img src={image} alt="Solana themed items" className="w-full h-full" />
      </div>
      {/* <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10" /> */}
      <div className="flex flex-col justify-between px-2 h-full z-10">
        {/* Header with badges and star */}
        <div className="flex justify-between items-start pb-2">
          <div className="hidden sm:flex gap-2">
            {isNew && (
              <ButtonBlue>
                <span className="relative text-[#4F9FFB] whitespace-nowrap flex items-center justify-center">
                  New
                </span>
              </ButtonBlue>
            )}
            {isHot && (
              <ButtonPinkSmall>
                <span className="relative text-pink-light whitespace-nowrap flex items-center justify-center">
                  Hot
                </span>
              </ButtonPinkSmall>
            )}
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant={badge.variant || 'default'}
                className="text-xs px-2 py-1"
              >
                {badge.text}
              </Badge>
            ))}
          </div>
          {/* <Star
            className={`h-6 w-6 transition-opacity duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            stroke="white"
            fill="none"
          /> */}

          <HeartIconGray />
        </div>

        {/* Footer with amount and play */}
        <div className="flex flex-col pt-0 z-10 items-center sm:items-start">
          <div className="flex flex-col justify-center mb-2">
            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
              {title}
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
            <span className="px-3 py-px  bg-[#A27B01]/30 border border-[#FDC61C] rounded text-[#FDC61C] font-semibold">
              {amount}
            </span>
            <div className="flex gap-px w-full">
              {Array.from({ length: 4 }, (_, index) => {
                // const totalProgress = progress
                // const segmentWidth = 100 / 4
                // const segmentStart = index * segmentWidth
                // const segmentEnd = (index + 1) * segmentWidth

                // let segmentFillPercentage = 0
                // if (totalProgress >= segmentEnd) {
                //   segmentFillPercentage = 100
                // } else if (totalProgress > segmentStart) {
                //   segmentFillPercentage =
                //     ((totalProgress - segmentStart) / segmentWidth) * 100
                // }

                return (
                  <div
                    key={index}
                    className="flex-1 h-5 rounded bg-white/10 border border-[#FFF2CC]/20 overflow-hidden group/segment hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(253,198,28,0.8)]"
                  >
                    <div
                      className="h-full bg-[#fdc61c] transition-all duration-500 ease-out shadow-lg"
                      style={{ width: `${100}%` }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const GameCardSvg = () => {
  return (
    <svg
      // width="330"
      // height="292"
      viewBox="0 0 330 292"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-cover -z-[1]"
      preserveAspectRatio="none" // <— important
    >
      {/* <foreignObject x="-878.591" y="-878.591" width="2087.18" height="2049.18">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style="backdrop-filter:blur(439.3px);clip-path:url(#bgblur_0_5142_14505_clip_path);height:100%;width:100%"
        ></div>
      </foreignObject> */}
      <g
        filter="url(#filter0_n_5142_14505)"
        data-figma-bg-blur-radius="878.591"
      >
        <path
          d="M15.2426 2.75736L2.75736 15.2426C1.63214 16.3679 1 17.894 1 19.4853V285C1 288.314 3.6863 291 7 291H310.515C312.106 291 313.632 290.368 314.757 289.243L327.243 276.757C328.368 275.632 329 274.106 329 272.515V7C329 3.68629 326.314 1 323 1H19.4853C17.894 1 16.3679 1.63214 15.2426 2.75736Z"
          fill="url(#paint0_linear_5142_14505)"
        />
        <path
          d="M323 0.5C326.59 0.5 329.5 3.41015 329.5 7V272.515C329.5 274.239 328.816 275.892 327.597 277.111L315.111 289.597C313.892 290.816 312.239 291.5 310.515 291.5H7C3.41015 291.5 0.5 288.59 0.5 285V19.4854C0.5 17.7615 1.18436 16.1077 2.40332 14.8887L14.8887 2.40332C16.1077 1.18435 17.7615 0.5 19.4854 0.5H323Z"
          stroke="url(#paint1_linear_5142_14505)"
        />
      </g>
      <defs>
        <filter
          id="filter0_n_5142_14505"
          x="-878.591"
          y="-878.591"
          width="2087.18"
          height="2049.18"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.6666666269302368 1.6666666269302368"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="3594"
          />
          <feColorMatrix
            in="noise"
            type="luminanceToAlpha"
            result="alphaNoise"
          />
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA
              type="discrete"
              tableValues="0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feFlood flood-color="rgba(10, 13, 20, 0.07)" result="color1Flood" />
          <feComposite
            operator="in"
            in2="noise1Clipped"
            in="color1Flood"
            result="color1"
          />
          <feMerge result="effect1_noise_5142_14505">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
        <clipPath
          id="bgblur_0_5142_14505_clip_path"
          transform="translate(878.591 878.591)"
        >
          <path d="M15.2426 2.75736L2.75736 15.2426C1.63214 16.3679 1 17.894 1 19.4853V285C1 288.314 3.6863 291 7 291H310.515C312.106 291 313.632 290.368 314.757 289.243L327.243 276.757C328.368 275.632 329 274.106 329 272.515V7C329 3.68629 326.314 1 323 1H19.4853C17.894 1 16.3679 1.63214 15.2426 2.75736Z" />
        </clipPath>
        <linearGradient
          id="paint0_linear_5142_14505"
          x1="165"
          y1="25.896"
          x2="165"
          y2="291.275"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#11042F" />
          <stop offset="1" stop-color="#020106" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_5142_14505"
          x1="0.999995"
          y1="159.589"
          x2="141.287"
          y2="321.159"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#EE4FFB" stop-opacity="0.2" />
          <stop offset="1" stop-color="#F8DBCE" stop-opacity="0.05" />
        </linearGradient>
      </defs>
    </svg>
  )
}
