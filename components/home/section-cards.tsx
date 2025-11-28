import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Gamepad2, ArrowRight } from 'lucide-react'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { GameCard } from './single-card'

import Link from 'next/link'
import { ButtonDarkPurple } from '../game/buttons'
import { useIsMobile } from '@/hooks/use-mobile'

export function SectionCards() {
  const isMobile = useIsMobile()
  return (
    <div className="relative max-w-[1100px] mx-auto mb-10 sm:mb-20">
      <div
        className="absolute -bottom-10 -left-[10rem] h-[15rem] sm:h-[25rem] w-[400px] bg-[#005f5a]/30 rounded-full blur-[8rem]"
        // style={{
        //   rotate: '-30deg',
        // }}
      ></div>

      {!isMobile && <MysteryBoxesSvg />}
      {/* <div className="size-32 bg-pink-light/50 rounded-full absolute -left-10 top-[50%] -translate-y-1/2 blur-3xl "></div> */}
      {/* <div className="z-10 bg-gradient-dark rounded-md p-6 border border-pink-light/10 relative"> */}
      <div className="z-10 p-6 relative mb-12 sm:mb-0">
        <div className="flex items-center justify-center sm:justify-between w-full gap-2">
          <div className="flex items-center gap-2">
            <h5 className="text-2xl font-semibold">Mystery Boxes</h5>
          </div>
          {/* <Link
            href="/mystery-box"
            className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 p-2 px-3 text-xs rounded-md cursor-pointer"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link> */}
          {!isMobile && (
            <ButtonDarkPurple>
              <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
                View all <ArrowRight className="w-4 h-4" />
              </span>
            </ButtonDarkPurple>
          )}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
          <GameCard
            title="The SOl Pot"
            amount="$2.5"
            isNew={true}
            isHot={true}
            image="/images/cards/pwr-box1.svg"
            // badges={[{ text: 'Trending Up', variant: 'outline' }]}
            progress={45}
          />
          <GameCard
            title="Ice-Ice"
            progress={45}
            amount="$12.5"
            image="/images/cards/pwr-box2.svg"
          />
          <GameCard
            title="Doge Treasure"
            progress={100}
            amount="$12.5"
            isHot={true}
            image="/images/cards/pwr-box3.svg"
          />{' '}
          <GameCard
            title="ETH Madness"
            progress={45}
            amount="$2.5"
            isNew={true}
            isHot={true}
            image="/images/cards/pwr-box3.svg"
          />
          <GameCard
            title="Phantom Pack"
            progress={0}
            amount="$2.5"
            image="/images/cards/pwr-box1.svg"
          />
          <GameCard
            title="Lambo Starter Pack"
            progress={0}
            amount="$12.5"
            isNew={true}
            image="/images/cards/pwr-box2.svg"
          />
        </div>
        {isMobile && (
          <div className="flex items-center justify-center">
            <ButtonDarkPurple>
              <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
                View all <ArrowRight className="w-4 h-4" />
              </span>
            </ButtonDarkPurple>
          </div>
        )}
      </div>
    </div>
  )
}

const MysteryBoxesSvg = () => {
  return (
    <svg
      // width="1064"
      // height="724"
      viewBox="0 0 1064 724"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-cover"
      preserveAspectRatio="none" // <— important
    >
      {/* <foreignObject x="-400" y="-400" width="1864" height="1524">
        <div
          // @ts-ignore
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            backdropFilter: 'blur(200px)',
            clipPath: 'url(#bgblur_0_5136_16184_clip_path)',
            height: '100%',
            width: '100%',
          }}
        ></div>
      </foreignObject> */}
      <path
        data-figma-bg-blur-radius="400"
        d="M28.1426 0.5H1054C1059.25 0.5 1063.5 4.7533 1063.5 10V695.857C1063.5 698.377 1062.5 700.794 1060.72 702.575L1042.58 720.718C1040.79 722.499 1038.38 723.5 1035.86 723.5H10C4.7533 723.5 0.5 719.247 0.5 714V28.1426C0.5 25.6231 1.50077 23.2064 3.28223 21.4248L21.4248 3.28223C23.2064 1.50074 25.6231 0.5 28.1426 0.5Z"
        fill="url(#paint0_linear_5136_16184)"
        stroke="url(#paint1_linear_5136_16184)"
      />
      <defs>
        <clipPath
          id="bgblur_0_5136_16184_clip_path"
          transform="translate(400 400)"
        >
          <path d="M28.1426 0.5H1054C1059.25 0.5 1063.5 4.7533 1063.5 10V695.857C1063.5 698.377 1062.5 700.794 1060.72 702.575L1042.58 720.718C1040.79 722.499 1038.38 723.5 1035.86 723.5H10C4.7533 723.5 0.5 719.247 0.5 714V28.1426C0.5 25.6231 1.50077 23.2064 3.28223 21.4248L21.4248 3.28223C23.2064 1.50074 25.6231 0.5 28.1426 0.5Z" />
        </clipPath>
        <linearGradient
          id="paint0_linear_5136_16184"
          x1="532"
          y1="38"
          x2="532"
          y2="724"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#11042F" />
          <stop offset="1" stop-color="#020106" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_5136_16184"
          x1="-4.74389e-05"
          y1="383.594"
          x2="342.752"
          y2="878.967"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#EE4FFB" stop-opacity="0.2" />
          <stop offset="1" stop-color="#F8DBCE" stop-opacity="0.05" />
        </linearGradient>
      </defs>
    </svg>
  )
}
