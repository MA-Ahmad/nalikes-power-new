import { api } from '@/lib/axios'

export interface WalletConnectionDto {
  walletAddress: string
}

export interface WalletDisconnectResponse {
  success: boolean
  message: string
}

export interface UserWalletInfo {
  id: string
  username: string
  email: string
  walletConnected: boolean
  currentWalletAddress?: string
  createdAt: string
  lastLogin?: string
}

export const walletApi = {
  // Connect wallet to authenticated user
  connectWallet: async (walletAddress: string): Promise<UserWalletInfo> => {
    const response = await api.post<UserWalletInfo>('/auth/connect-wallet', {
      walletAddress,
    })
    return response.data
  },

  // Get current user wallet info
  getWalletInfo: async (): Promise<UserWalletInfo> => {
    const response = await api.get<UserWalletInfo>('/auth/wallet-info')
    return response.data
  },
}
