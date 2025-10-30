'use client'

import bitcoinImage from '@/public/images/spin-card-images/bitcoin.png'
import jacketImage from '@/public/images/spin-card-images/jacket.png'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ButtonDarkPurple, ButtonLightPurple } from '../game/buttons'
import { FireGlowBox, GlowBox } from '@/components/ui/glow-box'
import { OutlinedText } from '@/components/ui/outlined-text'
import { FireIcon } from '@/components/icons'

export default function JackpotDtawsBox() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between text-white z-10 p-[0.975rem] px-6">
      <div className="mt-6 flex flex-col gap-6 mx-10">
        <div className="flex items-center w-full justify-center gap-2 z-[55]">
          <div className="flex items-center gap-3">
            <ButtonDarkPurple>
              <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
                Current Draw
              </span>
            </ButtonDarkPurple>

            <ButtonLightPurple>
              <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
                Upcoming Draw
              </span>
            </ButtonLightPurple>
          </div>
        </div>
        <div className="w-full h-[1px] bg-white/10 px-20 z-[55]" />
      </div>

      <div className="z-10 p-[0.975rem] px-10 w-full flex flex-col mt-8 items-center gap-2 justify-between">
        <JackpotGlowBox />

        <TimerBox />
      </div>

      <div className="z-10 p-[0.975rem] px-6 w-full flex flex-col gap-2 justify-center relative">
        <div className="flex items-center justify-center gap-2">
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            1
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            2
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            3
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            4
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            2
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            3
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            4
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            1
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            2
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            3
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            4
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            2
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            3
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            4
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            1
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            2
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            3
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            4
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            2
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            3
          </div>
          <div className="w-16 h-16 text-4xl rounded-lg bg-[#6F6BFF]/20 border border-[#6F6BFF]/30 flex items-center justify-center text-white/10">
            4
          </div>
        </div>
        <div className="absolute flex items-center justify-center gap-2">
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-5xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-5xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-5xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-5xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-5xl font-semibold font-aenoik-bold">
                6
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-5xl font-semibold font-aenoik-bold">
                4
              </p>
            </div>
          </GlowBox>

          <FireGlowBox size="sm">
            <FireIcon className="size-10 text-[#EE4FFB]" />
          </FireGlowBox>
        </div>
      </div>

      <div className="flex flex-col gap-6 mb-6 mx-10">
        <div className="w-full h-[1px] bg-white/10 px-20" />
        <div className="flex items-center w-full justify-between gap-2">
          <span className="text-sm font-aeonik-bold text-neutral-400">
            VERIFY FAIRNESS
          </span>

          <span className="text-sm font-aeonik-bold text-neutral-400">
            POWERED BY
          </span>
        </div>
      </div>
    </div>
  )
}

interface JackpotGlowBoxProps {
  amount?: string
  currency?: string
  label?: string
  children?: React.ReactNode
  className?: string
}

export function JackpotGlowBox({
  amount = '1,000',
  currency = 'BTC',
  label = 'MEGA JACKPOT',
  children,
  className = '',
}: JackpotGlowBoxProps) {
  return (
    <div className={`relative w-full w-full ${className}`}>
      {/* Label badge */}
      {label && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
          <div
            className="px-6 py-2 rounded-lg bg-[#300333] border border-[#EE4FFB] text-center"
            style={{
              boxShadow: `
                0 0 10px rgba(238, 79, 251, 0.5),
                inset 0 0 10px rgba(238, 79, 251, 0.2)
              `,
            }}
          >
            <p className="text-[#EE4FFB] font-bold text-sm tracking-wider">
              {label}
            </p>
          </div>
        </div>
      )}

      {/* Main container */}
      <div
        className="rounded-2xl bg-[#3D3D1F] border-2 border-[#FDC61C] p-4 pt-8 text-center"
        style={{
          boxShadow: `
            0 0 20px rgba(253, 198, 28, 0.6),
            0 0 40px rgba(253, 198, 28, 0.3),
            inset 0 1px 0 rgba(253, 198, 28, 0.2)
          `,
        }}
      >
        {children ? (
          children
        ) : (
          <div className="flex flex-col gap-6">
            <OutlinedText text="1,000 BTC" size="lg" outlineColor="#fff085" />
          </div>
        )}
      </div>
    </div>
  )
}

export const TimerBox = () => {
  return (
    <div className="flex items-center justify-center gap-2 mt-5">
      <div className="flex flex-col gap-2">
        <p className="text-xl text-center text-neutral-400 leading-none">
          Next Draw: <span className="text-white">Block 234234</span>
        </p>
        <p className="text-xl text-center text-neutral-400 leading-none">
          #Ticket sold: <span className="text-white">43234</span>
        </p>
      </div>

      <div className="flex space-x-2 md:space-x-0">
        <div
          className="flex flex-col items-center gap-1 justify-center p-1.5 px-2 lg:p-2 lg:px-2.5 bg-[#EE4FFB]/30 rounded-lg border-2 border-[#EE4FFB] bg-countdown-blue text-white font-mono text-base md:text-xl"
          style={{
            boxShadow: `
              0 0 10px rgba(238, 79, 251, 0.5),
              inset 0 0 10px rgba(238, 79, 251, 0.2)
            `,
          }}
        >
          <span className="text-xl lg:text-3xl font-bold leading-none">02</span>
          <span className="text-xs lg:text-sm leading-none uppercase font-bold text-[#D19AD6]">
            days
          </span>
        </div>
        <div className="flex flex-col items-center justify-center mx-2 gap-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
        <div
          className="flex flex-col items-center gap-1 justify-center p-1.5 px-2 lg:p-2 lg:px-2.5 bg-[#EE4FFB]/30 rounded-lg border-2 border-[#EE4FFB] bg-countdown-blue text-white font-mono text-base md:text-xl"
          style={{
            boxShadow: `
              0 0 10px rgba(238, 79, 251, 0.5),
              inset 0 0 10px rgba(238, 79, 251, 0.2)
            `,
          }}
        >
          <span className="text-xl lg:text-3xl font-bold leading-none">18</span>
          <span className="text-xs lg:text-sm leading-none uppercase font-bold text-[#D19AD6]">
            hours
          </span>
        </div>
        <div className="flex flex-col items-center justify-center mx-2 gap-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
        <div
          className="flex flex-col items-center gap-1 justify-center p-1.5 px-2 lg:p-2 lg:px-2.5 bg-[#EE4FFB]/30 rounded-lg border-2 border-[#EE4FFB] bg-countdown-blue text-white font-mono text-base md:text-xl"
          style={{
            boxShadow: `
              0 0 10px rgba(238, 79, 251, 0.5),
              inset 0 0 10px rgba(238, 79, 251, 0.2)
            `,
          }}
        >
          <span className="text-xl lg:text-3xl font-bold leading-none">34</span>
          <span className="text-xs lg:text-sm leading-none uppercase font-bold text-[#D19AD6]">
            min
          </span>
        </div>
      </div>
    </div>
  )
}
