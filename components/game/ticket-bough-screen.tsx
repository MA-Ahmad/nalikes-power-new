'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ArrowRight, ArrowUp } from 'lucide-react'
import { FireGlowBox, GlowBox } from '@/components/ui/glow-box'
import { FireIcon } from '@/components/icons'
import { ButtonDarkPurple } from './buttons'

const TicketBoughtScreen = ({
  setScreen,
}: {
  setScreen: (screen: string) => void
}) => {
  return (
    <div className="absolute inset-0 flex flex-col text-white z-10 p-[0.975rem] px-6">
      <div className="mt-16 flex flex-col gap-4 mb-1 overflow-hidden justify-center w-full items-center mb-16">
        <div className="flex flex-col items-center justify-center gap-6">
          <h2 className="text-5xl font-bold text-[#EE4FFB] uppercase">
            Tickets Bought
          </h2>
          <p className="text-3xl font-bold">Thank you!</p>
        </div>
      </div>

      <div className="z-10 p-[0.975rem] px-6 w-full flex flex-col gap-4 justify-center mb-10">
        <div className="flex items-center justify-center gap-2">
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                6
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                4
              </p>
            </div>
          </GlowBox>

          <FireGlowBox size="sm">
            <FireIcon className="size-10 text-[#EE4FFB]" />
          </FireGlowBox>
        </div>
        <div className="flex items-center justify-center gap-2">
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                6
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                4
              </p>
            </div>
          </GlowBox>

          <FireGlowBox size="sm">
            <FireIcon className="size-10 text-[#EE4FFB]" />
          </FireGlowBox>
        </div>
        <div className="flex items-center justify-center gap-2">
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                6
              </p>
            </div>
          </GlowBox>
          <GlowBox size="sm">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                4
              </p>
            </div>
          </GlowBox>

          <FireGlowBox size="sm">
            <FireIcon className="size-10 text-[#EE4FFB]" />
          </FireGlowBox>
        </div>
      </div>

      <div className="z-10 p-[0.975rem] px-6 w-full flex justify-center">
        <ButtonDarkPurple onClick={() => setScreen('tickets')}>
          <div className="flex items-center gap-2">
            <span className="relative text-white font-semibold whitespace-nowrap flex items-center justify-center">
              Continue
            </span>
            <ArrowRight className="w-5 h-5 z-[55] text-white" />
          </div>
        </ButtonDarkPurple>
      </div>
    </div>
  )
}

export default TicketBoughtScreen
