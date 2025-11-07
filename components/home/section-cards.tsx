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

export function SectionCards() {
  return (
    <div className="relative -top-[9rem] sm:top-0">
      <div className="size-32 bg-pink-light/50 rounded-full absolute -left-10 top-[50%] -translate-y-1/2 blur-3xl "></div>

      <div className="z-10 bg-gradient-dark rounded-md p-6 border border-pink-light/10 relative">
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex items-center gap-2">
            <h5 className="text-2xl font-semibold">Mystery Boxes</h5>
          </div>
          <Link
            href="/mystery-box"
            className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 p-2 px-3 text-xs rounded-md cursor-pointer"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid  md:grid-cols-3 gap-4 my-8">
          <GameCard
            title="The SOl Pot"
            amount="$2.5"
            isNew={true}
            isHot={true}
            image="/images/cards/sol-card.png"
            // badges={[{ text: 'Trending Up', variant: 'outline' }]}
            progress={45}
          />
          <GameCard
            title="Ice-Ice"
            progress={45}
            amount="$12.5"
            image="/images/cards/ice-ice.png"
          />
          <GameCard
            title="Doge Treasure"
            progress={100}
            amount="$12.5"
            isHot={true}
            image="/images/cards/doge.png"
          />{' '}
          <GameCard
            title="ETH Madness"
            progress={45}
            amount="$2.5"
            isNew={true}
            isHot={true}
            image="/images/cards/eth-madness.png"
          />
          <GameCard
            title="Phantom Pack"
            progress={0}
            amount="$2.5"
            image="/images/cards/phantom.png"
          />
          <GameCard
            title="Lambo Starter Pack"
            progress={0}
            amount="$12.5"
            isNew={true}
            image="/images/cards/lambo.png"
          />
        </div>
      </div>
    </div>
  )
}
