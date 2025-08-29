'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Shield, Info } from 'lucide-react'

interface SpinnerCard {
  id: number
  image: string
  text: string
  value: string
}

const cards: SpinnerCard[] = [
  {
    id: 1,
    image: '/images/supa-dwag.png',
    text: 'Up to 1K',
    value: 'BONUS',
  },
  {
    id: 2,
    image: '/images/supa-dwag.png',
    text: 'Up to 1K',
    value: 'BONUS',
  },
  {
    id: 3,
    image: '/images/supa-dwag.png',
    text: 'Up to 1K',
    value: 'BONUS',
  },
  {
    id: 4,
    image: '/images/supa-dwag.png',
    text: '$195.03',
    value: 'CASH',
  },
  {
    id: 5,
    image: '/images/supa-dwag.png',
    text: '$3,458.00',
    value: 'JACKPOT',
  },
  {
    id: 6,
    image: '/images/supa-dwag.png',
    text: '$3,458.00',
    value: 'JACKPOT',
  },
  {
    id: 7,
    image: '/images/supa-dwag.png',
    text: '$3,458.00',
    value: 'JACKPOT',
  },
  {
    id: 8,
    image: '/images/supa-dwag.png',
    text: 'Up to 1K',
    value: 'BONUS',
  },
  {
    id: 9,
    image: '/images/supa-dwag.png',
    text: '$195.03',
    value: 'CASH',
  },
  {
    id: 10,
    image: '/images/supa-dwag.png',
    text: '$3,458.00',
    value: 'JACKPOT',
  },
]

export default function WinSpinner() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedCard, setSelectedCard] = useState<SpinnerCard | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const spinnerRef = useRef<HTMLDivElement>(null)
  const [displayCards, setDisplayCards] = useState<SpinnerCard[]>([])
  const [containerWidth, setContainerWidth] = useState(0)
  const [gameMode, setGameMode] = useState<'manual' | 'auto'>('manual')

  useEffect(() => {
    const extendedCards = [...cards, ...cards, ...cards]
    setDisplayCards(extendedCards)

    const updateContainerWidth = () => {
      if (spinnerRef.current) {
        setContainerWidth(spinnerRef.current.offsetWidth)
      }
    }

    updateContainerWidth()
    window.addEventListener('resize', updateContainerWidth)

    return () => window.removeEventListener('resize', updateContainerWidth)
  }, [])

  const getCenterPosition = () => {
    if (containerWidth === 0) return containerWidth / 2

    const cardWidth = 176 // w-44 = 176px
    const gap = 16 // gap-4 = 16px
    const totalCardWidth = cardWidth + gap

    // Calculate how many complete cards fit in the container
    const visibleCards = Math.floor(containerWidth / totalCardWidth)

    // Find the center card position
    const centerCardIndex = Math.floor(visibleCards / 2)

    // Calculate the left position of the center card
    const centerCardLeft = centerCardIndex * totalCardWidth

    // Return the center point of the center card
    return centerCardLeft + cardWidth / 2
  }

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setSelectedCard(null)

    const container = containerRef.current
    if (!container) return

    const cardWidth = 176 // w-44 = 176px
    const gap = 16 // gap-4 = 16px
    const totalCardWidth = cardWidth + gap

    const centerPos = getCenterPosition()
    const initialOffset = centerPos - cardWidth / 2

    container.style.transform = `translateX(-${initialOffset}px)`
    container.style.transition = 'none'

    setTimeout(() => {
      const totalDistance =
        initialOffset +
        totalCardWidth *
          (cards.length + Math.floor(Math.random() * cards.length))

      container.style.transition =
        'transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      container.style.transform = `translateX(-${totalDistance}px)`

      setTimeout(() => {
        setIsSpinning(false)
        const finalOffset = totalDistance - initialOffset
        const selectedIndex =
          Math.floor(finalOffset / totalCardWidth) % cards.length
        setSelectedCard(cards[selectedIndex])
      }, 4000)
    }, 50)
  }

  const selectionLeft = getCenterPosition()

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="h-2 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80 blur-sm mb-4"></div>

      <div
        className="relative overflow-hidden bg-slate-800/50 rounded-lg p-4"
        ref={spinnerRef}
      >
        <div
          className="absolute top-0 transform -translate-x-1/2 -translate-y-1 z-20"
          style={{ left: `${selectionLeft}px` }}
        >
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-slate-300"></div>
        </div>

        <div
          className="absolute bottom-0 transform -translate-x-1/2 translate-y-1 z-20"
          style={{ left: `${selectionLeft}px` }}
        >
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-slate-300"></div>
        </div>

        <div
          className="absolute inset-y-0 transform -translate-x-1/2 w-48 bg-slate-900/60 border-2 border-slate-600 rounded-lg z-10"
          style={{ left: `${selectionLeft}px` }}
        ></div>

        <div className="flex gap-4 py-4" ref={containerRef}>
          {displayCards.map((card, index) => (
            <Card
              key={`${card.id}-${index}`}
              className="flex-shrink-0 w-44 h-56 bg-slate-700 border-slate-600 flex flex-col items-center justify-between p-4"
            >
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={card.image || '/placeholder.svg'}
                  alt={card.text}
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div className="text-center">
                <div className="text-white font-semibold text-lg">
                  {card.text}
                </div>
                <div className="text-slate-400 text-sm">{card.value}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="h-2 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80 blur-sm mt-4"></div>

      <div className="mt-8 bg-slate-800/80 rounded-lg p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
          >
            <Shield className="w-4 h-4" />
            <div className="text-left">
              <div className="text-xs text-slate-400">This game is</div>
              <div className="text-sm font-medium">Provably Fair</div>
            </div>
          </Button>

          <Button
            onClick={handleSpin}
            disabled={isSpinning}
            className="flex-1 max-w-xs bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-bold rounded-lg disabled:opacity-50"
          >
            <div className="text-center">
              <div>{isSpinning ? 'SPINNING...' : 'SPIN'}</div>
              <div className="text-sm font-normal">$2,232.32</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 px-6 py-4"
          >
            Demo
          </Button>
        </div>

        <div className="flex items-center justify-center gap-8">
          <Button
            variant="ghost"
            onClick={() => setGameMode('manual')}
            className={`text-lg font-medium ${
              gameMode === 'manual'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Manual
          </Button>
          <Button
            variant="ghost"
            onClick={() => setGameMode('auto')}
            className={`flex items-center gap-2 text-lg font-medium ${
              gameMode === 'auto'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Auto
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {selectedCard && !isSpinning && (
        <div className="text-center mt-6 p-4 bg-slate-800 rounded-lg">
          <h3 className="text-white text-xl font-bold mb-2">🎉 You Won!</h3>
          <p className="text-blue-400 text-lg">{selectedCard.text}</p>
          <p className="text-slate-400">{selectedCard.value}</p>
        </div>
      )}
    </div>
  )
}
