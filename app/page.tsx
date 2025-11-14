'use client'

import Navbar from '@/components/home/navbar'
import Image from 'next/image'
import banner from '@/public/images/banner.png'
import { SectionCards } from '@/components/home/section-cards'
import { useState } from 'react'
import { ChatSidebar } from '@/components/home/chat/chat-sidebar'
import newBanner from '@/public/images/new-banner.png'
import Banner from '@/components/home/banner'
import InfoCards from '@/components/home/info-cards'
import { useRouter } from 'next/navigation'
import { x1Testnet } from 'viem/chains'
import { useIsMobile } from '@/hooks/use-mobile'
import { motion } from 'framer-motion'
import { useMiniGames, useEnterGame } from '@/hooks/use-mini-games'
import { Game } from '@/lib/api/mini-game'
import { ArrowLeft } from 'lucide-react'

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [gameUrl, setGameUrl] = useState<string | null>(null)
  const router = useRouter()
  const isMobile = useIsMobile()

  const enterGameMutation = useEnterGame({
    onSuccess: (url) => {
      setGameUrl(url)
    },
    onError: (error) => {
      console.error('Failed to enter game:', error)
    },
  })

  const handleGameClick = (game: Game) => {
    enterGameMutation.mutate({
      gameid: game.gameid,
      currency: 'usd',
      screen_mode: 1,
    })
  }

  const handleCloseGame = () => {
    setGameUrl(null)
  }

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }
  return (
    <div className="min-h-screen bg-black relative">
      <Navbar />
      {!gameUrl && (
        <div className="relative sm:pt-10">
          <Image
            src={'/images/home/hero.png'}
            alt="Banner"
            width={1920}
            height={600}
            className="w-full h-full object-cover hidden sm:block"
          />

          <Image
            src={'/images/home/mobile-hero.svg'}
            alt="Banner"
            width={1920}
            height={600}
            className="w-full h-full object-cover block sm:hidden"
          />
          {/* <div className="absolute top-16 sm:top-20 lg:top-[15%] left-1/2 -translate-x-1/2  flex items-center justify-center flex-col text-center gap-2">
          <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold ">
            Enter The PWR City
          </h1>
          <p className="md:text-xl">Gamble Like a Degen. Win Like a Degen</p>
        </div> */}

          <div className="absolute w-full top-32 sm:top-20 lg:top-[15%] left-1/2 -translate-x-1/2 flex items-center justify-center flex-col text-center gap-2">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold">
              <TypingText text="Enter The PWR City" delay={0.2} />
            </h1>
            <p className="md:text-xl">
              <TypingText
                text="Gamble Like a Degen. Win Like a Degen"
                delay={1.5}
              />
            </p>
          </div>
        </div>
      )}
      <div className="flex">
        <main
          className={`flex-1 px-4 py-4 bg-[#040315] sm:bg-transparent transition-all duration-300 ease-in-out ${
            isChatOpen ? 'lg:mr-80' : 'lg:mr-0'
          }
          `}
        >
          {gameUrl ? (
            <div className="mt-8">
              <GameIframe url={gameUrl} onClose={handleCloseGame} />
            </div>
          ) : (
            <div className="max-w-[1500px] mx-auto space-y-8 sm:space-y-20">
              <div className="pb-[3rem] sm:pb-[2rem] relative">
                <h1 className="text-lg sm:text-2xl font-bold text-center mb-8">
                  PWR Originals
                </h1>
                {isMobile ? (
                  <GameCardsMobile onGameClick={handleGameClick} />
                ) : (
                  <GameCardsDesktop onGameClick={handleGameClick} />
                )}
              </div>

              {/* Iframe here */}
              <div className="">
                <Banner />
              </div>
              <SectionCards />
            </div>
          )}
        </main>

        {/* Chat Sidebar - Part of layout on desktop, overlay on mobile */}
        <ChatSidebar isOpen={isChatOpen} onToggle={toggleChat} />
      </div>
      {/* <div className="flex items-center justify-center mt-52 pb-20">
        <div className="h-32 w-[400px] bg-brand-pink/30 rounded-full  blur-3xl "></div>
      </div> */}
    </div>
  )
}

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const words = text.split('')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {words.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + i * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}

function GameCardsDesktop({
  onGameClick,
}: {
  onGameClick: (game: Game) => void
}) {
  const [hovered, setHovered] = useState<number | null>(null)
  const { data: games = [], isLoading } = useMiniGames()
  const offsets = [
    { left: '45px', top: '65px', rotate: '-10deg', z: 8 },
    { left: '19px', top: '30px', rotate: '-6deg', z: 9 },
    { left: '-5px', top: '10px', rotate: '-2deg', z: 10 },
    { left: '-29px', top: '10px', rotate: '2deg', z: 10 },
    { left: '-54px', top: '30px', rotate: '6deg', z: 10 },
    { left: '-82px', top: '65px', rotate: '10deg', z: 10 },
  ]

  if (isLoading) {
    return (
      <div className="flex justify-center gap-4 py-10">
        <div className="text-white">Loading games...</div>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-center gap-4 py-10">
        {games.map((game, index) => {
          const { left, top, rotate, z } = offsets[index] || {}
          const isHovered = hovered === index

          return (
            <div
              key={game.gameid}
              onClick={() => onGameClick(game)}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className={`relative transition-all duration-300 ease-out cursor-pointer ${
                isHovered ? 'brightness-110 -translate-y-4' : ''
              }`}
              style={{
                left,
                top,
                transform: `rotate(${rotate})`,
                zIndex: isHovered ? 50 : z, // Bring to front on hover
              }}
            >
              <Image
                src={`/images/games/${game.slug}.svg`}
                alt={`Game ${game.name}`}
                width={200}
                height={260}
                className="rounded-xl object-cover shadow-lg select-none"
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

const GameCardsMobile = ({
  onGameClick,
}: {
  onGameClick: (game: Game) => void
}) => {
  const { data: games = [], isLoading } = useMiniGames()

  // Split games into two rows
  const firstRow = games.slice(0, 3)
  const secondRow = games.slice(3, 6)

  const getCardStyle = (position: number) => {
    // 0 = left, 1 = center, 2 = right
    const styles = [
      { transform: 'rotate(-6deg)', zIndex: 9, top: '15px', left: '30px' },
      { transform: 'rotate(0deg)', zIndex: 10, top: '0px', left: '10px' },
      { transform: 'rotate(6deg)', zIndex: 9, top: '15px', left: '-13px' },
    ]
    return styles[position]
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-white">Loading games...</div>
      </div>
    )
  }

  const renderRow = (items: typeof games) => (
    <div className="flex justify-center items-end gap-4 mt-6 relative">
      {items.map((game, i) => {
        const style = getCardStyle(i)
        return (
          <div
            key={game.gameid}
            onClick={() => onGameClick(game)}
            className="relative transition-all duration-300 hover:-translate-y-2 hover:z-50 cursor-pointer"
            style={{
              ...style,
            }}
          >
            <Image
              src={`/images/games/${game.slug}.svg`}
              alt={`Game ${game.name}`}
              width={150}
              height={200}
              className="object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="flex flex-col items-center">
      {renderRow(firstRow)}
      {renderRow(secondRow)}
    </div>
  )
}

// Game iframe component
function GameIframe({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg">
      {/* Close button */}
      <div className="flex justify-end w-full p-4">
        {/* <div
          className="text-white hover:-translate-x-1 transition-all duration-300 ease-in-out cursor-pointer z-[5] flex items-center gap-2"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="w-4 h-4" /> <span>Back</span>
        </div> */}
        <button
          onClick={onClose}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <span>✕</span>
          <span>Close</span>
        </button>
      </div>
      {/* Game iframe */}
      <div
        className="w-full"
        style={{ aspectRatio: '16/9', minHeight: '600px' }}
      >
        <iframe
          src={url}
          className="w-full h-full border-0"
          allow="fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  )
}
