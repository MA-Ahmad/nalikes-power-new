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
import { GiftBoxIcon } from '../ions'
import { useAuthStore } from '@/store/auth'
import { useAuthLogout } from '@/hooks/use-auth-logout'
import { DepositWithdrawModal } from '../wallet/deposit-withdraw-modal'
import { ChainBalanceSelector } from './balance-selector'
import { UserDropdown } from './user-dropdown'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full shrink-0 items-center justify-between bg-sidebar px-4 md:px-6">
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
            <SheetContent side="left" className="bg-sidebar border-neutral-800">
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
                  <h2 className="text-white text-2xl font-aeonik-bold">
                    Powerblocks
                  </h2>
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
                  className="flex items-center gap-3 px-2 py-2 text-white hover:bg-neutral-800 rounded-md transition-colors"
                >
                  <GiftBoxIcon className="h-5 w-5 text-white" />
                  <span>Rewards</span>
                </Link>

                <Link
                  href="/blog"
                  className={cn(
                    'flex items-center gap-3 px-2 py-2 text-white hover:bg-neutral-800 rounded-md transition-colors',
                    pathname === '/blog' && 'bg-neutral-800'
                  )}
                >
                  <Book className="h-5 w-5 text-white" />
                  <span>Blog</span>
                </Link>

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
              className="size-10"
            />
            <h2 className="text-white text-2xl font-aeonik-bold sm:block hidden">
              Powerblocks
            </h2>
          </Link>
        </div>

        {/* Desktop Left Section */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-2">
            <Image
              src="/logo.svg"
              alt="Powerblocks"
              width={33}
              height={42}
              className="size-10"
            />
            <h2 className="text-white text-2xl font-aeonik-bold">
              Powerblocks
            </h2>
          </Link>
          <div className="h-6 w-px bg-gray-600"></div>

          {/* Games Dropdown */}
          <DropdownMenu onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-white flex hover:bg-neutral-700 items-center gap-2"
              >
                <Gamepad2 className="w-4 h-4" />
                Games
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="hover:bg-neutral-800 focus:bg-neutral-800">
                <Gamepad2 className="w-4 h-4 mr-3 text-white" />
                All Games
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-neutral-800 focus:bg-neutral-800">
                <Trophy className="h-4 w-4 mr-3 text-white" />
                Tournaments
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-neutral-800 focus:bg-neutral-800">
                <User className="h-4 w-4 mr-3 text-white" />
                Leaderboard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Rewards Link */}
          <Link
            href="#"
            className="flex items-center gap-2 text-white hover:bg-neutral-800 px-3 py-1.5 rounded-md transition-colors"
          >
            <GiftBoxIcon className="h-4 w-4" />
            Rewards
          </Link>

          <Link
            href="/blog"
            className={cn(
              'flex items-center gap-2 text-white hover:bg-neutral-800 px-3 py-1.5 rounded-md transition-colors',
              pathname === '/blog' && 'bg-neutral-800'
            )}
          >
            <Book className="h-4 w-4 text-white" />
            <span>Blog</span>
          </Link>
        </div>

        {/* Right Section - Auth */}
        <div className="flex items-center gap-5">
          {isAuthenticated && user ? (
            <ChainBalanceSelector
              setDepositWithdrawModalOpen={setDepositWithdrawModalOpen}
            />
          ) : null}
          <div className="h-6 w-px bg-gray-600"></div>

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
                    <Button
                      className="hidden sm:flex border-gray-700 text-white bg-neutral-800 hover:bg-neutral-700 hover:text-white"
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
      </header>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      <DepositWithdrawModal
        open={depositWithdrawModalOpen}
        onOpenChange={setDepositWithdrawModalOpen}
      />
    </>
  )
}
