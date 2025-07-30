import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown } from 'lucide-react'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { GameCard } from './single-card'

export function SectionCards() {
  return (
    <div className="grid  md:grid-cols-3 gap-4 my-8">
      <GameCard
        title="ETH Madness"
        subtitle="Ethereum Blockchain"
        amount="$12.5"
        isNew={true}
        isHot={true}
        // badges={[{ text: 'Trending Up', variant: 'outline' }]}
      />
      <GameCard
        title="ETH Madness"
        subtitle="Ethereum Blockchain"
        amount="$12.5"
        isNew={true}
        isHot={true}
        // badges={[{ text: 'Trending Up', variant: 'outline' }]}
      />
      <GameCard
        title="ETH Madness"
        subtitle="Ethereum Blockchain"
        amount="$12.5"
        isHot={true}
        // badges={[{ text: 'Trending Up', variant: 'outline' }]}
      />
      <GameCard
        title="ETH Madness"
        subtitle="Ethereum Blockchain"
        amount="$12.5"
        isNew={true}
        // badges={[{ text: 'Trending Up', variant: 'outline' }]}
      />
    </div>
  )
}
