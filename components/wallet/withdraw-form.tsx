'use client'
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
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useWithdrawMutation } from '@/hooks/use-transactions'
import toast from 'react-hot-toast'
import { WithdrawRequest } from '@/lib/api/transactions'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth'

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
  const { user } = useAuthStore()

  // Check if user can withdraw
  const canWithdraw = user?.emailVerified && user?.profileCompleted
  const isEmailNotVerified = !user?.emailVerified
  const isProfileNotCompleted = !user?.profileCompleted

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      currency: 'evm',
      chainId: '84532',
      tokenAddress: '',
      amount: '',
      address: '',
    },
  })

  const { watch, setValue } = form
  const watchedChainId = watch('chainId')
  const watchedTokenAddress = watch('tokenAddress')

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

  const onSubmit = (data: any) => {
    const withdrawalData = {
      amount: Number.parseFloat(data.amount),
      address: data.address,
      // chainId: Number.parseInt(data.chainId),
      // tokenAddress: data.tokenAddress,
      chainId: 11155111,
      tokenAddress: '0x0000000000000000000000000000000000000000',
    }

    console.log('Withdrawal data:', withdrawalData)

    // ✅ Call mutation directly here
    withdrawMutation.mutate(withdrawalData, {
      onSuccess: () => {
        toast.success('Withdrawal request submitted successfully!')
      },
    })
  }

  return (
    <div className="">
      {/* Show warning messages if email is not verified or profile is not completed */}
      {(isEmailNotVerified || isProfileNotCompleted) && (
        <div className="mb-6 p-4 border border-yellow-500/50 bg-yellow-500/10 rounded-lg">
          <div className="flex flex-col gap-2">
            {isEmailNotVerified && (
              <p className="text-yellow-400 text-sm">
                ⚠️ Please verify your email address to enable withdrawals.
              </p>
            )}
            {isProfileNotCompleted && (
              <p className="text-yellow-400 text-sm">
                ⚠️ Please complete your profile to enable withdrawals.
              </p>
            )}
          </div>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-0"
        >
          {/* Step 1: Choose Currency */}
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
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            setCurrency(value)
                          }}
                          value={field.value}
                          disabled={!canWithdraw}
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
                    validate: (value) => {
                      const num = Number.parseFloat(value)
                      if (isNaN(num) || num <= 0) {
                        return 'Amount must be a valid positive number'
                      }
                      return true
                    },
                  }}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          id="withdraw-amount"
                          type="number"
                          step="any"
                          placeholder="0.1"
                          disabled={!canWithdraw}
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

          {/* Step 6: Wallet Address */}
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
                    validate: (value) => {
                      if (!value.startsWith('0x') || value.length !== 42) {
                        return 'Invalid wallet address format'
                      }
                      return true
                    },
                  }}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          id="withdraw-address"
                          type="text"
                          placeholder="0x..."
                          disabled={!canWithdraw}
                          className="border border-[#FFFFFF]/10 bg-gradient-to-b from-[#FFFFFF]/-10 to-[#FFFFFF]/0 hover:bg-[#FFFFFF]/10 text-white w-full disabled:opacity-50 disabled:cursor-not-allowed"
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
                    !canWithdraw ||
                    !form.formState.isValid ||
                    form.formState.isSubmitting ||
                    withdrawMutation.isPending
                  }
                  className={cn(
                    'w-full flex items-center justify-center gap-2 text-white font-semibold py-3 cursor-pointer mt-2 bg-gradient-to-b from-[#EE4FFB]/40 to-[#EE4FFB]/20 border border-brand-pink hover:bg-gradient-to-b from-[#EE4FFB]/40 to-[#EE4FFB]/20',
                    !canWithdraw ||
                      !form.formState.isValid ||
                      form.formState.isSubmitting ||
                      withdrawMutation.isPending
                      ? 'opacity-50 cursor-not-allowed'
                      : 'text-white'
                  )}
                >
                  {withdrawMutation.isPending && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  <span>
                    {!canWithdraw
                      ? 'Complete Profile & Verify Email to Withdraw'
                      : 'Withdraw'}
                  </span>
                </Button>
                {/* <p className="text-gray-400 text-xs mt-2">
                  Over 10 USD will need admin approval.{' '}
                  <span className="text-[#EE4FFB] font-semibold">
                    POWERBLOCKS does not process withdrawals of less than 5 USD
                  </span>
                </p> */}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
