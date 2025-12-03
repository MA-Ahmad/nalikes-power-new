'use client'

import {
  ChevronDown,
  Gamepad2,
  GamepadIcon,
  Menu,
  Trophy,
  User,
  Wallet,
  Zap,
  LogOut,
  Copy,
  Check,
  Book,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'
import { Separator } from '../ui/separator'
import { AuthModal } from './auth-modal'
import { ArrowIcon, GiftBoxIcon } from '../icons'
import { useAuthStore } from '@/store/auth'
import { useAuthLogout } from '@/hooks/use-auth-logout'
import { DepositWithdrawModal } from '../wallet/deposit-withdraw-modal'
import { ChainBalanceSelector } from './balance-selector'
import { UserDropdown } from './user-dropdown'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import {
  BlackjackIcon,
  BombDefuseIcon,
  CaseIcon,
  CoinsStackIcon,
  CounterStrikeIcon,
  CrashIcon,
  DiceIcon,
  GameControllerIcon,
  GiftIcon,
  LeafIcon,
  MinesIcon,
  PlinkoIcon,
  RouletteIcon,
  TargetIcon,
  TrophyIcon,
} from '../icons/games'

export default function Navbar() {
  const [isPwrOriginalsDropdownOpen, setIsPwrOriginalsDropdownOpen] =
    useState(false)
  const [isCounterStrikeDropdownOpen, setIsCounterStrikeDropdownOpen] =
    useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [depositWithdrawModalOpen, setDepositWithdrawModalOpen] =
    useState(false)

  const { isAuthenticated, user, loading } = useAuthStore()
  const handleLogout = useAuthLogout()
  const pathname = usePathname()

  const onLogout = async () => {
    await handleLogout()
    setIsUserDropdownOpen(false)
  }

  const valuePageYOffset = 2
  const [isScrolledDown, setIsScrolledDown] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  // const { isMobile } = useScreenSize()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    // Function to toggle body scroll
    const toggleBodyScroll = (disable: boolean) => {
      if (disable) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }

    // Apply the effect when isOpen changes
    toggleBodyScroll(isOpen)

    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleScroll = () => {
    const position = window.pageYOffset
    setIsScrolledDown(position > valuePageYOffset ? true : false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex h-16 w-full shrink-0 items-center justify-between px-4 md:px-6 z-[5555]',
          isScrolledDown &&
            'border-b backdrop-blur-md backdrop-brightness-75 top-0 border-white/[0.1]'
        )}
      >
        {/* bg-sidebar */}
        {/* Mobile Menu */}
        <div className="flex lg:hidden items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:bg-neutral-800"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-sidebar border-neutral-800 z-[5555]"
            >
              <div className="flex flex-col gap-4 py-6 px-6">
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2"
                >
                  <Image
                    src="/logo.svg"
                    alt="Powerblocks"
                    width={33}
                    height={42}
                  />
                  {/* <h2 className="text-white text-2xl font-aeonik-bold">
                    Powerblocks
                  </h2> */}
                </Link>

                <div className="flex flex-col gap-2">
                  <div className="text-sm font-medium text-gray-400 px-2">
                    Games
                  </div>
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-2 py-2 text-white hover:bg-neutral-800 rounded-md"
                  >
                    <Gamepad2 className="w-5 h-5 text-white" />
                    <span>All Games</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-2 py-2 text-white hover:bg-neutral-800 rounded-md"
                  >
                    <Trophy className="h-5 w-5 text-white" />
                    <span>Tournaments</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-2 py-2 text-white hover:bg-neutral-800 rounded-md"
                  >
                    <User className="h-5 w-5 text-white" />
                    <span>Leaderboard</span>
                  </Link>
                </div>

                <Link
                  href="#"
                  className="flex items-center gap-3 px-2 py-2 text-white hover:bg-white/20 rounded-md transition-colors"
                >
                  {/* <GiftBoxIcon className="h-5 w-5 text-white" /> */}
                  <span>Rewards</span>
                </Link>

                {/* <Link
                  href="/mystery-box"
                  className="flex items-center gap-3 px-2 py-2 text-white hover:bg-white/20 rounded-md transition-colors"
                >
                  <span>Mystery Box</span>
                </Link> */}

                {/* <Link
                  href="/blog"
                  className={cn(
                    'flex items-center gap-3 px-2 py-2 text-white hover:bg-neutral-800 rounded-md transition-colors',
                    pathname === '/blog' && 'bg-neutral-800'
                  )}
                >
                  <Book className="h-5 w-5 text-white" />
                  <span>Blog</span>
                </Link> */}

                {/* Mobile Auth Section */}
                <div className="flex flex-col gap-2 mt-4">
                  {!loading && (
                    <>
                      {isAuthenticated && user ? (
                        <>
                          <div className="text-white text-sm px-2 py-1">
                            Welcome, {user.username}!
                          </div>
                          <Button
                            variant="outline"
                            className="border-gray-700 text-white hover:bg-neutral-800 hover:text-white bg-neutral-800"
                            onClick={onLogout}
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                          </Button>
                        </>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Button
                            className="flex border-gray-700 text-white hover:bg-neutral-800 hover:text-white bg-neutral-800"
                            onClick={() => setAuthModalOpen(true)}
                          >
                            Sign In
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          {/* Mobile Logo */}
          <Link
            href="/"
            className="flex lg:hidden items-center justify-start gap-2"
          >
            <Image
              src="/logo.svg"
              alt="Powerblocks"
              width={33}
              height={42}
              className="size-12"
            />
            {/* <h2 className="text-white text-2xl font-aeonik-bold sm:block hidden">
              Powerblocks
            </h2> */}
          </Link>
        </div>

        {/* Desktop Left Section */}
        <div className="hidden lg:flex items-center gap-2">
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/images/power.svg"
              alt="Powerblocks"
              width={33}
              height={42}
              className="size-12"
            />
            {/* <h2 className="text-white text-2xl font-aeonik-bold">
              Powerblocks
            </h2> */}
          </Link>
          <div className="h-6 w-px bg-gray-600 mx-6"></div>

          <div className="flex items-center gap-2">
            {/* Games Dropdown */}
            <DropdownMenu onOpenChange={setIsPwrOriginalsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white flex hover:!bg-white/5 items-center gap-2 focus:outline-none focus-visible:ring-[0]"
                >
                  {/* <Gamepad2 className="w-4 h-4" /> */}
                  <div className="flex items-center gap-2">
                    <GameControllerIcon className="w-5 h-5 text-white" />
                    <span>PWR Original</span>
                  </div>
                  {/* <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                /> */}
                  <ArrowIcon
                    className={cn(
                      isPwrOriginalsDropdownOpen
                        ? 'rotate-180 text-white'
                        : 'rotate-0 text-gray'
                    )}
                    stroke={isPwrOriginalsDropdownOpen ? 'white' : 'gray'}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="z-[5555] p-0 border-0 bg-transparent min-w-[160px]"
                sideOffset={8}
              >
                <div className="relative w-full min-h-[100px]">
                  <svg
                    width="180"
                    height="120"
                    viewBox="0 0 180 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                  >
                    {/* <foreignObject x="-70" y="-70" width="320" height="260">
                    <div
                      // @ts-ignore
                      xmlns="http://www.w3.org/1999/xhtml"
                      style={{
                        backdropFilter: 'blur(35px)',
                        clipPath: 'url(#bgblur_games_dropdown_clip_path)',
                        height: '100%',
                        width: '100%',
                      }}
                    ></div>
                  </foreignObject> */}
                    <g data-figma-bg-blur-radius="70">
                      <path
                        d="M7.24167 2.25736L2.25725 7.24178C1.13152 8.36751 0.499335 9.89449 0.499889 11.4865L0.54428 113.002C0.54543 116.315 3.23139 119 6.54429 119H172.514C174.105 119 175.631 118.368 176.756 117.243L178.242 115.757C179.367 114.632 179.999 113.106 179.999 111.515V7C179.999 3.68629 177.313 1 173.999 1H11.4843C9.89301 1 8.36688 1.63214 7.24167 2.75736Z"
                        fill="#0C0A12"
                      />
                      <path
                        d="M11.4844 1.5H173.999C177.037 1.5 179.499 3.96243 179.499 7V111.515C179.499 112.973 178.919 114.372 177.888 115.403L176.402 116.889C175.371 117.92 173.972 118.5 172.514 118.5H6.54395C3.50729 118.5 1.04502 116.039 1.04395 113.002L1 11.4863C0.999495 10.0272 1.57869 8.62758 2.61035 7.5957L7.0957 3.11133C8.12715 2.0799 9.5257 1.5 10.9844 1.5Z"
                        stroke="white"
                        strokeOpacity="0.1"
                      />
                    </g>
                    <defs>
                      <clipPath
                        id="bgblur_games_dropdown_clip_path"
                        transform="translate(70 70)"
                      >
                        <path d="M7.24167 2.25736L2.25725 7.24178C1.13152 8.36751 0.499335 9.89449 0.499889 11.4865L0.54428 113.002C0.54543 116.315 3.23139 119 6.54429 119H172.514C174.105 119 175.631 118.368 176.756 117.243L178.242 115.757C179.367 114.632 179.999 113.106 179.999 111.515V7C179.999 3.68629 177.313 1 173.999 1H11.4843C9.89301 1 8.36688 1.63214 7.24167 2.75736Z" />
                      </clipPath>
                    </defs>
                  </svg>

                  <div className="relative w-full h-full flex flex-col py-2 px-1">
                    {pwrOriginals.map((game) => (
                      <DropdownMenuItem
                        key={game.id}
                        className="hover:bg-white/5 focus:bg-white/10 bg-transparent text-white"
                      >
                        {game.image}
                        {game.name}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Games Dropdown */}
            <DropdownMenu onOpenChange={setIsCounterStrikeDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white flex hover:!bg-white/5 items-center gap-2 focus-visible:ring-[0]"
                >
                  {/* <Gamepad2 className="w-4 h-4" /> */}
                  <div className="flex items-center gap-2">
                    <CounterStrikeIcon className="w-5 h-5 text-white" />
                    <span>Counter Strike</span>
                  </div>
                  {/* <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                /> */}
                  <ArrowIcon
                    className={cn(
                      isCounterStrikeDropdownOpen
                        ? 'rotate-180 text-white'
                        : 'rotate-0 text-gray'
                    )}
                    stroke={isCounterStrikeDropdownOpen ? 'white' : 'gray'}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="z-[5555] p-0 border-0 bg-transparent min-w-[160px]"
                sideOffset={8}
              >
                <div className="relative w-full min-h-[100px]">
                  <svg
                    width="180"
                    height="120"
                    viewBox="0 0 180 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <g data-figma-bg-blur-radius="70">
                      <path
                        d="M7.24167 2.25736L2.25725 7.24178C1.13152 8.36751 0.499335 9.89449 0.499889 11.4865L0.54428 113.002C0.54543 116.315 3.23139 119 6.54429 119H172.514C174.105 119 175.631 118.368 176.756 117.243L178.242 115.757C179.367 114.632 179.999 113.106 179.999 111.515V7C179.999 3.68629 177.313 1 173.999 1H11.4843C9.89301 1 8.36688 1.63214 7.24167 2.75736Z"
                        fill="#0C0A12"
                      />
                      <path
                        d="M11.4844 1.5H173.999C177.037 1.5 179.499 3.96243 179.499 7V111.515C179.499 112.973 178.919 114.372 177.888 115.403L176.402 116.889C175.371 117.92 173.972 118.5 172.514 118.5H6.54395C3.50729 118.5 1.04502 116.039 1.04395 113.002L1 11.4863C0.999495 10.0272 1.57869 8.62758 2.61035 7.5957L7.0957 3.11133C8.12715 2.0799 9.5257 1.5 10.9844 1.5Z"
                        stroke="white"
                        strokeOpacity="0.1"
                      />
                    </g>
                    <defs>
                      <clipPath
                        id="bgblur_games_dropdown_clip_path"
                        transform="translate(70 70)"
                      >
                        <path d="M7.24167 2.25736L2.25725 7.24178C1.13152 8.36751 0.499335 9.89449 0.499889 11.4865L0.54428 113.002C0.54543 116.315 3.23139 119 6.54429 119H172.514C174.105 119 175.631 118.368 176.756 117.243L178.242 115.757C179.367 114.632 179.999 113.106 179.999 111.515V7C179.999 3.68629 177.313 1 173.999 1H11.4843C9.89301 1 8.36688 1.63214 7.24167 2.75736Z" />
                      </clipPath>
                    </defs>
                  </svg>

                  <div className="relative w-full h-full flex flex-col py-2 px-1">
                    {counterStrike.map((game) => (
                      <DropdownMenuItem
                        key={game.id}
                        className="hover:bg-white/5 focus:bg-white/10 bg-transparent text-white"
                      >
                        {game.image}
                        {game.name}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="#"
              className="hidden xl:flex items-center gap-2 text-white hover:bg-white/5 px-3 py-1.5 rounded-md transition-colors"
            >
              <CoinsStackIcon className="h-4 w-4" />
              Casino
            </Link>

            <Link
              href="#"
              className="hidden xl:flex items-center gap-2 text-white hover:bg-white/5 px-3 py-1.5 rounded-md transition-colors"
            >
              <LeafIcon className="h-4 w-4" />
              Lottery
            </Link>

            {isAuthenticated && (
              <Link
                href="/mystery-box"
                className="hidden xl:flex items-center gap-2 text-white hover:bg-white/5 px-3 py-1.5 rounded-md transition-colors"
              >
                <GiftIcon className="h-4 w-4" />
                Mystery Box
              </Link>
            )}
          </div>
        </div>

        {/* Right Section - Auth */}
        <div className="flex items-center gap-0 sm:gap-5">
          {isAuthenticated && user ? (
            <ChainBalanceSelector
              setDepositWithdrawModalOpen={setDepositWithdrawModalOpen}
            />
          ) : null}
          <div className="h-6 w-px bg-gray-600 hidden sm:block"></div>

          <div className="flex items-center gap-3">
            {!loading && (
              <>
                {isAuthenticated && user ? (
                  <div className="flex items-center gap-3">
                    <UserDropdown user={user} onLogout={onLogout} />
                    {/* <DropdownMenu onOpenChange={setIsUserDropdownOpen}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="text-white flex hover:bg-neutral-700 items-center gap-2 hidden sm:flex"
                        >
                          <User className="w-4 h-4" />
                          {user.username}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isUserDropdownOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem disabled className="text-gray-400">
                          {user.email}
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="hover:bg-neutral-800 focus:bg-neutral-800 cursor-pointer"
                          onClick={onLogout}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    {/* <Button
                      className="hidden sm:flex border-gray-700 text-white bg-neutral-800 hover:bg-neutral-700 hover:text-white"
                      onClick={() => setAuthModalOpen(true)}
                    >
                      Sign In
                    </Button> */}

                    <div
                      className="relative inline-block w-full min-w-[105px] px-3 py-2 cursor-pointer"
                      onClick={() => setAuthModalOpen(true)}
                    >
                      <svg
                        // width="125"
                        // height="48"
                        viewBox="0 0 125 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 w-full h-full"
                        preserveAspectRatio="none"
                      >
                        <foreignObject x="-60" y="-60" width="245" height="168">
                          <div
                            // @ts-ignore
                            xmlns="http://www.w3.org/1999/xhtml"
                            style={{
                              backdropFilter: 'blur(30px)',
                              clipPath: 'url(#bgblur_0_5013_5420_clip_path)',
                              height: '100%',
                              width: '100%',
                            }}
                          ></div>
                        </foreignObject>
                        <g data-figma-bg-blur-radius="60">
                          <path
                            d="M7.13595 1.5491L1.97639 6.21335C0.718034 7.3509 0 8.96794 0 10.6642V42C0 45.3137 2.68629 48 6 48H113.84C115.327 48 116.761 47.448 117.864 46.4509L123.024 41.7867C124.282 40.6491 125 39.0321 125 37.3358V6C125 2.68629 122.314 0 119 0H11.1596C9.67275 0 8.2389 0.552038 7.13595 1.5491Z"
                            fill="url(#paint0_linear_5013_5420)"
                          />
                          <path
                            d="M11.1592 0.5H119C122.038 0.5 124.5 2.96243 124.5 6V37.3359C124.5 38.8908 123.842 40.3733 122.688 41.416L117.528 46.0801C116.517 46.9938 115.203 47.4999 113.841 47.5H6C2.96243 47.5 0.5 45.0376 0.5 42V10.6641C0.500053 9.10918 1.15808 7.6267 2.31152 6.58398L7.47168 1.91992C8.48258 1.00619 9.79653 0.500096 11.1592 0.5Z"
                            stroke="#6F6BFF"
                            stroke-opacity="0.6"
                          />
                        </g>
                        <defs>
                          <clipPath
                            id="bgblur_0_5013_5420_clip_path"
                            transform="translate(60 60)"
                          >
                            <path d="M7.13595 1.5491L1.97639 6.21335C0.718034 7.3509 0 8.96794 0 10.6642V42C0 45.3137 2.68629 48 6 48H113.84C115.327 48 116.761 47.448 117.864 46.4509L123.024 41.7867C124.282 40.6491 125 39.0321 125 37.3358V6C125 2.68629 122.314 0 119 0H11.1596C9.67275 0 8.2389 0.552038 7.13595 1.5491Z" />
                          </clipPath>
                          <linearGradient
                            id="paint0_linear_5013_5420"
                            x1="-20.5357"
                            y1="0.461856"
                            x2="-20.5357"
                            y2="48.4948"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#6F6BFF" stop-opacity="0.2" />
                            <stop
                              offset="1"
                              stop-color="#6F6BFF"
                              stop-opacity="0"
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
                        Sign in
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      <DepositWithdrawModal
        open={depositWithdrawModalOpen}
        onOpenChange={setDepositWithdrawModalOpen}
      />
    </>
  )
}

const pwrOriginals = [
  {
    id: 1,
    name: 'Mines',
    image: <MinesIcon />,
    url: '#',
  },
  {
    id: 2,
    name: 'Plinko',
    image: <PlinkoIcon />,
    url: '#',
  },
  {
    id: 1,
    name: 'Crash',
    image: <CrashIcon />,
    url: '#',
  },
  {
    id: 2,
    name: 'Dice',
    image: <DiceIcon />,
    url: '#',
  },
  {
    id: 1,
    name: 'BlackJack',
    image: <BlackjackIcon />,
    url: '#',
  },
  {
    id: 2,
    name: 'Roulette',
    image: <RouletteIcon />,
    url: '#',
  },
]

const counterStrike = [
  {
    id: 1,
    name: 'Case Opening',
    image: <CaseIcon />,
    url: '#',
  },
  {
    id: 2,
    name: 'Case Battle',
    image: <TrophyIcon />,
    url: '#',
  },
  {
    id: 1,
    name: 'Bomb Defuse',
    image: <BombDefuseIcon />,
    url: '#',
  },
  {
    id: 2,
    name: 'Sniper',
    image: <TargetIcon />,
    url: '#',
  },
]
