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
  X,
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
import { GiftBoxIcon } from '../icons'
import { useAuthStore } from '@/store/auth'
import { useAuthLogout } from '@/hooks/use-auth-logout'
import { DepositWithdrawModal } from '../wallet/deposit-withdraw-modal'
import { ChainBalanceSelector } from './balance-selector'
import { UserDropdown } from './user-dropdown'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function SignIn() {
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
      {/* <header
        className={cn(
          'fixed top-10 left-10 right-10 z-50 flex h-16 w-full shrink-0 items-center justify-between px-4 md:px-6 z-[5555]'
        )}
      >
        <div className="sm:top-4 sm:left-32 w-full">
          <Image
            src="/root-page/logo.svg"
            alt="Power.win Logo"
            width={192}
            height={112}
            className="w-48 h-28"
            priority
          />
        </div>
        <Button
          className="hidden sm:flex border-gray-700 text-white bg-neutral-800 hover:bg-neutral-700 hover:text-white"
          onClick={() => setAuthModalOpen(true)}
        >
          Sign In
        </Button>
      </header> */}

      <Header onSignInClick={() => setAuthModalOpen(true)} />

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      <DepositWithdrawModal
        open={depositWithdrawModalOpen}
        onOpenChange={setDepositWithdrawModalOpen}
      />
    </>
  )
}

interface HeaderProps {
  onSignInClick: () => void
}

export function Header({ onSignInClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header
      className={cn(
        'fixed top-0 py-10 left-0 right-0 z-50',
        'flex h-16 w-full shrink-0 items-center justify-between',
        'px-4 sm:px-6 md:px-8',
        'bg-neutral-900/10 border-b border-gray-700/50'
      )}
    >
      {/* Logo - responsive sizing */}
      <div className="flex-shrink-0">
        <Image
          src="/root-page/logo.svg"
          alt="Power.win Logo"
          width={192}
          height={112}
          className="w-32 h-auto sm:w-40 md:w-48"
          priority
        />
      </div>

      {/* Desktop Sign In Button */}
      <Button
        className="hidden sm:flex border-gray-700 text-white bg-neutral-800 hover:bg-neutral-700 hover:text-white"
        onClick={onSignInClick}
      >
        Sign In
      </Button>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="sm:hidden p-2 text-white hover:bg-neutral-700 rounded-md transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-neutral-900/50 border-b border-gray-700/30 sm:hidden">
          <div className="px-4 py-4 space-y-3">
            <Button
              onClick={() => {
                onSignInClick()
                setIsMobileMenuOpen(false)
              }}
              className="w-full border-gray-700 text-white bg-neutral-800 hover:bg-neutral-700 hover:text-white"
            >
              Sign In
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
