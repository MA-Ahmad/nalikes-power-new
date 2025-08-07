'use client'

import {
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
  useDisconnect,
  useAppKitNetwork,
} from '@reown/appkit/react'
import { useBalance, useSignMessage, useSendTransaction } from 'wagmi'
import { formatEther, parseEther } from 'viem'
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
  const { signMessageAsync } = useSignMessage()

  // Send transaction hook from wagmi
  const { sendTransactionAsync } = useSendTransaction()

  // Sign message function (first popup)
  const signMessage = async (message: string) => {
    if (!address) {
      throw new Error('Wallet not connected')
    }

    try {
      const signature = await signMessageAsync({ message })
      return signature
    } catch (error) {
      console.error('Failed to sign message:', error)
      throw error
    }
  }

  // Send transaction function (second popup - like your image)
  const sendTransaction = async (to: string, amount: string) => {
    if (!address) {
      throw new Error('Wallet not connected')
    }

    try {
      const txHash = await sendTransactionAsync({
        to: to as `0x${string}`,
        value: parseEther(amount),
      })
      return txHash
    } catch (error) {
      console.error('Failed to send transaction:', error)
      throw error
    }
  }

  // Combined sign message and send transaction (proper two-popup flow)
  const signAndSendTransaction = async (
    message: string,
    to: string,
    amount: string
  ) => {
    if (!address) {
      throw new Error('Wallet not connected')
    }

    try {
      // First popup: Sign message for verification
      const signature = await signMessage(message)

      // Second popup: Send transaction (like your image)
      const txHash = await sendTransaction(to, amount)

      return { signature, txHash }
    } catch (error) {
      console.error('Failed to sign and send transaction:', error)
      throw error
    }
  }

  // Separate functions for better control (new)
  const signMessageOnly = async (message: string) => {
    return await signMessage(message)
  }

  const sendTransactionOnly = async (to: string, amount: string) => {
    return await sendTransaction(to, amount)
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
    sendTransaction,
    signAndSendTransaction,
    signMessageOnly,
    sendTransactionOnly,

    // Provider
    walletProvider,
  }
}
