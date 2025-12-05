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
import { useMiniGames } from '@/hooks/use-mini-games'
import { Game } from '@/lib/api/mini-game'
import { ResetPasswordDialog } from '@/components/home/reset-password-dialog'
import { cn } from '@/lib/utils'
// import { HeroCarousel } from '@/components/home/hero-carousel'

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [resetPasswordToken, setResetPasswordToken] = useState<string | null>(
    null
  )
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useIsMobile()

  // Check for reset password token in query params
  useEffect(() => {
    const token = searchParams?.get('token')
    if (token) {
      setResetPasswordToken(token)
      setShowResetPasswordDialog(true)
    }
  }, [searchParams])

  const handleGameClick = (game: Game) => {
    router.push(`/game/${game.gameid}`)
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
      <div className="relative w-full">
        {/* Carousel with text overlay */}
        {/* <div className="relative w-full">
          <HeroCarousel /> */}
        {/* Hero Image Section with text overlay */}
        <div className="relative w-full overflow-hidden select-none">
          {/* Hero Image */}
          <div className="relative w-full h-full">
            <Image
              src="/images/hero-image.webp"
              alt="Hero"
              width={1920}
              height={1080}
              quality={95}
              sizes="100vw"
              // className="w-full h-[500px] sm:h-[500px] lg:h-[800px] object-cover mt-[5rem] sm:mt-0"
              className="w-full h-[500px] sm:h-full object-cover mt-[5rem] sm:mt-0 select-none"
              priority
              draggable={false}
            />
            {/* Gradient fade at bottom to merge with next section */}
            <div className="absolute inset-x-0 -bottom-[13px] sm:-bottom-10 h-20 sm:h-40 lg:h-48 bg-gradient-to-b from-transparent via-black/30 to-black pointer-events-none" />
          </div>
          {/* Text Overlay */}
          <div className="absolute w-full top-24 sm:top-20 lg:top-[15%] left-1/2 -translate-x-1/2 flex items-center justify-center flex-col text-center gap-2 z-10 select-none">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white select-none">
              <TypingText text="Enter The PWR City" delay={0.2} />
            </h1>
            <p className="text-sm sm:text-xl lg:text-xl text-white hidden sm:block select-none">
              <TypingText
                text="Gamble Like a Degen. Win Like a Degen"
                delay={1.5}
              />
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        <main
          className={`flex-1 bg-[#040315] sm:bg-transparent transition-all duration-300 ease-in-out ${
            isChatOpen ? 'lg:mr-80' : 'lg:mr-0'
          }
          `}
        >
          <div className="max-w-[1100px] mx-auto space-y-8 sm:space-y-6">
            <div className="pb-[3rem] sm:pb-[2rem] relative mt-0 sm:-mt-20 lg:-mt-[2.5rem] px-4 lg:px-16 xl:px-4 pb-6 pt-0 sm:py-6 sm:py-4 bg-black sm:bg-transparent">
              <h1 className="text-lg sm:text-2xl font-bold text-center mb-4 sm:mb-8">
                PWR Originals
              </h1>
              {isMobile ? (
                <GameCardsMobile onGameClick={handleGameClick} />
              ) : (
                <GameCardsDesktop onGameClick={handleGameClick} />
              )}
            </div>

            <div className="max-w-[1100px] mx-auto relative px-4 lg:px-16 xl:px-4 py-6 sm:py-4">
              <div className="absolute top-10 -left-[5rem] h-[15rem] hidden sm:block sm:h-[20rem] w-[400px] bg-brand-pink/30 rounded-full blur-3xl"></div>
              {/* <div
                className="absolute -bottom-20 -right-[5rem] h-[15rem] sm:h-[25rem] w-[400px] bg-[#005f5a]/30 rounded-full blur-[8rem]"
                // style={{
                //   rotate: '-30deg',
                // }}
              ></div> */}
              <Banner />
              <InfoCards />
            </div>
            <SectionCards />
          </div>
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

const Badge = ({
  text,
  arrowUp = true,
  className,
}: {
  text: string
  arrowUp?: boolean
  className?: string
}) => {
  return (
    <div
      className={cn(
        'absolute top-3 right-0 text-[10px] font-bold px-1 py-1 rounded-l-md flex items-center justify-center gap-1',
        arrowUp
          ? 'bg-[#E3DF96] border-[#C5BB00] text-[#978F00]'
          : 'bg-[#98DAB8] border-[#18653E] text-[#18653E]'
      )}
    >
      {arrowUp ? (
        <svg
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3"
        >
          <path
            d="M13.391 0.0982637C13.6671 0.104292 13.886 0.332982 13.88 0.609059L13.7818 5.10799C13.7758 5.38406 13.5471 5.60298 13.271 5.59695C12.9949 5.59093 12.776 5.36223 12.782 5.08616L12.8693 1.08711L8.87029 0.999795C8.59421 0.993767 8.37529 0.765077 8.38132 0.489C8.38735 0.212923 8.61604 -0.00599384 8.89211 3.33786e-05L13.391 0.0982637ZM8.03592 5.71397L7.69016 5.35278L8.03592 5.71397ZM3.87129 4.51351L3.49121 4.18865L3.87129 4.51351ZM0.380127 8.59814L4.16934e-05 8.27328L3.49121 4.18865L3.87129 4.51351L4.25138 4.83838L0.760212 8.92301L0.380127 8.59814ZM5.32297 4.44086L5.66872 4.07968L6.99866 5.35278L6.65291 5.71397L6.30716 6.07516L4.97722 4.80205L5.32297 4.44086ZM8.03592 5.71397L7.69016 5.35278L13.0344 0.236958L13.3801 0.598145L13.7259 0.959332L8.38167 6.07516L8.03592 5.71397ZM6.65291 5.71397L6.99866 5.35278C7.19201 5.53787 7.49682 5.53787 7.69016 5.35278L8.03592 5.71397L8.38167 6.07516C7.80163 6.63041 6.8872 6.63041 6.30716 6.07516L6.65291 5.71397ZM3.87129 4.51351L3.49121 4.18865C4.05103 3.53367 5.0463 3.48386 5.66872 4.07968L5.32297 4.44086L4.97722 4.80205C4.76974 4.60344 4.43799 4.62005 4.25138 4.83838L3.87129 4.51351Z"
            fill="#978F00"
          />
        </svg>
      ) : (
        <svg
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.391 8.82459C13.6671 8.81856 13.886 8.58987 13.88 8.31379L13.7818 3.81486C13.7758 3.53879 13.5471 3.31987 13.271 3.3259C12.9949 3.33193 12.776 3.56062 12.782 3.83669L12.8693 7.83574L8.87029 7.92306C8.59421 7.92908 8.37529 8.15777 8.38132 8.43385C8.38735 8.70993 8.61604 8.92885 8.89211 8.92282L13.391 8.82459ZM8.03592 3.20888L7.69016 3.57007L8.03592 3.20888ZM3.87129 4.40934L3.49121 4.7342L3.87129 4.40934ZM0.380127 0.324707L4.16934e-05 0.649569L3.49121 4.7342L3.87129 4.40934L4.25138 4.08448L0.760212 -0.000154793L0.380127 0.324707ZM5.32297 4.48199L5.66872 4.84318L6.99866 3.57007L6.65291 3.20888L6.30716 2.84769L4.97722 4.1208L5.32297 4.48199ZM8.03592 3.20888L7.69016 3.57007L13.0344 8.68589L13.3801 8.32471L13.7259 7.96352L8.38167 2.84769L8.03592 3.20888ZM6.65291 3.20888L6.99866 3.57007C7.19201 3.38498 7.49682 3.38498 7.69016 3.57007L8.03592 3.20888L8.38167 2.84769C7.80163 2.29244 6.8872 2.29244 6.30716 2.84769L6.65291 3.20888ZM3.87129 4.40934L3.49121 4.7342C4.05103 5.38919 5.0463 5.439 5.66872 4.84318L5.32297 4.48199L4.97722 4.1208C4.76974 4.31941 4.43799 4.30281 4.25138 4.08448L3.87129 4.40934Z"
            fill="#18653E"
          />
        </svg>
      )}
      {text}
    </div>
  )
}

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
              {index < 3 && <Badge text="75%" arrowUp={true} />}
              {index === 3 && <Badge text="65%" arrowUp={false} />}

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
