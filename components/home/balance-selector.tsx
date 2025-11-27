'use client'

import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { walletApi, type UserBalanceEntry } from '@/lib/api/wallet'
import { useAuthStore } from '@/store/auth'
import { EthIcon, SolanaIcon, TronIcon } from '../common/icons'
import { ArrowIcon } from '../icons'
import { cn } from '@/lib/utils'

// Chain configuration
const chainConfig = {
  evm: { name: 'EVM', icon: <EthIcon className="w-4 h-4" /> },
  solana: { name: 'Solana', icon: <SolanaIcon className="w-4 h-4" /> },
  tron: { name: 'Tron', icon: <TronIcon className="w-4 h-4" /> },
} as const

type ChainType = keyof typeof chainConfig

interface ChainBalance {
  chain: ChainType
  availableAmount: number
  currency: string
}

const formatTriggerBalance = (value: number): string => {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 4,
    useGrouping: false,
  })
}

const formatContentBalance = (value: number): string => {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 8,
    useGrouping: false,
  })
}

export function ChainBalanceSelector({
  setDepositWithdrawModalOpen,
}: {
  setDepositWithdrawModalOpen: (open: boolean) => void
}) {
  const [selectedChain, setSelectedChain] = useState<string>('total')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { isAuthenticated, user } = useAuthStore()

  // Calculate chain balances from user data
  const chainBalances = useMemo((): ChainBalance[] => {
    if (!user?.depositWalletAddresses) return []

    const balances: ChainBalance[] = []
    const chains: ChainType[] = ['evm', 'solana', 'tron']

    chains.forEach((chain) => {
      const walletData = user.depositWalletAddresses?.[chain]
      if (walletData?.availableAmount) {
        balances.push({
          chain,
          availableAmount: Number(walletData.availableAmount),
          currency: 'USD', // Assuming USD for now, adjust as needed
        })
      }
    })

    return balances
  }, [user?.depositWalletAddresses])

  // Calculate total balance across all chains
  const totalBalance = useMemo(() => {
    return chainBalances.reduce(
      (sum, balance) => sum + balance.availableAmount,
      0
    )
  }, [chainBalances])

  // Get current selection for display
  const currentSelection = useMemo(() => {
    if (selectedChain === 'total') {
      return {
        displayName: 'Total Balance',
        balance: totalBalance,
        currency: 'USD',
        icon: '',
      }
    }

    const chainBalance = chainBalances.find((b) => b.chain === selectedChain)
    if (chainBalance) {
      return {
        displayName: chainConfig[chainBalance.chain].name,
        balance: chainBalance.availableAmount,
        currency: chainBalance.currency,
        icon: chainConfig[chainBalance.chain].icon,
      }
    }

    return null
  }, [selectedChain, chainBalances, totalBalance])

  // Set default selection when balances load
  useEffect(() => {
    if (chainBalances.length > 0 && selectedChain === '') {
      setSelectedChain('total')
    }
  }, [chainBalances, selectedChain])

  return (
    <div className="relative flex items-center overflow-hidden h-12">
      {/* SVG Background for container */}
      <svg
        width="140"
        height="48"
        viewBox="0 0 140 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        {/* <foreignObject x="-60" y="-60" width="260" height="168">
          <div
            style={{
              backdropFilter: 'blur(30px)',
              clipPath: 'url(#bgblur_0_5045_15442_clip_path)',
              height: '100%',
              width: '100%',
              backgroundColor: 'transparent',
            }}
          ></div>
        </foreignObject> */}
        <g data-figma-bg-blur-radius="60">
          <path
            d="M6.24264 1.75736L1.75736 6.24264C0.632141 7.36786 0 8.89398 0 10.4853V42C0 45.3137 2.68629 48 6 48H129.515C131.106 48 132.632 47.3679 133.757 46.2426L138.243 41.7574C139.368 40.6321 140 39.106 140 37.5147V6C140 2.68629 137.314 0 134 0H10.4853C8.89398 0 7.36786 0.632139 6.24264 1.75736Z"
            // fill="url(#paint0_linear_5045_15442)"
            fill="#0C0A12"
          />
          <path
            d="M10.4854 0.5H134C137.038 0.5 139.5 2.96243 139.5 6V37.5146C139.5 38.9733 138.92 40.3719 137.889 41.4033L133.403 45.8887C132.372 46.9201 130.973 47.5 129.515 47.5H6C2.96243 47.5 0.5 45.0376 0.5 42V10.4854C0.5 9.02668 1.0799 7.62813 2.11133 6.59668L6.59668 2.11133C7.62813 1.0799 9.02668 0.5 10.4854 0.5Z"
            stroke="white"
            strokeOpacity="0.1"
          />
        </g>
        <defs>
          <clipPath
            id="bgblur_0_5045_15442_clip_path"
            transform="translate(60 60)"
          >
            <path d="M6.24264 1.75736L1.75736 6.24264C0.632141 7.36786 0 8.89398 0 10.4853V42C0 45.3137 2.68629 48 6 48H129.515C131.106 48 132.632 47.3679 133.757 46.2426L138.243 41.7574C139.368 40.6321 140 39.106 140 37.5147V6C140 2.68629 137.314 0 134 0H10.4853C8.89398 0 7.36786 0.632139 6.24264 1.75736Z" />
          </clipPath>
          <linearGradient
            id="paint0_linear_5045_15442"
            x1="70"
            y1="-1"
            x2="70"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.05" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Balance Display with Dropdown */}
      <div className="relative flex-1 flex items-center z-10">
        <Select
          value={selectedChain}
          onValueChange={setSelectedChain}
          onOpenChange={setIsOpen}
        >
          <SelectTrigger className="flex-1 !bg-transparent border-none text-white focus:outline-none foucs:ring-0 focus-visible:ring-0 active:outline-none active:ring-0 active:ring-offset-0 text-xl font-semibold px-4 py-4 h-auto focus:ring-0 focus:ring-offset-0 [&>svg]:hidden">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 !text-[16px]">
                <span className="text-lg">
                  {currentSelection?.icon ?? '🪙'}
                </span>
                <SelectValue className="!text-[16px]">
                  {loading
                    ? 'Loading...'
                    : currentSelection
                    ? `$ ${formatTriggerBalance(currentSelection.balance)}`
                    : 'No balances'}
                </SelectValue>
              </div>
              <ArrowIcon
                className={cn(
                  'ml-3',
                  isOpen ? 'rotate-180 text-white' : 'rotate-0 text-gray'
                )}
                stroke={isOpen ? 'white' : 'gray'}
              />
            </div>
          </SelectTrigger>
          <SelectContent className="z-[5555] p-0 border-0 bg-transparent min-w-[160px] shadow-none [&>div]:p-0 mt-2">
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
                    id="bgblur_balance_selector_clip_path"
                    transform="translate(70 70)"
                  >
                    <path d="M7.24167 2.25736L2.25725 7.24178C1.13152 8.36751 0.499335 9.89449 0.499889 11.4865L0.54428 113.002C0.54543 116.315 3.23139 119 6.54429 119H172.514C174.105 119 175.631 118.368 176.756 117.243L178.242 115.757C179.367 114.632 179.999 113.106 179.999 111.515V7C179.999 3.68629 177.313 1 173.999 1H11.4843C9.89301 1 8.36688 1.63214 7.24167 2.75736Z" />
                  </clipPath>
                </defs>
              </svg>

              <div className="relative w-full h-full flex flex-col py-2 px-1">
                {/* Individual Chain Balances */}
                {chainBalances.map((balance) => (
                  <SelectItem
                    key={balance.chain}
                    value={balance.chain}
                    className="hover:bg-white/5 focus:bg-white/10 bg-transparent text-white"
                    showCheck={false}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">
                        {chainConfig[balance.chain].icon}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          $ {formatContentBalance(balance.availableAmount)}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}

                {/* Show message if no balances */}
                {chainBalances.length === 0 && (
                  <SelectItem
                    value="no-balance"
                    disabled
                    className="text-gray-400 bg-transparent"
                    showCheck={false}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">🪙</span>
                      <span>No balances available</span>
                    </div>
                  </SelectItem>
                )}
              </div>
            </div>
          </SelectContent>
        </Select>
      </div>

      {/* Plus Button SVG */}
      <button
        type="button"
        onClick={() => setDepositWithdrawModalOpen(true)}
        className="relative flex-shrink-0 cursor-pointer h-11 w-11"
        aria-label="Deposit or Withdraw"
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
        >
          <foreignObject x="-59.9966" y="-60" width="163.997" height="164">
            <div
              style={{
                backdropFilter: 'blur(30px)',
                clipPath: 'url(#bgblur_0_5045_15446_clip_path)',
                height: '100%',
                width: '100%',
              }}
            ></div>
          </foreignObject>
          <path
            data-figma-bg-blur-radius="60"
            d="M10.4854 0.5H38C41.0376 0.5 43.5 2.96243 43.5 6V33.5146C43.5 34.9733 42.9201 36.3719 41.8887 37.4033L37.4033 41.8887C36.3719 42.9201 34.9733 43.5 33.5146 43.5H6.03906C3.0045 43.4998 0.543053 41.0414 0.539062 38.0068L0.50293 10.4893C0.501008 9.02806 1.08104 7.626 2.11426 6.59277L6.59668 2.11133C7.62813 1.0799 9.02668 0.5 10.4854 0.5Z"
            fill="url(#paint0_linear_5045_15446)"
            stroke="#EE4FFB"
          />
          <path
            d="M16 22H28"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 22V28"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 16V18.7978"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <clipPath
              id="bgblur_0_5045_15446_clip_path"
              transform="translate(59.9966 60)"
            >
              <path d="M10.4854 0.5H38C41.0376 0.5 43.5 2.96243 43.5 6V33.5146C43.5 34.9733 42.9201 36.3719 41.8887 37.4033L37.4033 41.8887C36.3719 42.9201 34.9733 43.5 33.5146 43.5H6.03906C3.0045 43.4998 0.543053 41.0414 0.539062 38.0068L0.50293 10.4893C0.501008 9.02806 1.08104 7.626 2.11426 6.59277L6.59668 2.11133C7.62813 1.0799 9.02668 0.5 10.4854 0.5Z" />
            </clipPath>
            <linearGradient
              id="paint0_linear_5045_15446"
              x1="22"
              y1="0"
              x2="22"
              y2="44"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#EE4FFB" stopOpacity="0.2" />
              <stop offset="1" stopColor="#EE4FFB" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </button>
    </div>
  )
}
