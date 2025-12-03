'use client'
import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// @ts-ignore
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useWithdrawMutation } from '@/hooks/use-transactions'
import toast from 'react-hot-toast'
import { WithdrawRequest } from '@/lib/api/transactions'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth'
import { authApi } from '@/lib/auth-api'
import countriesData from 'world-countries'
import * as Flags from 'country-flag-icons/react/3x2'

// Get all countries, sort alphabetically, and add "Other" option
const getCountriesList = () => {
  const countries = countriesData
    .map((country) => ({
      name: country.name.common,
      code: country.cca2, // ISO 3166-1 alpha-2 code
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  // Add "Other" option at the end
  countries.push({ name: 'Other', code: 'XX' })

  return countries
}

const countries = getCountriesList()

// Helper function to get flag component by country code
const getFlagComponent = (code: string) => {
  if (code === 'XX') return null // No flag for "Other"

  // Convert country code to component name (e.g., 'US' -> Flags.US)
  const FlagComponent = (Flags as any)[code]
  return FlagComponent || null
}

// Dummy token data - will be replaced with CoinGecko API later
const tokensByChain: Record<
  number,
  {
    address: string
    symbol: string
    name: string
    icon: string
    isNative?: boolean
  }[]
> = {
  84532: [
    // Base Sepolia
    {
      address: '0x0000000000000000000000000000000000000000', // Native ETH
      symbol: 'ETH',
      name: 'Ethereum',
      icon: '⚡',
      isNative: true,
    },
    {
      address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
      symbol: 'USDC',
      name: 'USD Coin',
      icon: '💵',
    },
    {
      address: '0x4200000000000000000000000000000000000006',
      symbol: 'WETH',
      name: 'Wrapped Ether',
      icon: '🔗',
    },
  ],
  11155111: [
    // Eth Sepolia
    {
      address: '0x0000000000000000000000000000000000000000', // Native ETH
      symbol: 'ETH',
      name: 'Ethereum',
      icon: '⚡',
      isNative: true,
    },
    {
      address: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
      symbol: 'WETH',
      name: 'Wrapped Ether',
      icon: '🔗',
    },
    {
      address: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
      symbol: 'LINK',
      name: 'ChainLink Token',
      icon: '🔗',
    },
  ],
}

const chains = [
  { id: 84532, name: 'Base Sepolia', currency: 'evm' },
  { id: 11155111, name: 'Ethereum Sepolia', currency: 'evm' },
]

export default function WithdrawForm({
  setCurrency,
}: {
  setCurrency: (currency: string) => void
}) {
  const { user, setUser, checkAuth } = useAuthStore()
  const [showProfileFields, setShowProfileFields] = useState(false)
  const [sendingVerification, setSendingVerification] = useState(false)
  const [rateLimitCooldown, setRateLimitCooldown] = useState<number | null>(
    null
  )

  // Check if user can withdraw (both verified and profile completed)
  const canWithdraw = user?.emailVerified && user?.profileCompleted
  const isEmailNotVerified = !user?.emailVerified
  const isProfileNotCompleted = !user?.profileCompleted
  const isEmailVerifiedButProfileNot =
    user?.emailVerified && !user?.profileCompleted

  // Refresh user data periodically to check if email was verified
  useEffect(() => {
    if (isEmailNotVerified) {
      const interval = setInterval(() => {
        checkAuth()
      }, 10000) // Check every 10 seconds

      return () => clearInterval(interval)
    }
  }, [isEmailNotVerified, checkAuth])

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      currency: 'evm',
      chainId: '84532',
      tokenAddress: '',
      amount: '',
      address: '',
      // Profile completion fields
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      zipCode: '',
      country: '',
      dateOfBirth: '',
    },
  })

  const { watch, setValue } = form
  const watchedChainId = watch('chainId')
  const watchedTokenAddress = watch('tokenAddress')
  const watchedCurrency = watch('currency')

  // Get available balance for selected currency
  const getAvailableBalance = () => {
    if (!user?.depositWalletAddresses || !watchedCurrency) {
      return 0
    }
    const wallet =
      user.depositWalletAddresses[
        watchedCurrency as keyof typeof user.depositWalletAddresses
      ]
    return wallet?.availableAmount || 0
  }

  const availableBalance = getAvailableBalance()
  const hasZeroBalance = Number(availableBalance) === 0

  const handleChainChange = (chainId: string) => {
    setValue('chainId', chainId)
    setValue('tokenAddress', '') // Reset token selection when chain changes
  }

  const availableTokens = watchedChainId
    ? tokensByChain[Number.parseInt(watchedChainId)] || []
    : []

  const withdrawMutation = useWithdrawMutation({
    onSuccess: (data) => {
      form.reset() // Reset form only when request is successful
    },
    onError: (error) => {
      console.error('Withdrawal failed:', error)
    },
  })

  const handleNext = () => {
    // Validate basic fields before showing profile fields
    const basicFieldsValid =
      form.watch('currency') &&
      form.watch('amount') &&
      form.watch('address') &&
      Number.parseFloat(form.watch('amount')) > 0

    if (!basicFieldsValid) {
      toast.error('Please fill in all withdrawal fields first')
      return
    }

    setShowProfileFields(true)
  }

  const handleVerifyEmail = async () => {
    if (rateLimitCooldown && rateLimitCooldown > 0) {
      toast.error(
        `Please wait ${Math.ceil(
          rateLimitCooldown / 60
        )} minutes before requesting another verification email.`
      )
      return
    }

    setSendingVerification(true)
    try {
      const response = await authApi.sendEmailVerification()
      toast.success(
        response.message || 'Verification email sent! Please check your inbox.'
      )

      // Start 5-minute cooldown timer
      setRateLimitCooldown(300) // 5 minutes in seconds
      const interval = setInterval(() => {
        setRateLimitCooldown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(interval)
            return null
          }
          return prev - 1
        })
      }, 1000)
    } catch (error: any) {
      console.error('Error sending verification email:', error)

      // Handle rate limiting (429)
      if (error?.response?.status === 429) {
        const errorMessage = error?.response?.data?.message || ''
        // toast.error(errorMessage)

        // Start 5-minute cooldown timer
        setRateLimitCooldown(300)
        const interval = setInterval(() => {
          setRateLimitCooldown((prev) => {
            if (prev === null || prev <= 1) {
              clearInterval(interval)
              return null
            }
            return prev - 1
          })
        }, 1000)
      } else {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          'Failed to send verification email. Please try again.'
        // toast.error(errorMessage)
      }
    } finally {
      setSendingVerification(false)
    }
  }

  const onSubmit = (data: any) => {
    const withdrawalData: any = {
      amount: Number.parseFloat(data.amount),
      address: data.address,
      chainId: 11155111,
      tokenAddress: '0x0000000000000000000000000000000000000000',
    }

    // If profile fields are shown, include profile data
    if (showProfileFields) {
      withdrawalData.profileData = {
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        address1: data.address1 || '',
        address2: data.address2 || '',
        city: data.city || '',
        zipCode: data.zipCode || '',
        country: data.country || '',
        dateOfBirth: data.dateOfBirth || '',
      }
    }

    console.log('Withdrawal data:', withdrawalData)
    console.log('Form data:', data)
    console.log('Profile data being sent:', withdrawalData.profileData)

    // ✅ Call mutation directly here
    withdrawMutation.mutate(withdrawalData, {
      onSuccess: () => {
        toast.success('Withdrawal request submitted successfully!')

        // If profile was completed, update user state
        if (isProfileNotCompleted && showProfileFields) {
          setUser({
            ...user!,
            profileCompleted: true,
          })
          setShowProfileFields(false)
        }

        form.reset()
      },
    })
  }

  console.log('Available balance:', availableBalance)
  console.log('Has zero balance:', hasZeroBalance)

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-0"
        >
          {/* Step 1: Choose Currency */}
          {!showProfileFields && (
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
                    Choose a currency to withdraw
                  </span>
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }: { field: any }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value)
                              setCurrency(value)
                            }}
                            value={field.value}
                            disabled={isEmailNotVerified}
                            modal={false}
                          >
                            <SelectTrigger className="w-full border border-[#FFFFFF]/10 bg-gradient-to-b from-[#FFFFFF]/-10 to-[#FFFFFF]/0 hover:bg-[#FFFFFF]/10 text-white max-w-[12rem]">
                              <div className="flex items-center justify-between w-full">
                                <SelectValue placeholder="Select a currency type" />
                                <span className="text-neutral-400 text-xs ml-2">
                                  {user?.depositWalletAddresses
                                    ? `$ ${
                                        Number(
                                          user.depositWalletAddresses[
                                            form.watch(
                                              'currency'
                                            ) as keyof typeof user.depositWalletAddresses
                                          ]?.availableAmount
                                        )?.toFixed(4) || '0.0000'
                                      }`
                                    : '$ 0.0000'}
                                </span>
                              </div>
                            </SelectTrigger>
                            <SelectContent className="border border-[#FFFFFF]/10 bg-[#080219] z-[999999]">
                              <SelectItem
                                value="evm"
                                className="text-white hover:bg-[#FFFFFF]/10 focus:bg-[#FFFFFF]/10"
                              >
                                EVM
                              </SelectItem>
                              <SelectItem
                                value="solana"
                                className="text-white hover:bg-[#FFFFFF]/10 focus:bg-[#FFFFFF]/10"
                              >
                                SOLANA
                              </SelectItem>
                              <SelectItem
                                value="tron"
                                className="text-white hover:bg-[#FFFFFF]/10 focus:bg-[#FFFFFF]/10"
                              >
                                TRON
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Choose Network */}
          {/* <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 border border-[#EE4FFB]/30 rounded-md bg-gradient-to-b from-[#EE4FFB]/20 to-[#EE4FFB]/10 flex items-center justify-center text-neutral-200 font-bold text-sm">
                2
              </div>
              <div className="w-[1px] h-full bg-[#515151] flex-1 min-h-[60px]"></div>
            </div>
            <div className="flex-1 px-2 pb-6">
              <div className="flex flex-col gap-2 justify-start items-start">
                <span className="text-neutral-400 text-[16px] uppercase">
                  Choose a network *
                </span>
                <FormField
                  control={form.control}
                  name="chainId"
                  rules={{ required: 'Network is required' }}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            handleChainChange(value)
                          }}
                          value={field.value}
                          disabled={
                            !form.watch('currency') ||
                            form.watch('currency') !== 'evm'
                          }
                          modal={false}
                        >
                          <SelectTrigger className="w-full border border-[#FFFFFF]/10 bg-gradient-to-b from-[#FFFFFF]/-10 to-[#FFFFFF]/0 hover:bg-[#FFFFFF]/10 text-white">
                            <SelectValue placeholder="Select a network" />
                          </SelectTrigger>
                          <SelectContent className="border border-[#FFFFFF]/10 bg-[#080219] z-[999999]">
                            {chains.map((chain) => (
                              <SelectItem
                                key={chain.id}
                                value={chain.id.toString()}
                                className="text-white hover:bg-[#FFFFFF]/10 focus:bg-[#FFFFFF]/10"
                              >
                                {chain.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div> */}

          {/* Step 3: Choose Token */}
          {/* <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 border border-[#EE4FFB]/30 rounded-md bg-gradient-to-b from-[#EE4FFB]/20 to-[#EE4FFB]/10 flex items-center justify-center text-neutral-200 font-bold text-sm">
                3
              </div>
              <div className="w-[1px] h-full bg-[#515151] flex-1 min-h-[60px]"></div>
            </div>
            <div className="flex-1 px-2 pb-6">
              <div className="flex flex-col gap-2 justify-start items-start">
                <span className="text-neutral-400 text-[16px] uppercase">
                  Choose a token *
                </span>
                <FormField
                  control={form.control}
                  name="tokenAddress"
                  rules={{ required: 'Token is required' }}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={
                            !form.watch('currency') ||
                            form.watch('currency') !== 'evm'
                          }
                          modal={false}
                        >
                          <SelectTrigger className="w-full border border-[#FFFFFF]/10 bg-gradient-to-b from-[#FFFFFF]/-10 to-[#FFFFFF]/0 hover:bg-[#FFFFFF]/10 text-white">
                            <SelectValue placeholder="Select a token" />
                          </SelectTrigger>
                          <SelectContent className="border border-[#FFFFFF]/10 bg-[#080219] z-[999999]">
                            {availableTokens.map((token) => (
                              <SelectItem
                                key={token.address}
                                value={token.address}
                                className="text-white hover:bg-[#FFFFFF]/10 focus:bg-[#FFFFFF]/10"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="flex flex-col">
                                    <div className="flex items-center gap-1">
                                      <span className="font-medium">
                                        {token.symbol}
                                      </span>
                                      {token.isNative && (
                                        <span className="text-xs bg-brand-pink text-white px-1 py-0.5 rounded">
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div> */}

          {/* Step 5: Amount */}
          {!showProfileFields && (
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
                    Amount
                  </span>
                  <FormField
                    control={form.control}
                    name="amount"
                    rules={{
                      required: 'Amount is required',
                      validate: (value: string) => {
                        const num = Number.parseFloat(value)
                        if (isNaN(num) || num <= 0) {
                          return 'Amount must be a valid positive number'
                        }
                        return true
                      },
                    }}
                    render={({ field }: { field: any }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            id="withdraw-amount"
                            type="number"
                            step="any"
                            placeholder="0.1"
                            disabled={isEmailNotVerified}
                            className="border border-[#FFFFFF]/10 bg-gradient-to-b from-[#FFFFFF]/-10 to-[#FFFFFF]/0 hover:bg-[#FFFFFF]/10 text-white w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Wallet Address */}
          {!showProfileFields && (
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 border border-[#EE4FFB]/30 rounded-md bg-gradient-to-b from-[#EE4FFB]/20 to-[#EE4FFB]/10 flex items-center justify-center text-neutral-200 font-bold text-sm">
                  3
                </div>
                <div className="w-[1px] h-full bg-[#515151] flex-1 min-h-[60px]"></div>
              </div>
              <div className="flex-1 px-2">
                <div className="flex flex-col gap-2 justify-start items-start">
                  <span className="text-neutral-400 text-[16px] uppercase">
                    Wallet Address
                  </span>
                  <FormField
                    control={form.control}
                    name="address"
                    rules={{
                      required: 'Wallet address is required',
                      validate: (value: string) => {
                        if (!value.startsWith('0x') || value.length !== 42) {
                          return 'Invalid wallet address format'
                        }
                        return true
                      },
                    }}
                    render={({ field }: { field: any }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            id="withdraw-address"
                            type="text"
                            placeholder="0x..."
                            disabled={isEmailNotVerified}
                            className="border border-[#FFFFFF]/10 bg-gradient-to-b from-[#FFFFFF]/-10 to-[#FFFFFF]/0 hover:bg-[#FFFFFF]/10 text-white w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Show withdraw button if both verified and profile completed */}
                  {canWithdraw && (
                    <Button
                      type="submit"
                      disabled={
                        !form.formState.isValid ||
                        form.formState.isSubmitting ||
                        withdrawMutation.isPending ||
                        hasZeroBalance
                      }
                      className={cn(
                        'w-full flex items-center justify-center gap-2 text-white font-semibold py-3 cursor-pointer mt-2 bg-gradient-to-b from-[#EE4FFB]/40 to-[#EE4FFB]/20 border border-brand-pink hover:bg-gradient-to-b from-[#EE4FFB]/40 to-[#EE4FFB]/20',
                        !form.formState.isValid ||
                          form.formState.isSubmitting ||
                          withdrawMutation.isPending ||
                          hasZeroBalance
                          ? 'opacity-50 cursor-not-allowed'
                          : 'text-white'
                      )}
                    >
                      {withdrawMutation.isPending && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                      <span>Withdraw</span>
                    </Button>
                  )}

                  {/* Show Verify Email button if email not verified */}
                  {isEmailNotVerified && (
                    <div className="w-full mt-2">
                      <Button
                        type="button"
                        onClick={handleVerifyEmail}
                        disabled={
                          sendingVerification ||
                          (rateLimitCooldown !== null && rateLimitCooldown > 0)
                        }
                        className={cn(
                          'w-full flex items-center justify-center gap-2 text-white font-semibold py-3 cursor-pointer bg-gradient-to-b from-[#EE4FFB]/40 to-[#EE4FFB]/20 border border-brand-pink hover:bg-gradient-to-b from-[#EE4FFB]/40 to-[#EE4FFB]/20',
                          (sendingVerification ||
                            (rateLimitCooldown !== null &&
                              rateLimitCooldown > 0)) &&
                            'opacity-50 cursor-not-allowed'
                        )}
                      >
                        {sendingVerification ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : rateLimitCooldown !== null &&
                          rateLimitCooldown > 0 ? (
                          <span>
                            Wait {Math.ceil(rateLimitCooldown / 60)}m{' '}
                            {rateLimitCooldown % 60}s
                          </span>
                        ) : (
                          <span>Verify Email Address</span>
                        )}
                      </Button>
                      {rateLimitCooldown !== null && rateLimitCooldown > 0 && (
                        <p className="text-yellow-400 text-xs mt-2 text-center">
                          You can request a new verification email in{' '}
                          {Math.ceil(rateLimitCooldown / 60)} minute(s)
                        </p>
                      )}
                      {!sendingVerification && rateLimitCooldown === null && (
                        <p className="text-gray-400 text-xs mt-2 text-center">
                          Check your email for the verification link. Link
                          expires in 24 hours.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Show Next button if email verified but profile not completed */}
                  {isEmailVerifiedButProfileNot && !showProfileFields && (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={
                        !form.watch('currency') ||
                        !form.watch('amount') ||
                        !form.watch('address') ||
                        Number.parseFloat(form.watch('amount') || '0') <= 0 ||
                        hasZeroBalance
                      }
                      className={cn(
                        'w-full flex items-center justify-center gap-2 text-white font-semibold py-3 cursor-pointer mt-2 bg-gradient-to-b from-[#EE4FFB]/40 to-[#EE4FFB]/20 border border-brand-pink hover:bg-gradient-to-b from-[#EE4FFB]/40 to-[#EE4FFB]/20',
                        !form.watch('currency') ||
                          !form.watch('amount') ||
                          !form.watch('address') ||
                          Number.parseFloat(form.watch('amount') || '0') <= 0 ||
                          hasZeroBalance
                          ? 'opacity-50 cursor-not-allowed'
                          : 'text-white'
                      )}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Profile Completion Fields - Step 4, 5, 6 */}
          {showProfileFields && isEmailVerifiedButProfileNot && (
            <>
              {/* Step 4: First Name & Last Name */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 border border-[#EE4FFB]/30 rounded-md bg-gradient-to-b from-[#EE4FFB]/20 to-[#EE4FFB]/10 flex items-center justify-center text-neutral-200 font-bold text-sm">
                    4
                  </div>
                  <div className="w-[1px] h-full bg-[#515151] flex-1 min-h-[60px]"></div>
                </div>
                <div className="flex-1 px-2 pb-6">
                  <div className="flex flex-col gap-2 justify-start items-start">
                    {/* <span className="text-neutral-400 text-[16px] uppercase">
                      First Name & Last Name
                    </span> */}
                    <div className="flex gap-2 w-full">
                      <FormField
                        control={form.control}
                        name="firstName"
                        rules={{ required: 'First name is required' }}
                        render={({ field }: { field: any }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-neutral-400 text-sm gap-[1px]">
                              First Name <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="First Name"
                                className="border border-[#FFFFFF]/10 bg-gradient-to-b from-[#FFFFFF]/-10 to-[#FFFFFF]/0 hover:bg-[#FFFFFF]/10 text-white w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        rules={{ required: 'Last name is required' }}
                        render={({ field }: { field: any }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-neutral-400 text-sm gap-[1px]">
                              Last Name <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Last Name"
                                className="border border-[#FFFFFF]/10 bg-gradient-to-b from-[#FFFFFF]/-10 to-[#FFFFFF]/0 hover:bg-[#FFFFFF]/10 text-white w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 5: Address */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 border border-[#EE4FFB]/30 rounded-md bg-gradient-to-b from-[#EE4FFB]/20 to-[#EE4FFB]/10 flex items-center justify-center text-neutral-200 font-bold text-sm">
                    5
                  </div>
                  <div className="w-[1px] h-full bg-[#515151] flex-1 min-h-[60px]"></div>
                </div>
                <div className="flex-1 px-2 pb-6">
                  <div className="flex flex-col gap-2 justify-start items-start">
                    {/* <span className="text-neutral-400 text-[16px] uppercase">
                      Address
                    </span> */}
                    <FormField
                      control={form.control}
                      name="address1"
                      rules={{ required: 'Address is required' }}
                      render={({ field }: { field: any }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-neutral-400 text-sm gap-[1px]">
                            Address 1 <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Address 1"
                              className="border border-[#FFFFFF]/10 bg-gradient-to-b from-[#FFFFFF]/-10 to-[#FFFFFF]/0 hover:bg-[#FFFFFF]/10 text-white w-full mb-2"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address2"
                      render={({ field }: { field: any }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-neutral-400 text-sm">
                            Address 2
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Address 2 (Optional)"
                              className="border border-[#FFFFFF]/10 bg-gradient-to-b from-[#FFFFFF]/-10 to-[#FFFFFF]/0 hover:bg-[#FFFFFF]/10 text-white w-full mb-2"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2 w-full">
                      <FormField
                        control={form.control}
                        name="city"
                        rules={{ required: 'City is required' }}
                        render={({ field }: { field: any }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-neutral-400 text-sm gap-[1px]">
                              City <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="City"
                                className="border border-[#FFFFFF]/10 bg-gradient-to-b from-[#FFFFFF]/-10 to-[#FFFFFF]/0 hover:bg-[#FFFFFF]/10 text-white w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        rules={{ required: 'Zip code is required' }}
                        render={({ field }: { field: any }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-neutral-400 text-sm gap-[1px]">
                              Zip Code <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Zip Code"
                                className="border border-[#FFFFFF]/10 bg-gradient-to-b from-[#FFFFFF]/-10 to-[#FFFFFF]/0 hover:bg-[#FFFFFF]/10 text-white w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="country"
                      rules={{ required: 'Country is required' }}
                      render={({ field }: { field: any }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-neutral-400 text-sm gap-[1px]">
                            Country <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              modal={false}
                            >
                              <SelectTrigger className="w-full border border-[#FFFFFF]/10 bg-gradient-to-b from-[#FFFFFF]/-10 to-[#FFFFFF]/0 hover:bg-[#FFFFFF]/10 text-white">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  {field.value ? (
                                    (() => {
                                      const selectedCountry = countries.find(
                                        (c) => c.name === field.value
                                      )
                                      if (selectedCountry) {
                                        const FlagComponent = getFlagComponent(
                                          selectedCountry.code
                                        )
                                        return (
                                          <>
                                            {FlagComponent && (
                                              <FlagComponent className="w-5 h-4 flex-shrink-0" />
                                            )}
                                            <span className="truncate">
                                              {selectedCountry.name}
                                            </span>
                                          </>
                                        )
                                      }
                                      return (
                                        <span className="truncate">
                                          {field.value}
                                        </span>
                                      )
                                    })()
                                  ) : (
                                    <span className="text-neutral-400">
                                      Select Country
                                    </span>
                                  )}
                                </div>
                              </SelectTrigger>
                              <SelectContent className="border border-[#FFFFFF]/10 bg-[#080219] z-[999999] max-h-[300px]">
                                {countries.map((country) => {
                                  const FlagComponent = getFlagComponent(
                                    country.code
                                  )
                                  return (
                                    <SelectItem
                                      key={country.name}
                                      value={country.name}
                                      className="text-white hover:bg-[#FFFFFF]/10 focus:bg-[#FFFFFF]/10"
                                    >
                                      <div className="flex items-center gap-2">
                                        {FlagComponent && (
                                          <FlagComponent className="w-5 h-4 flex-shrink-0" />
                                        )}
                                        <span>{country.name}</span>
                                      </div>
                                    </SelectItem>
                                  )
                                })}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Step 6: Date of Birth */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 border border-[#EE4FFB]/30 rounded-md bg-gradient-to-b from-[#EE4FFB]/20 to-[#EE4FFB]/10 flex items-center justify-center text-neutral-200 font-bold text-sm">
                    6
                  </div>
                </div>
                <div className="flex-1 px-2">
                  <div className="flex flex-col gap-2 justify-start items-start">
                    {/* <span className="text-neutral-400 text-[16px] uppercase">
                      Date of Birth
                    </span> */}
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      rules={{ required: 'Date of birth is required' }}
                      render={({ field }: { field: any }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-neutral-400 text-sm gap-[1px]">
                            Date of Birth{' '}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              className="border border-[#FFFFFF]/10 bg-gradient-to-b from-[#FFFFFF]/-10 to-[#FFFFFF]/0 hover:bg-[#FFFFFF]/10 text-white w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Withdraw button at the bottom of profile fields */}
                    <Button
                      type="submit"
                      disabled={
                        !form.formState.isValid ||
                        form.formState.isSubmitting ||
                        withdrawMutation.isPending ||
                        hasZeroBalance
                      }
                      className={cn(
                        'w-full flex items-center justify-center gap-2 text-white font-semibold py-3 cursor-pointer mt-2 bg-gradient-to-b from-[#EE4FFB]/40 to-[#EE4FFB]/20 border border-brand-pink hover:bg-gradient-to-b from-[#EE4FFB]/40 to-[#EE4FFB]/20',
                        !form.formState.isValid ||
                          form.formState.isSubmitting ||
                          withdrawMutation.isPending ||
                          hasZeroBalance
                          ? 'opacity-50 cursor-not-allowed'
                          : 'text-white'
                      )}
                    >
                      {withdrawMutation.isPending && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                      <span>Withdraw</span>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  )
}
