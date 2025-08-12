'use client'

import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, Plus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { walletApi, type UserBalanceEntry } from '@/lib/api/wallet'

// Simple icon mapping by currency symbol; extend as needed
const currencyIcon: Record<string, string> = {
  USD: '💵',
  USDC: '🪙',
  ETH: '⟠',
  MATIC: '⬟',
  ARB: '◆',
  OP: '🔴',
  BASE: '🔵',
}

const formatTriggerBalance = (value: number): string => {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 5,
    useGrouping: false,
  })
}

const formatContentBalance = (value: number): string => {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 8,
    useGrouping: false,
  })
}

export function ChainBalanceSelector() {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [balances, setBalances] = useState<UserBalanceEntry[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    walletApi
      .getBalances()
      .then((data) => {
        if (!mounted) return
        const defaultBalances: UserBalanceEntry[] = [
          { currency: 'ETH', balance: 0 },
        ]
        const dataToUse =
          Array.isArray(data) && data.length > 0 ? data : defaultBalances
        setBalances(dataToUse)
        if (dataToUse.length && !selectedCurrency) {
          setSelectedCurrency(dataToUse[0].currency)
        }
      })
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  const current = useMemo(
    () => balances.find((b) => b.currency === selectedCurrency),
    [balances, selectedCurrency]
  )

  return (
    <div className="flex items-center bg-gray-800 rounded-md overflow-hidden">
      {/* Balance Display with Dropdown - now includes the chevron icon */}
      <Select
        value={selectedCurrency}
        onValueChange={setSelectedCurrency}
        onOpenChange={setIsOpen}
      >
        <SelectTrigger className="flex-1 bg-transparent border-none text-white focus:outline-none foucs:ring-0 focus-visible:ring-0 active:outline-none active:ring-0 active:ring-offset-0 text-xl font-semibold px-4 py-4 h-auto focus:ring-0 focus:ring-offset-0 [&>svg]:hidden">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 !text-[16px]">
              <span className="text-lg">
                {current ? currencyIcon[current.currency] ?? '🪙' : '🪙'}
              </span>
              <SelectValue className="!text-[16px]">
                {loading
                  ? 'Loading...'
                  : current
                  ? `${formatTriggerBalance(current.balance)} ${
                      current.currency
                    }`
                  : 'No balances'}
              </SelectValue>
            </div>
            <div className="text-gray-400 ml-2">
              {isOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          {balances.map((entry) => (
            <SelectItem
              key={entry.currency}
              value={entry.currency}
              className="text-white hover:bg-gray-700 focus:bg-gray-700"
              showCheck={false}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">
                  {currencyIcon[entry.currency] ?? '🪙'}
                </span>
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {formatContentBalance(entry.balance)}
                  </span>
                  <span className="text-sm text-gray-400">
                    {entry.currency}
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Plus Button */}
      <Button
        size="icon"
        className="bg-purple-600 hover:bg-purple-700 text-white rounded-md h-8 w-8 flex-shrink-0"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  )
}
