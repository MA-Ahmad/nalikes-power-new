'use client'

import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import CountUp from 'react-countup'
import { useEffect, useState } from 'react'

interface PrizeCardProps {
  title: string
  image: string
  amount: string
  text?: string
  off?: string
  className?: string
  isSelected?: boolean
  scaleImage?: boolean
  allowAnimation?: boolean
  initialState?: boolean
}

const PrizeCard = ({
  title,
  image,
  amount,
  text,
  off,
  initialState,
  className,
  isSelected,
  scaleImage,
  allowAnimation,
}: PrizeCardProps) => {
  return (
    <motion.div
      className={cn(
        'relative inline-block max-w-[200px] w-[200px] prize-card z-20',
        className,
        allowAnimation && 'hover:-translate-y-1.5 transition-all duration-300'
      )}
      animate={
        isSelected
          ? {
              scale: [1, 1.15, 0.95, 1.1, 0.97, 1],
            }
          : {
              scale: 1, // smoothly return to normal
            }
      }
      transition={
        isSelected
          ? {
              duration: 1.8,
              times: [0, 0.25, 0.45, 0.65, 0.85, 1],
              ease: 'easeInOut',
            }
          : {
              duration: 0.4, // smoother shrink back
              ease: 'easeOut',
            }
      }
    >
      <svg
        width="200"
        height="220"
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <foreignObject x="-40" y="-40" width="280" height="300">
          <div
            // @ts-ignore
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              backdropFilter: 'blur(20px)',
              clipPath: 'url(#bgblur_0_5013_1906_clip_path)',
              height: '100%',
              width: '100%',
            }}
          ></div>
        </foreignObject>
        <g data-figma-bg-blur-radius="40">
          <path
            d="M14.2426 1.75736L1.75736 14.2426C0.632141 15.3679 0 16.894 0 18.4853V214C0 217.314 2.68629 220 6 220H181.515C183.106 220 184.632 219.368 185.757 218.243L198.243 205.757C199.368 204.632 200 203.106 200 201.515V6C200 2.68629 197.314 0 194 0H18.4853C16.894 0 15.3679 0.632139 14.2426 1.75736Z"
            fill="url(#paint0_linear_5013_1906)"
          />
          <path
            d="M18.4854 0.5H194C197.038 0.5 199.5 2.96243 199.5 6V201.515C199.5 202.973 198.92 204.372 197.889 205.403L185.403 217.889C184.372 218.92 182.973 219.5 181.515 219.5H6C2.96243 219.5 0.5 217.038 0.5 214V18.4854L0.506836 18.2129C0.574195 16.8534 1.14428 15.5637 2.11133 14.5967L14.5967 2.11133C15.6281 1.0799 17.0267 0.5 18.4854 0.5Z"
            stroke="white"
            stroke-opacity="0.1"
          />
        </g>
        <defs>
          <clipPath
            id="bgblur_0_5013_1906_clip_path"
            transform="translate(40 40)"
          >
            <path d="M14.2426 1.75736L1.75736 14.2426C0.632141 15.3679 0 16.894 0 18.4853V214C0 217.314 2.68629 220 6 220H181.515C183.106 220 184.632 219.368 185.757 218.243L198.243 205.757C199.368 204.632 200 203.106 200 201.515V6C200 2.68629 197.314 0 194 0H18.4853C16.894 0 15.3679 0.632139 14.2426 1.75736Z" />
          </clipPath>
          <linearGradient
            id="paint0_linear_5013_1906"
            x1="99.7899"
            y1="-1.09756e-06"
            x2="99.7899"
            y2="220"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#030109" stop-opacity="0.2" />
            <stop offset="1" stop-color="#030109" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute top-0 w-full px-4 py-2 flex flex-col justify-between h-full">
        <div className="flex items-center gap-1 justify-end">
          <p className="text-sm font-semibold text-gray-400">x33</p>
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.61921 3.7002C3.94594 3.7002 3.40015 4.24599 3.40015 4.91925V12.0807C3.40015 12.754 3.94594 13.2998 4.61921 13.2998H5.16253C5.8358 13.2998 6.38159 12.754 6.38159 12.0807V11.1009C6.38159 10.4276 6.92738 9.88184 7.60065 9.88184H8.58148C9.25475 9.88184 9.80054 9.33604 9.80054 8.66278V4.91925C9.80054 4.24599 9.25475 3.7002 8.58148 3.7002H4.61921ZM12.9998 8.88055C12.9998 9.55382 12.454 10.0996 11.7807 10.0996H11.2374C10.5641 10.0996 10.0183 10.6454 10.0183 11.3187V12.2995C10.0183 12.9728 9.47252 13.5186 8.79925 13.5186H7.8194C7.14613 13.5186 6.60034 14.0643 6.60034 14.7376V15.2809C6.60034 15.9542 6.05455 16.5 5.38128 16.5H4.61921C3.94594 16.5 3.40015 15.9542 3.40015 15.2809V14.6644C3.40015 13.9911 2.85436 13.4453 2.18109 13.4453H1.41901C0.745743 13.4453 0.199951 12.8995 0.199951 12.2263V4.91925C0.199951 4.24599 0.745743 3.7002 1.41901 3.7002H2.10785C2.78111 3.7002 3.3269 3.1544 3.3269 2.48114V1.71906C3.3269 1.04579 3.8727 0.5 4.54596 0.5H8.65374C9.32701 0.5 9.8728 1.04579 9.8728 1.71906V2.48114C9.8728 3.1544 10.4186 3.7002 11.0919 3.7002H11.7807C12.454 3.7002 12.9998 4.24599 12.9998 4.91925V8.88055Z"
              fill="#9aa2ae"
            />
          </svg>
        </div>

        <div className="w-24 h-24 flex items-center justify-center w-full mt-2">
          <img
            // src="/images/spin-card-images/bitcoin.png"
            src={image}
            alt="Prize"
            className={cn('w-full h-full object-contain filter drop-shadow-lg')}
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-gray-400">{title}</p>
          <div className="flex items-center gap-2">
            {/* <p>${amount}</p> */}
            $<AmountCounter isSelected={isSelected} amount={Number(amount)} />
            <div
              className="border border-green-base rounded-md flex items-center text-sm justify-center p-1 py-0.5 leading-none text-green-base"
              style={{
                background: 'rgba(156, 243, 80, 0.3)',
              }}
            >
              -{off || 0}%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function AmountCounter({
  isSelected,
  amount,
}: {
  isSelected?: boolean
  amount: number
}) {
  const [showCount, setShowCount] = useState(false)

  useEffect(() => {
    if (isSelected) {
      setShowCount(true)

      // hide again after 2s (so it can reset next time)
      const timer = setTimeout(() => {
        setShowCount(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isSelected])

  return (
    <>
      {showCount ? (
        <CountUp key={amount + Date.now()} end={Number(amount)} duration={1} />
      ) : (
        amount
      )}
    </>
  )
}

export default PrizeCard
