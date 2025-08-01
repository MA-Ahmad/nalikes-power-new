'use client'

import {
  ChevronDown,
  GamepadIcon,
  Menu,
  Trophy,
  User,
  Wallet,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'
import { Separator } from '../ui/separator'
import { AuthModal } from './auth-modal'
// import logo from '@/public/images/logo.svg'

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

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
                    <GamepadIcon className="h-5 w-5 text-green-400" />
                    <span>All Games</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-2 py-2 text-white hover:bg-neutral-800 rounded-md"
                  >
                    <Trophy className="h-5 w-5 text-yellow-400" />
                    <span>Tournaments</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-2 py-2 text-white hover:bg-neutral-800 rounded-md"
                  >
                    <User className="h-5 w-5 text-purple-400" />
                    <span>Leaderboard</span>
                  </Link>
                </div>

                <Link
                  href="#"
                  className="flex items-center gap-3 px-2 py-2 text-white hover:bg-neutral-800 rounded-md transition-colors"
                >
                  <Trophy className="h-5 w-5 text-orange-400" />
                  <span>Rewards</span>
                </Link>

                <div className="flex flex-col gap-2 mt-4">
                  <Button
                    className="flex border-gray-700 text-white hover:bg-neutral-800 hover:text-white bg-neutral-800"
                    onClick={() => setAuthModalOpen(true)}
                  >
                    Sign In
                  </Button>
                  <Button className="bg-[linear-gradient(to_right,_#6A2A97_0%,_#C753FD_53%,_#FA96FF_100%)] text-white cursor-pointer">
                    <Wallet className="h-4 w-4" />
                    Connect Wallet
                  </Button>
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

          {/* Dropdown */}
          <DropdownMenu onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-white flex hover:bg-neutral-700 items-center gap-2"
              >
                <GamepadIcon className="h-4 w-4 text-green-400" />
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
                <GamepadIcon className="h-4 w-4 mr-3 text-green-400" />
                All Games
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-neutral-800 focus:bg-neutral-800">
                <Trophy className="h-4 w-4 mr-3 text-yellow-400" />
                Tournaments
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-neutral-800 focus:bg-neutral-800">
                <User className="h-4 w-4 mr-3 text-purple-400" />
                Leaderboard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Rewards Link */}
          <Link
            href="#"
            className="flex items-center gap-2 text-white hover:bg-neutral-800 px-3 py-1.5 rounded-md transition-colors"
          >
            <Trophy className="h-4 w-4 text-orange-400" />
            Rewards
          </Link>
        </div>

        {/* Right Section - Auth Buttons */}
        <div className="flex items-center gap-5">
          <div className="h-6 w-px bg-gray-600"></div>

          <div className="flex items-center gap-3">
            <Button
              className="hidden sm:flex border-gray-700 text-white bg-neutral-800 hover:bg-neutral-700 hover:text-white"
              onClick={() => setAuthModalOpen(true)}
            >
              Sign In
            </Button>
            <Button className="bg-[linear-gradient(to_right,_#6A2A97_0%,_#C753FD_53%,_#FA96FF_100%)] text-white cursor-pointer">
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          </div>

          {/* <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-white hover:text-gray-300 hover:bg-neutral-800 font-medium"
          >
            Login
          </Button>
          <Button className="bg-[linear-gradient(to_right,_#6A2A97_0%,_#C753FD_53%,_#FA96FF_100%)] text-white font-medium px-4 py-2 rounded-sm flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        </div> */}
        </div>
      </header>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  )
}
