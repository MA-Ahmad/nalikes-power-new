'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Wallet, ExternalLink, Copy, LogOut, Loader2 } from 'lucide-react'
import { useWallet } from '@/hooks/use-wallet'
import { getNativeTokenSymbol } from '@/hooks/use-token-balance'
import { toast } from 'react-hot-toast'

interface ConnectWalletButtonProps {
  className?: string
  size?: 'sm' | 'default' | 'lg'
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}

export function ConnectWalletButton({
  className,
  size = 'default',
  variant = 'default',
}: ConnectWalletButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const {
    isConnected,
    address,
    truncatedAddress,
    formattedBalance,
    isLoadingBalance,
    connectWallet,
    disconnectWallet,
    openAccountModal,
    chainId,
  } = useWallet()

  const copyAddress = async () => {
    if (!address) return

    try {
      await navigator.clipboard.writeText(address)
      toast.success('Address copied to clipboard')
    } catch (error) {
      console.error('Failed to copy address:', error)
      toast.error('Failed to copy address')
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnectWallet()
      setIsDropdownOpen(false)
      toast.success('Wallet disconnected')
    } catch (error) {
      console.error('Failed to disconnect:', error)
      toast.error('Failed to disconnect wallet')
    }
  }

  const getNetworkName = (chainId: string | number | undefined) => {
    const id = typeof chainId === 'string' ? parseInt(chainId) : chainId
    switch (id) {
      case 1:
        return 'Ethereum'
      case 137:
        return 'Polygon'
      case 42161:
        return 'Arbitrum'
      case 10:
        return 'Optimism'
      case 8453:
        return 'Base'
      case 11155111:
        return 'Sepolia'
      default:
        return 'Unknown'
    }
  }

  if (!isConnected) {
    return (
      <Button
        onClick={connectWallet}
        className={className}
        size={size}
        variant={variant}
      >
        <Wallet className="h-4 w-4 mr-2" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`${className} flex items-center gap-2`}
          size={size}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="hidden sm:inline">{truncatedAddress}</span>
          <span className="sm:hidden">
            <Wallet className="h-4 w-4" />
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Wallet Connected</p>
            <p className="text-xs leading-none text-muted-foreground">
              {truncatedAddress}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="px-2 py-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Balance:</span>
            {isLoadingBalance ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span className="text-sm font-medium">
                {parseFloat(formattedBalance).toFixed(4)}{' '}
                {getNativeTokenSymbol(
                  typeof chainId === 'string' ? parseInt(chainId) : chainId || 1
                )}
              </span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Network:</span>
            <Badge variant="secondary" className="text-xs">
              {getNetworkName(chainId)}
            </Badge>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={copyAddress}>
          <Copy className="h-4 w-4 mr-2" />
          Copy Address
        </DropdownMenuItem>

        <DropdownMenuItem onClick={openAccountModal}>
          <ExternalLink className="h-4 w-4 mr-2" />
          Manage Account
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleDisconnect}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
