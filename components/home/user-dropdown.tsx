'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ChevronDown,
  LogOut,
  User,
  CreditCard,
  Gift,
  Users,
  Settings,
  Check,
} from 'lucide-react'
import { VerificationModal } from './verification-modal'
import { useMutation } from '@tanstack/react-query'
import { authApi, SendCodeData } from '@/lib/auth-api'
import { toast } from 'react-hot-toast'
import { ArrowIcon } from '../icons'
import { cn } from '@/lib/utils'

interface UserDropdownProps {
  user: {
    username: string
    email: string
    emailVerified?: boolean
  }
  onLogout: () => void
}

export function UserDropdown({ user, onLogout }: UserDropdownProps) {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [verificationModalOpen, setVerificationModalOpen] = useState(false)

  const sendCodeMutation = useMutation({
    mutationFn: authApi.sendCode,
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: () => {
      // Error handling is done by axios interceptor
    },
  })

  const handleVerifyEmail = () => {
    // Only open modal if email is not verified
    if (!user.emailVerified) {
      setVerificationModalOpen(true)
    }
  }

  const handleResendCode = () => {
    const sendCodeData: SendCodeData = {
      email: user.email,
      type: 'verify-email',
    }
    sendCodeMutation.mutate(sendCodeData)
  }

  const getInitials = (username: string) => {
    return username?.length > 0
      ? username
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase())
          .join('')
          .slice(0, 2)
      : user.email
          .split('@')
          .map((word) => word.charAt(0).toUpperCase())
          .join('')
          .slice(0, 2)
  }

  return (
    <DropdownMenu modal={false} onOpenChange={setIsUserDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <div className="relative flex items-center overflow-hidden h-12">
          {/* SVG Background for container */}
          <svg
            width="134"
            height="48"
            viewBox="0 0 134 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <foreignObject x="-60" y="-60" width="253.992" height="168">
              <div
                style={{
                  backdropFilter: 'blur(30px)',
                  clipPath: 'url(#bgblur_0_5045_15451_clip_path)',
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'transparent',
                }}
              ></div>
            </foreignObject>
            <g data-figma-bg-blur-radius="60">
              <path
                d="M6.23434 1.75736L1.75745 6.23425C0.627271 7.36443 -0.00526765 8.89883 0.000125918 10.4971L0.106502 42.0202C0.117658 45.326 2.80067 48 6.10647 48H123.506C125.098 48 126.624 47.3679 127.749 46.2426L132.234 41.7574C133.36 40.6321 133.992 39.106 133.992 37.5147V6C133.992 2.68629 131.305 0 127.992 0H10.477C8.88568 0 7.35956 0.632139 6.23434 1.75736Z"
                // fill="url(#paint0_linear_5045_15451)"
                fill="#0C0A12"
              />
              <path
                d="M10.4771 0.5H127.992C131.029 0.5 133.492 2.96243 133.492 6V37.5146C133.492 38.9733 132.912 40.3719 131.88 41.4033L127.395 45.8887C126.364 46.9201 124.965 47.5 123.506 47.5H6.10693C3.07661 47.5 0.617159 45.0489 0.606934 42.0186L0.500488 10.4951C0.495632 9.03018 1.075 7.6238 2.11084 6.58789L6.58838 2.11133C7.61983 1.0799 9.01838 0.5 10.4771 0.5Z"
                stroke="white"
                strokeOpacity="0.1"
              />
            </g>
            <defs>
              <clipPath
                id="bgblur_0_5045_15451_clip_path"
                transform="translate(60 60)"
              >
                <path d="M6.23434 1.75736L1.75745 6.23425C0.627271 7.36443 -0.00526765 8.89883 0.000125918 10.4971L0.106502 42.0202C0.117658 45.326 2.80067 48 6.10647 48H123.506C125.098 48 126.624 47.3679 127.749 46.2426L132.234 41.7574C133.36 40.6321 133.992 39.106 133.992 37.5147V6C133.992 2.68629 131.305 0 127.992 0H10.477C8.88568 0 7.35956 0.632139 6.23434 1.75736Z" />
              </clipPath>
              <linearGradient
                id="paint0_linear_5045_15451"
                x1="66.9917"
                y1="-1"
                x2="66.9917"
                y2="48"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" stopOpacity="0.05" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Button on top of SVG */}
          <Button
            variant="ghost"
            className="relative z-10 text-white flex hover:!bg-transparent items-center gap-2 focus-visible:ring-[0] !bg-transparent hidden sm:flex focus:bg-transparent"
          >
            <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs font-medium text-white">
              {getInitials(user.username)}
            </div>

            {user.username}

            <ArrowIcon
              className={cn(
                'ml-2',
                isUserDropdownOpen
                  ? 'rotate-180 text-white'
                  : 'rotate-0 text-gray'
              )}
              stroke={isUserDropdownOpen ? 'white' : 'gray'}
            />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-[5555] p-0 border-0 bg-transparent min-w-[160px] shadow-none [&>div]:p-0"
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
                // fill="transparent"
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
                id="bgblur_user_dropdown_clip_path"
                transform="translate(70 70)"
              >
                <path d="M7.24167 2.25736L2.25725 7.24178C1.13152 8.36751 0.499335 9.89449 0.499889 11.4865L0.54428 113.002C0.54543 116.315 3.23139 119 6.54429 119H172.514C174.105 119 175.631 118.368 176.756 117.243L178.242 115.757C179.367 114.632 179.999 113.106 179.999 111.515V7C179.999 3.68629 177.313 1 173.999 1H11.4843C9.89301 1 8.36688 1.63214 7.24167 2.75736Z" />
              </clipPath>
            </defs>
          </svg>

          <div className="relative w-full h-full flex flex-col py-2 px-1">
            <DropdownMenuItem className="hover:bg-white/5 focus:bg-white/10 bg-transparent text-white cursor-pointer">
              <User className="w-4 h-4 mr-3" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem className="hover:bg-white/5 focus:bg-white/10 bg-transparent text-white cursor-pointer">
              <CreditCard className="w-4 h-4 mr-3" />
              Transactions
            </DropdownMenuItem>

            <DropdownMenuItem className="hover:bg-white/5 focus:bg-white/10 bg-transparent text-white cursor-pointer">
              <Gift className="w-4 h-4 mr-3" />
              Rewards
            </DropdownMenuItem>

            <DropdownMenuItem className="hover:bg-white/5 focus:bg-white/10 bg-transparent text-white cursor-pointer">
              <Users className="w-4 h-4 mr-3" />
              Affiliates
            </DropdownMenuItem>

            <DropdownMenuItem className="hover:bg-white/5 focus:bg-white/10 bg-transparent text-white cursor-pointer">
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-white/10" />

            <DropdownMenuItem
              className="hover:bg-white/5 focus:bg-white/10 bg-transparent text-white cursor-pointer"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>

      <VerificationModal
        open={verificationModalOpen}
        onOpenChange={setVerificationModalOpen}
        email={user.email}
        type="verify-email"
        onResendCode={handleResendCode}
      />
    </DropdownMenu>
  )
}
