'use client'

import Navbar from '@/components/home/navbar'
import Image from 'next/image'
import banner from '@/public/images/banner.png'
import { SectionCards } from '@/components/home/section-cards'
import { useState, useEffect, useRef } from 'react'
import { ChatSidebar } from '@/components/home/chat/chat-sidebar'
import newBanner from '@/public/images/new-banner.png'
import Banner from '@/components/home/banner'
import InfoCards from '@/components/home/info-cards'
import { useRouter, useSearchParams } from 'next/navigation'
import { x1Testnet } from 'viem/chains'
import { useIsMobile } from '@/hooks/use-mobile'
import { motion, useInView } from 'framer-motion'
import { useMiniGames, useEnterGame } from '@/hooks/use-mini-games'
import { Game } from '@/lib/api/mini-game'
import { ArrowLeft, RefreshCcw } from 'lucide-react'
import { useAuthStore } from '@/store/auth'
import { toast } from 'react-hot-toast'
import { ResetPasswordDialog } from '@/components/home/reset-password-dialog'
// import { HeroCarousel } from '@/components/home/hero-carousel'

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [gameUrl, setGameUrl] = useState<string | null>(null)
  const [isRefetchingBalance, setIsRefetchingBalance] = useState(false)
  const [resetPasswordToken, setResetPasswordToken] = useState<string | null>(
    null
  )
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useIsMobile()
  const { syncWalletStatus } = useAuthStore()

  // Check for reset password token in query params
  useEffect(() => {
    const token = searchParams?.get('token')
    if (token) {
      setResetPasswordToken(token)
      setShowResetPasswordDialog(true)
    }
  }, [searchParams])

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

  const handleRefetchBalance = async () => {
    setIsRefetchingBalance(true)
    try {
      await syncWalletStatus()
      // toast.success('Balance updated successfully')
    } catch (error) {
      toast.error('Failed to refetch balance')
      console.error('Failed to refetch balance:', error)
    } finally {
      setIsRefetchingBalance(false)
    }
  }

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  const handleResetPasswordDialogClose = (open: boolean) => {
    setShowResetPasswordDialog(open)
    if (!open && resetPasswordToken) {
      // Remove token from URL when dialog closes
      const url = new URL(window.location.href)
      url.searchParams.delete('token')
      router.replace(url.pathname + url.search, { scroll: false })
      setResetPasswordToken(null)
    }
  }

  const handleResetPasswordSuccess = () => {
    // Remove token from URL after successful reset
    const url = new URL(window.location.href)
    url.searchParams.delete('token')
    router.replace(url.pathname + url.search, { scroll: false })
    setResetPasswordToken(null)
  }

  return (
    <div className="min-h-screen bg-black relative">
      <ResetPasswordDialog
        open={showResetPasswordDialog}
        onOpenChange={handleResetPasswordDialogClose}
        token={resetPasswordToken || ''}
        onSuccess={handleResetPasswordSuccess}
      />
      <Navbar />
      {!gameUrl && (
        <div className="relative w-full">
          {/* Carousel with text overlay */}
          {/* <div className="relative w-full">
            <HeroCarousel /> */}
          {/* Hero Image Section with text overlay */}
          <div className="relative w-full overflow-hidden">
            {/* Hero Image */}
            <div className="relative w-full h-[500px] sm:h-[500px] lg:h-[800px]">
              <Image
                src="/images/hero-image.svg"
                alt="Hero"
                width={1920}
                height={1080}
                quality={95}
                sizes="100vw"
                className="w-full h-[500px] sm:h-[500px] lg:h-[800px] object-cover mt-[5rem] sm:mt-0"
                priority
              />
              {/* Gradient fade at bottom to merge with next section */}
              <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 lg:h-48 bg-gradient-to-b from-transparent via-black/30 to-black pointer-events-none" />
            </div>
            {/* Text Overlay */}
            <div className="absolute w-full top-24 sm:top-20 lg:top-[15%] left-1/2 -translate-x-1/2 flex items-center justify-center flex-col text-center gap-2 z-10">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white">
                <TypingText text="Enter The PWR City" delay={0.2} />
              </h1>
              <p className="text-sm sm:text-xl lg:text-xl text-white hidden sm:block">
                <TypingText
                  text="Gamble Like a Degen. Win Like a Degen"
                  delay={1.5}
                />
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex">
        <main
          className={`flex-1 px-4 lg:px-16 xl:px-4 py-6 sm:py-4 bg-[#040315] sm:bg-transparent transition-all duration-300 ease-in-out ${
            isChatOpen ? 'lg:mr-80' : 'lg:mr-0'
          }
          `}
        >
          {gameUrl ? (
            <div className="mt-8">
              <GameIframe
                url={gameUrl}
                onClose={handleCloseGame}
                onRefetchBalance={handleRefetchBalance}
                isRefetching={isRefetchingBalance}
              />
            </div>
          ) : (
            <div className="max-w-[1100px] mx-auto space-y-8 sm:space-y-20">
              <div className="pb-[3rem] sm:pb-[2rem] relative -mt-[9rem] sm:-mt-20 lg:-mt-[7.5rem]">
                <h1 className="text-lg sm:text-2xl font-bold text-center mb-4 sm:mb-8">
                  PWR Originals
                </h1>
                {isMobile ? (
                  <GameCardsMobile onGameClick={handleGameClick} />
                ) : (
                  <GameCardsDesktop onGameClick={handleGameClick} />
                )}
              </div>

              <div className="max-w-[1100px] mx-auto relative">
                <div className="absolute top-10 -left-[5rem] h-[15rem] sm:h-[20rem] w-[400px] bg-brand-pink/30 rounded-full blur-3xl"></div>
                <div
                  className="absolute -bottom-20 -right-[5rem] h-[15rem] sm:h-[25rem] w-[400px] bg-[#005f5a]/30 rounded-full blur-[8rem]"
                  // style={{
                  //   rotate: '-30deg',
                  // }}
                ></div>
                <Banner />
                <InfoCards />
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

// Game display order: crash, dice, mines, roulette, plinko, blackjack
const GAME_ORDER = ['crash', 'dice', 'mines', 'roulette', 'plinko', 'blackjack']

function sortGamesByOrder(games: Game[]): Game[] {
  return [...games].sort((a, b) => {
    const indexA = GAME_ORDER.indexOf(a.slug)
    const indexB = GAME_ORDER.indexOf(b.slug)
    // If game not in order list, put it at the end
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })
}

function GameCardsDesktop({
  onGameClick,
}: {
  onGameClick: (game: Game) => void
}) {
  const [hovered, setHovered] = useState<number | null>(null)
  const { data: games = [], isLoading } = useMiniGames()
  const sortedGames = sortGamesByOrder(games)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInViewOnce = useInView(containerRef, { once: true, amount: 0.6 })

  const offsets = [
    { left: '10px', top: '55px', rotate: '-10deg', z: 8 },
    { left: '3px', top: '25px', rotate: '-6deg', z: 9 },
    { left: '-5px', top: '10px', rotate: '-2deg', z: 10 },
    { left: '-10px', top: '10px', rotate: '2deg', z: 10 },
    { left: '-16px', top: '25px', rotate: '6deg', z: 10 },
    { left: '-25px', top: '50px', rotate: '10deg', z: 10 },
  ]

  // const offsets = [
  //   { left: '45px', top: '65px', rotate: '-10deg', z: 8 },
  //   { left: '19px', top: '30px', rotate: '-6deg', z: 9 },
  //   { left: '-5px', top: '10px', rotate: '-2deg', z: 10 },
  //   { left: '-29px', top: '10px', rotate: '2deg', z: 10 },
  //   { left: '-54px', top: '30px', rotate: '6deg', z: 10 },
  //   { left: '-82px', top: '65px', rotate: '10deg', z: 10 },
  // ]

  if (isLoading) {
    return (
      <div className="flex justify-center gap-4 py-10">
        <div className="text-white">Loading games...</div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="flex justify-center gap-4 py-10 pt-0">
      {sortedGames.map((game, index) => {
        const { left, top, rotate, z } = offsets[index] || {}
        const isHovered = hovered === index
        // Parse rotation value for framer-motion
        const rotateValue = parseFloat(rotate.replace('deg', ''))

        return (
          <motion.div
            key={game.gameid}
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 40,
              rotate: rotateValue,
            }}
            animate={{
              // opacity: isInViewOnce ? 1 : 0,
              // scale: isInViewOnce ? 1 : 0.8,
              // y: isInViewOnce ? 0 : 40,
              // rotate: isInViewOnce ? rotateValue : rotateValue,
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: rotateValue,
              transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                mass: 0.8,
                delay: index * 0.15,
              },
            }}
            whileHover={{
              y: -16,
              scale: 1.05,
              rotate: rotateValue,
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
            onClick={() => onGameClick(game)}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className="relative cursor-pointer"
            style={{
              left,
              top,
              zIndex: isHovered ? 50 : z,
            }}
          >
            <motion.div
              animate={isHovered ? { filter: 'brightness(1.15)' } : {}}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={`/images/games/${game.slug}.svg`}
                alt={`Game ${game.name}`}
                width={200}
                height={260}
                quality={90}
                className="rounded-xl object-cover shadow-lg select-none"
                priority={index < 3}
              />
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

const GameCardsMobile = ({
  onGameClick,
}: {
  onGameClick: (game: Game) => void
}) => {
  const { data: games = [], isLoading } = useMiniGames()
  const sortedGames = sortGamesByOrder(games)

  // Split games into two rows
  const firstRow = sortedGames.slice(0, 3)
  const secondRow = sortedGames.slice(3, 6)

  const getCardStyle = (position: number) => {
    // 0 = left, 1 = center, 2 = right
    const styles = [
      {
        transform: 'rotate(-6deg) translateY(15px)',
        left: '1.3rem',
        zIndex: 9,
      },
      {
        transform: 'rotate(0deg)',
        zIndex: 10,
      },
      {
        transform: 'rotate(6deg) translateY(15px)',
        left: '-1.3rem',
        zIndex: 9,
      },
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
    <div className="flex justify-center items-end gap-2 sm:gap-4 mt-6 first:mt-0 w-full">
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
function GameIframe({
  url,
  onClose,
  onRefetchBalance,
  isRefetching,
}: {
  url: string
  onClose: () => void
  onRefetchBalance: () => void
  isRefetching: boolean
}) {
  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg">
      {/* Close button */}
      <div className="flex justify-end gap-2 w-full p-4">
        <button
          onClick={onRefetchBalance}
          disabled={isRefetching}
          className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <RefreshCcw
            className={`w-4 h-4 ${isRefetching ? 'animate-spin' : ''}`}
          />
          <span>{isRefetching ? 'Refetching...' : 'Refetch Balance'}</span>
        </button>
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
