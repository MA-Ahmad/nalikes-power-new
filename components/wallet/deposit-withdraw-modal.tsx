'use client'

import { X, Wallet, Copy, Check, QrCode } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useAuthStore } from '@/store/auth'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import Image from 'next/image'
import WithdrawForm from './withdraw-form'
import { Input } from '@/components/ui/input'

const actions = [
  {
    label: 'Deposit',
    icon: (
      <svg
        width="20"
        height="17"
        viewBox="0 0 20 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
      >
        <path
          d="M18.7491 7.99146V4.91607C18.7491 2.475 17.2284 0.75 14.7844 0.75H4.71467C2.27749 0.75 0.75 2.475 0.75 4.91607"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.6375 15.6689H4.71467C2.27068 15.6689 0.75 13.9439 0.75 11.5029V8.20898"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.4844 11.916L12.4287 13.963L14.4844 16.011"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Withdraw',
    icon: (
      <svg
        width="20"
        height="17"
        viewBox="0 0 20 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
      >
        <path
          d="M18.75 7.99186V4.91627C18.75 2.47508 17.2292 0.75 14.7851 0.75H4.71486C2.27757 0.75 0.75 2.47508 0.75 4.91627"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.5165 15.6693H4.71486C2.27076 15.6693 0.75 13.9442 0.75 11.503V8.20898"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.70117 5.72461H14.7987"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.7491 13.9648H12.4277"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17 11.8809L19.0559 13.928L17 15.9761"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Buy Crypto',
    icon: (
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
      >
        <path
          d="M7.60547 12.0508C7.60547 13.3964 9.71877 14.488 12.3263 14.488C12.9514 14.488 13.5482 14.4253 14.0943 14.3113"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.47174 9.8865C2.86423 9.8865 0.75 8.7958 0.75 7.44922"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M0.75 3.1875V11.7124C0.75 13.059 2.86423 14.1496 5.47174 14.1496"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.47174 5.62449C2.86423 5.62449 0.75 4.53381 0.75 3.18724C0.75 1.84165 2.86423 0.75 5.47174 0.75C8.07924 0.75 10.1934 1.84165 10.1934 3.18724"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.3263 18.7512C9.71877 18.7512 7.60547 17.6605 7.60547 16.314V7.78906"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17.0475 7.78906V16.314C17.0475 17.1902 16.1523 17.958 14.8086 18.3875"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.3263 5.35156C9.71877 5.35156 7.60547 6.44321 7.60547 7.7888C7.60547 9.1344 9.71877 10.2261 12.3263 10.2261C14.9338 10.2261 17.048 9.1344 17.048 7.7888C17.048 7.03609 16.3864 6.36284 15.347 5.91569"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Redeem',
    icon: (
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
      >
        <path
          d="M7.60547 12.0508C7.60547 13.3964 9.71877 14.488 12.3263 14.488C12.9514 14.488 13.5482 14.4253 14.0943 14.3113"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.47174 9.8865C2.86423 9.8865 0.75 8.7958 0.75 7.44922"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M0.75 3.1875V11.7124C0.75 13.059 2.86423 14.1496 5.47174 14.1496"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.47174 5.62449C2.86423 5.62449 0.75 4.53381 0.75 3.18724C0.75 1.84165 2.86423 0.75 5.47174 0.75C8.07924 0.75 10.1934 1.84165 10.1934 3.18724"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.3263 18.7512C9.71877 18.7512 7.60547 17.6605 7.60547 16.314V7.78906"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17.0475 7.78906V16.314C17.0475 17.1902 16.1523 17.958 14.8086 18.3875"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.3263 5.35156C9.71877 5.35156 7.60547 6.44321 7.60547 7.7888C7.60547 9.1344 9.71877 10.2261 12.3263 10.2261C14.9338 10.2261 17.048 9.1344 17.048 7.7888C17.048 7.03609 16.3864 6.36284 15.347 5.91569"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
]

export function DepositWithdrawModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [activeTab, setActiveTab] = useState('deposit')
  const { isAuthenticated, user } = useAuthStore()
  const [activeAction, setActiveAction] = useState(actions[0])
  const [currency, setCurrency] = useState('evm')
  const [network, setNetwork] = useState('')
  const [copiedDeposit, setCopiedDeposit] = useState(false)
  const [selectedBonus, setSelectedBonus] = useState<string | null>(null)
  const [customBonusAmount, setCustomBonusAmount] = useState('')
  const copyTimeoutRef = useRef<number | null>(null)
  const qrCanvasRef = useRef<HTMLCanvasElement>(null)

  const depositBonusOptions = [
    { value: '15', amount: 15, bonus: 18.75 },
    { value: '25', amount: 25, bonus: 31.25 },
    { value: '50', amount: 50, bonus: 62.5 },
    { value: '100', amount: 100, bonus: 125 },
  ]

  const networks = {
    evm: ['Ethereum', 'Base', 'Polygon', 'Arbitrum'],
    solana: ['Solana Mainnet'],
    tron: ['Tron Mainnet'],
  }

  const handleCopyDepositAddress = async () => {
    if (
      !user?.depositWalletAddresses?.[
        currency as keyof typeof user.depositWalletAddresses
      ]?.address
    )
      return
    try {
      await navigator.clipboard.writeText(
        user.depositWalletAddresses?.[
          currency as keyof typeof user.depositWalletAddresses
        ]?.address ?? ''
      )
      setCopiedDeposit(true)
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current)
      copyTimeoutRef.current = window.setTimeout(() => {
        setCopiedDeposit(false)
      }, 1500)
    } catch (e) {
      // no-op
    }
  }

  useEffect(() => {
    if (!open) {
      setActiveTab('deposit')
    }
  }, [open])

  useEffect(() => {
    setCurrency('evm')
    setNetwork('')
    setSelectedBonus(null)
    setCustomBonusAmount('')
  }, [activeTab])

  useEffect(() => {
    if (!open) return

    const generateQRCode = async () => {
      const address =
        user?.depositWalletAddresses?.[
          currency as keyof typeof user.depositWalletAddresses
        ]?.address

      if (!address) {
        return
      }

      // Wait for canvas to be mounted in DOM
      const tryGenerate = async (retries = 0) => {
        if (!qrCanvasRef.current) {
          if (retries < 10) {
            // Retry up to 10 times with increasing delay
            setTimeout(() => tryGenerate(retries + 1), 50 * (retries + 1))
            return
          }
          return
        }

        try {
          // Dynamic import for QR code generation
          const qrcode = await import('qrcode')
          const QRCode = qrcode.default || qrcode

          // Clear previous canvas content
          const ctx = qrCanvasRef.current.getContext('2d')
          if (ctx && qrCanvasRef.current.width && qrCanvasRef.current.height) {
            ctx.clearRect(
              0,
              0,
              qrCanvasRef.current.width,
              qrCanvasRef.current.height
            )
          }

          await QRCode.toCanvas(qrCanvasRef.current, address, {
            width: 100,
            margin: 1,
            color: {
              dark: '#ffffff',
              light: '#171717',
            },
          })
        } catch (error) {
          console.error('Error generating QR code:', error)
        }
      }

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        tryGenerate()
      })
    }

    generateQRCode()
  }, [currency, user?.depositWalletAddresses, open])

  const getCurrencyDisplayName = (currency: string) => {
    const currencyMap: Record<string, string> = {
      evm: 'EVM',
      solana: 'SOLANA',
      tron: 'TRON',
    }
    return currencyMap[currency] || currency.toUpperCase()
  }

  const getCurrencyIcon = (currency: string) => {
    const iconMap: Record<string, string> = {
      evm: '/images/crypto/eth-icon.svg',
      solana: '/images/crypto/solana-icon.svg',
      tron: '/images/crypto/tron-icon.svg',
    }
    return iconMap[currency] || '/images/crypto/eth-icon.svg'
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="sm:max-w-xl bg-[linear-gradient(to_bottom,#11042F_-100%,#04010E_100%)] max-h-[90vh] overflow-y-auto z-[555555] border border-[#4A2F4C]/20"
          showCloseButton={false}
        >
          {/* <div className="flex items-center justify-end absolute top-2 right-2">
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Cashier
            </DialogTitle>
            <Button
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-white hover:bg-neutral-800 bg-neutral-800 w-6 h-6"
            >
              <X className="h-2 w-2" />
            </Button>
          </div> */}

          <>
            {/* <div className="bg-neutral-800 rounded-lg p-6">
              <div className="flex flex-col gap-1 justify-start items-start">
                <span className="text-gray-400 text-xs uppercase">
                  Estimated Balance
                </span>
                <span className="text-white font-bold text-xl">
                  {`$ ${Number(
                    user?.depositWalletAddresses?.[
                      currency as keyof typeof user.depositWalletAddresses
                    ]?.availableAmount
                  )?.toFixed(4)}`}
                </span>
              </div>
            </div> */}

            <div className="flex items-center justify-between mb-4 w-full border border-[#4A2F4C] rounded-lg p-0.5 bg-[#2D1B2F]/50">
              {actions.map((action, idx) => {
                const isActive = action.label === activeAction.label

                return (
                  <div
                    key={idx}
                    className={cn(
                      'p-2 px-2 text-sm flex items-center gap-2 uppercase rounded-md text-brand-pink cursor-pointer transition-all duration-300',
                      isActive
                        ? 'border border-[#EE4FFB] bg-gradient-to-b from-[#EE4FFB]/20 to-[#EE4FFB]/10 text-[#EE4FFB]'
                        : 'text-[#6B6B6B]'
                    )}
                    onClick={() => {
                      if (idx > 1) return
                      setActiveAction(action)
                      setActiveTab(action.label.toLowerCase())
                    }}
                  >
                    {action.icon}
                    {action.label}
                  </div>
                )
              })}
            </div>

            {activeAction.label === 'Deposit' && (
              <div className="flex flex-col gap-0">
                {/* Step 1: Currency to Deposit */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 border border-[#EE4FFB]/30 rounded-md bg-gradient-to-b from-[#EE4FFB]/20 to-[#EE4FFB]/10 flex items-center justify-center text-neutral-200 font-bold text-sm">
                      1
                    </div>
                    <div className="w-[1px] h-full bg-[#515151] flex-1 min-h-[60px]"></div>
                  </div>
                  <div className="flex-1 px-2 pb-6">
                    <div className="flex flex-col gap-2 justify-start items-start">
                      <span className="text-neutral-400 text-[16px] uppercase">
                        Currency to Deposit
                      </span>
                      <Select
                        onValueChange={setCurrency}
                        value={currency}
                        modal={false}
                      >
                        <SelectTrigger className="w-full border border-[#FFFFFF]/10 bg-gradient-to-b from-[#FFFFFF]/-10 to-[#FFFFFF]/0 hover:bg-[#FFFFFF]/10 text-white max-w-[12rem]">
                          <div className="flex items-center justify-between w-full">
                            <SelectValue placeholder="Select currency" />
                            <span className="text-neutral-400 text-xs ml-2">
                              {`$ ${
                                Number(
                                  user?.depositWalletAddresses?.[
                                    currency as keyof typeof user.depositWalletAddresses
                                  ]?.availableAmount
                                )?.toFixed(4) || '0.0000'
                              }`}
                            </span>
                          </div>
                        </SelectTrigger>
                        <SelectContent className="border border-[#FFFFFF]/10 bg-[#080219] z-[999999]">
                          <SelectItem
                            value="evm"
                            className="text-white hover:bg-[#FFFFFF]/10 focus:bg-[#FFFFFF]/10"
                          >
                            <div className="flex items-center gap-2">
                              <div className="p-[4px] rounded-full bg-neutral-700 w-5 h-5 flex items-center justify-center">
                                <Image
                                  src="/images/crypto/eth-icon.svg"
                                  alt="EVM"
                                  width={20}
                                  height={20}
                                  className="w-full h-full"
                                />
                              </div>
                              <span>EVM</span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="solana"
                            className="text-white hover:bg-[#FFFFFF]/10 focus:bg-[#FFFFFF]/10"
                          >
                            <div className="flex items-center gap-2">
                              <div className="p-[4px] rounded-full bg-neutral-700 w-5 h-5 flex items-center justify-center">
                                <Image
                                  src="/images/crypto/solana-icon.svg"
                                  alt="SOLANA"
                                  width={20}
                                  height={20}
                                  className="w-full h-full"
                                />
                              </div>
                              <span>SOLANA</span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="tron"
                            className="text-white hover:bg-[#FFFFFF]/10 focus:bg-[#FFFFFF]/10"
                          >
                            <div className="flex items-center gap-2">
                              <div className="p-[4px] rounded-full bg-neutral-700 w-5 h-5 flex items-center justify-center">
                                <Image
                                  src="/images/crypto/tron-icon.svg"
                                  alt="TRON"
                                  width={20}
                                  height={20}
                                  className="w-full h-full"
                                />
                              </div>
                              <span>TRON</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Step 2: Select Network */}
                {/* <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 border border-[#EE4FFB]/30 rounded-md bg-gradient-to-b from-[#EE4FFB]/20 to-[#EE4FFB]/10 flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="w-[1px] h-full bg-[#515151] flex-1 min-h-[60px]"></div>
                  </div>
                  <div className="flex-1 px-2 pb-6">
                    <div className="flex flex-col gap-2 justify-start items-start">
                      <span className="text-neutral-300 text-[16px] uppercase">
                        Select Network
                      </span>
                      <Select
                        onValueChange={setNetwork}
                        value={network}
                        disabled={!currency}
                        modal={false}
                      >
                        <SelectTrigger className="w-full border border-[#FFFFFF]/10 bg-gradient-to-b from-[#FFFFFF]/-10 to-[#FFFFFF]/0 hover:bg-[#FFFFFF]/10 text-white">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="border border-[#FFFFFF]/10 bg-[#080219] z-[999999]">
                          {networks[currency as keyof typeof networks]?.map(
                            (net) => (
                              <SelectItem
                                key={net}
                                value={net}
                                className="text-white hover:bg-[#FFFFFF]/10 focus:bg-[#FFFFFF]/10"
                              >
                                {net}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div> */}

                {/* Step 3: Deposit Address */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 border border-[#EE4FFB]/30 rounded-md bg-gradient-to-b from-[#EE4FFB]/20 to-[#EE4FFB]/10 flex items-center justify-center text-neutral-200 font-bold text-sm">
                      2
                    </div>
                    <div className="w-[1px] h-full bg-[#515151] flex-1 min-h-[60px]"></div>
                  </div>
                  <div className="flex-1 px-2 pb-6">
                    <div className="flex flex-col gap-2 justify-start items-start">
                      <span className="text-neutral-400 text-[16px] uppercase">
                        Deposit Address
                      </span>
                      <div className="flex gap-2 w-full">
                        <div
                          className="cursor-pointer flex items-center justify-between gap-2 border border-[#FFFFFF]/10 bg-[#14101f] hover:bg-[#FFFFFF]/10 text-white text-sm p-3 px-3 rounded-md flex-1 font-mono text-xs"
                          onClick={handleCopyDepositAddress}
                        >
                          <span>
                            {user?.depositWalletAddresses?.[
                              currency as keyof typeof user.depositWalletAddresses
                            ]?.address || 'No address available'}
                          </span>
                          {copiedDeposit ? (
                            <div className="">
                              <Check className="h-4 w-4 text-green-500" />
                            </div>
                          ) : (
                            <div>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                              >
                                <path
                                  d="M4.82782 12.7405C3.39282 12.5626 2.51758 11.4342 2.51758 9.90284V7.63672"
                                  stroke="#A5A9C1"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M12.7373 4.79002C12.5253 3.42297 11.5409 2.5 10.0574 2.5H5.24522C3.56997 2.5 2.51758 3.6899 2.51758 5.37081"
                                  stroke="#A5A9C1"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M17.4827 14.632C17.4827 16.3121 16.4367 17.4988 14.7542 17.4988H9.94441C8.26271 17.4988 7.2168 16.3121 7.2168 14.632V10.0997C7.2168 8.41958 8.26837 7.23291 9.94441 7.23291H14.755C16.4367 7.23291 17.4827 8.41958 17.4827 10.0997V11.9281"
                                  stroke="#A5A9C1"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full mt-2">
                        <div className="border border-[#FFFFFF]/10 bg-[#14101f] hover:bg-[#FFFFFF]/10 text-white rounded-lg p-4 flex items-center justify-center min-w-[120px]">
                          {user?.depositWalletAddresses?.[
                            currency as keyof typeof user.depositWalletAddresses
                          ]?.address ? (
                            <canvas
                              ref={qrCanvasRef}
                              className="w-[100px] h-[100px]"
                            />
                          ) : (
                            <QrCode className="h-12 w-12 text-gray-600" />
                          )}
                        </div>
                        <p className="text-gray-400 text-xs max-w-[300px] flex-1">
                          Deposit to this address must be sent on{' '}
                          {getCurrencyDisplayName(currency)} network to be
                          accepted.{' '}
                          <span className="text-[#EE4FFB] font-semibold">
                            POWERBLOCKS does not process deposits of less than
                            10 USD
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Deposit Bonus (optional) */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 border border-[#EE4FFB]/30 rounded-md bg-gradient-to-b from-[#EE4FFB]/20 to-[#EE4FFB]/10 flex items-center justify-center text-neutral-200 font-bold text-sm">
                      3
                    </div>
                    <div className="w-[1px] h-full bg-[#515151] flex-1 min-h-[60px]"></div>
                  </div>
                  <div className="flex-1 px-2">
                    <div className="flex flex-col gap-3 justify-start items-start">
                      <span className="text-neutral-400 text-[16px] uppercase">
                        Deposit Bonus (optional)
                      </span>

                      <div className="flex flex-wrap gap-3 w-full">
                        {depositBonusOptions.map((option) => (
                          <div
                            key={option.value}
                            className={cn(
                              'flex flex-col items-center justify-center',
                              selectedBonus !== option.value && 'opacity-[0.5]'
                            )}
                          >
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setSelectedBonus(option.value)
                                setCustomBonusAmount('')
                              }}
                              className={cn(
                                'py-0.5 px-2 w-16 text-sm flex items-center justify-center gap-2 uppercase rounded-md text-white cursor-pointer transition-all duration-300',
                                selectedBonus === option.value
                                  ? 'border border-[#EE4FFB] bg-gradient-to-b from-[#EE4FFB]/20 to-[#EE4FFB]/10'
                                  : 'border border-[#EE4FFB] bg-gradient-to-b from-[#EE4FFB]/20 to-[#EE4FFB]/10'
                              )}
                            >
                              <span className="text-white text-sm">
                                ${option.amount}
                              </span>
                            </button>
                            <span className="text-white text-xs mt-1">
                              Get ${option.bonus}
                            </span>
                          </div>
                        ))}

                        {/* <button
                          type="button"
                          onClick={() => {
                            setSelectedBonus('custom')
                          }}
                          className={cn(
                            'flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-300 min-w-[120px]',
                            selectedBonus === 'custom'
                              ? 'border-[#EE4FFB] bg-gradient-to-r from-[#EE4FFB]/30 to-[#8D2F95]/30 shadow-[0_0_11.68px_2.34px_rgba(238,79,251,0.25)]'
                              : 'border-neutral-700 bg-neutral-900 hover:border-[#EE4FFB]/50'
                          )}
                        >
                          <span className="text-white font-bold text-sm">
                            Custom Amount
                          </span>
                          <span className="text-gray-400 text-xs mt-1">
                            Get $-
                          </span>
                        </button> */}
                      </div>
                      {selectedBonus === 'custom' && (
                        <div className="w-full mt-2">
                          <Input
                            type="number"
                            placeholder="Enter custom amount"
                            value={customBonusAmount}
                            onChange={(e) =>
                              setCustomBonusAmount(e.target.value)
                            }
                            className="bg-neutral-900 border-neutral-700 text-white"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeAction.label === 'Withdraw' && (
              <WithdrawForm setCurrency={setCurrency} />
            )}

            {/* {activeAction.label === 'Withdraw' && (
              <div className="flex flex-col gap-4">
                <div className="bg-neutral-800 rounded-lg p-4">
                  <div className="flex flex-col gap-2 justify-start items-start">
                    <span className="text-gray-400 text-xs uppercase">
                      Choose a currency to withdraw
                    </span>

                    <Select onValueChange={setCurrency} defaultValue={currency}>
                      <SelectTrigger
                        className="w-full dark:bg-neutral-900 hover:dark:bg-neutral-900"
                        defaultValue="evm"
                      >
                        <SelectValue placeholder="Select a timezone" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-900 active:bg-neutral-900">
                        <SelectItem value="evm">EVM</SelectItem>
                        <SelectItem value="solana">SOLANA</SelectItem>
                        <SelectItem value="tron">TRON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col gap-2 justify-start items-start">
                      <span className="text-gray-400 text-xs uppercase">
                        Choose a network *
                      </span>
                      <Select
                        onValueChange={handleChainChange}
                        value={selectedChainId.toString()}
                        defaultValue={selectedChainId.toString()}
                      >
                        <SelectTrigger
                          className={`w-full dark:bg-neutral-900 hover:dark:bg-neutral-900 ${
                            form.formState.errors.chainId
                              ? 'border-red-500'
                              : ''
                          }`}
                        >
                          <SelectValue placeholder="Select a network" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900">
                          {chains.map((chain) => (
                            <SelectItem
                              key={chain.id}
                              value={chain.id.toString()}
                            >
                              <div className="flex items-center gap-2">
                                {chain.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.chainId && (
                        <span className="text-red-500 text-xs">
                          Network is required
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 justify-start items-start">
                      <span className="text-gray-400 text-xs uppercase">
                        Choose a token *
                      </span>
                      <Select
                        onValueChange={handleTokenChange}
                        value={selectedToken}
                        disabled={!selectedChainId}
                      >
                        <SelectTrigger
                          className={`w-full dark:bg-neutral-900 hover:dark:bg-neutral-900 ${
                            form.formState.errors.tokenAddress
                              ? 'border-red-500'
                              : ''
                          }`}
                        >
                          <SelectValue placeholder="Select a token" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900">
                          {availableTokens.map((token) => (
                            <SelectItem
                              key={token.address}
                              value={token.address}
                            >
                              <div className="flex items-center gap-2">
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-1">
                                    <span className="font-medium">
                                      {token.symbol}
                                    </span>
                                    {token.isNative && (
                                      <span className="text-xs bg-blue-600 text-white px-1 py-0.5 rounded">
                                        Native
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.tokenAddress && (
                        <span className="text-red-500 text-xs">
                          Token is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-neutral-800 rounded-lg p-4">
                  <div className="flex flex-col gap-2 justify-start items-start">
                    <span className="text-gray-400 text-xs uppercase">
                      Withdrawal Details
                    </span>
                    <Form {...form}>
                      <form
                        onSubmit={onSubmit}
                        className="flex flex-col gap-2 w-full"
                      >
                        <FormField
                          control={form.control}
                          name="amount"
                          rules={{ required: 'Amount is required' }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Amount</FormLabel>
                              <FormControl>
                                <Input
                                  id="withdraw-amount"
                                  type="number"
                                  step="any"
                                  placeholder="0.1"
                                  className="dark:bg-neutral-900 border-gray-700 text-white pr-20 w-full"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address"
                          rules={{ required: 'Address is required' }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Wallet Address</FormLabel>
                              <FormControl>
                                <Input
                                  id="withdraw-address"
                                  type="text"
                                  placeholder="0x..."
                                  className="dark:bg-neutral-900 border-gray-700 text-white w-full"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          disabled={
                            !form.formState.isValid ||
                            form.formState.isSubmitting
                          }
                          className="w-full bg-[linear-gradient(to_right,_#6A2A97_0%,_#C753FD_53%,_#FA96FF_100%)] text-white font-semibold py-3"
                        >
                          Withdraw
                        </Button>
                      </form>
                    </Form>
                    <p className="text-gray-400 text-xs">
                      Over 10 USD will need admin approval.{' '}
                      <span className="text-[#6F6BFF]">
                        POWERBLOCKS does not process withdrawals of less than 5
                        USD
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )} */}
          </>
        </DialogContent>
      </Dialog>
    </>
  )
}
