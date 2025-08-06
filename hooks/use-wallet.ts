'use client'

import {
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
  useDisconnect,
  useAppKitNetwork,
} from '@reown/appkit/react'
import { useBalance, useSignMessage } from 'wagmi'
import { formatEther } from 'viem'
import type { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

export function useWallet() {
  const { open, close } = useAppKit()
  const { address, isConnected, caipAddress, status } = useAppKitAccount()
  const { walletProvider } = useAppKitProvider<WagmiAdapter>('eip155')
  const { disconnect } = useDisconnect()
  const { chainId } = useAppKitNetwork()

  // Get balance for connected address
  const { data: balance, isLoading: isLoadingBalance } = useBalance({
    address: address as `0x${string}` | undefined,
    query: {
      enabled: !!address && isConnected,
    },
  })

  // Format balance for display
  const formattedBalance = balance ? formatEther(balance.value) : '0'

  // Truncate address for display
  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : ''

  // Connect wallet function
  const connectWallet = async () => {
    try {
      await open({
        view: 'Connect',
      })
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      throw error
    }
  }

  // Disconnect wallet function
  const disconnectWallet = async () => {
    try {
      await disconnect()
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
      throw error
    }
  }

  // Open account modal
  const openAccountModal = async () => {
    try {
      await open({ view: 'Account' })
    } catch (error) {
      console.error('Failed to open account modal:', error)
      throw error
    }
  }

  // Sign message hook from wagmi
  const { signMessage: wagmiSignMessage } = useSignMessage()

  // Sign message function
  const signMessage = async (message: string) => {
    if (!address) {
      throw new Error('Wallet not connected')
    }

    try {
      const signature = await wagmiSignMessage({ message })
      return signature
    } catch (error) {
      console.error('Failed to sign message:', error)
      throw error
    }
  }

  return {
    // Connection state
    isConnected,
    address,
    caipAddress,
    status,
    chainId,

    // Balance
    balance,
    formattedBalance,
    isLoadingBalance,

    // Display helpers
    truncatedAddress,

    // Actions
    connectWallet,
    disconnectWallet,
    openAccountModal,
    signMessage,

    // Provider
    walletProvider,
  }
}
