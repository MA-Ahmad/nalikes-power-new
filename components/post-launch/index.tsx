import WinSpinner from './win-spinner'
import { PrizeSpinner } from './prize-spinner'

import bitcoinImage from '@/public/images/spin-card-images/bitcoin.png'
import carImage from '@/public/images/spin-card-images/car.png'
import watchImage from '@/public/images/spin-card-images/watch.png'
import bagImage from '@/public/images/spin-card-images/bag.png'
import bikeImage from '@/public/images/spin-card-images/bike.png'
import pouchImage from '@/public/images/spin-card-images/pouch.png'
import braceleteImage from '@/public/images/spin-card-images/bracelete.png'
import jacketImage from '@/public/images/spin-card-images/jacket.png'
import { PrizeCard } from './PrizeCard'

interface Prize {
  id: string
  image: string
  text: string
  amount: string
  off: string
}

const prizes: Prize[] = [
  {
    id: '2',
    image: bitcoinImage.src,
    text: 'Lamborghini Cuntach',
    amount: '1000',
    off: '10%',
  },
  {
    id: '1',
    image: bitcoinImage.src,
    text: 'Lamborghini Cuntach',
    amount: '10,000',
    off: '10%',
  },
  {
    id: '3',
    image: bitcoinImage.src,
    text: 'Lamborghini Cuntach',
    amount: '5000',
    off: '20%',
  },
  {
    id: '4',
    image: bitcoinImage.src,
    text: 'Lamborghini Cuntach',
    amount: '250',
    off: '30%',
  },
  {
    id: '5',
    image: jacketImage.src,
    text: 'Lamborghini Cuntach',
    amount: '500',
    off: '10%',
  },
  {
    id: '6',
    image: jacketImage.src,
    text: 'Lamborghini Cuntach',
    amount: '750',
    off: '10%',
  },
  {
    id: '7',
    image: jacketImage.src,
    text: 'Lamborghini Cuntach',
    amount: '500',
    off: '20%',
  },
  {
    id: '8',
    image: jacketImage.src,
    text: 'Lamborghini Cuntach',
    amount: '2,500',
    off: '10%',
  },
]

export default function PostLaunch() {
  return (
    // <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
    <div className="flex flex-col gap-4">
      <PrizeSpinner />

      <div className="flex flex-col gap-4 justify-center items-center w-full lg:max-w-[850px] mx-auto">
        <div className="flex items-center gap-2 w-full justify-start">
          <h5 className="text-2xl font-bold">Drop Prizes</h5>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <a href="#" className="italic underline text-sm w-full text-right">
            Insane Drops
          </a>
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            {prizes.slice(0, 4).map((prize) => (
              <PrizeCard
                key={prize.id}
                image={prize.image}
                amount={prize.amount}
                text={prize.text}
                off={prize.off}
                className="spin-card-bg-yellow !w-[200px] !h-[240px]"
                scaleImage
                allowAnimation
                // off={prize.off}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <a href="#" className="italic underline text-sm w-full text-right">
            Mad Drops
          </a>
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            {prizes.slice(4, 8).map((prize) => (
              <PrizeCard
                key={prize.id}
                image={prize.image}
                amount={prize.amount}
                text={prize.text}
                off={prize.off}
                className="spin-card-bg-purple !w-[200px] !h-[240px]"
                scaleImage
                allowAnimation
                // off={prize.off}
              />
            ))}
          </div>
        </div>
      </div>

      {/* <WinSpinner /> */}
    </div>
    // </div>
  )
}
