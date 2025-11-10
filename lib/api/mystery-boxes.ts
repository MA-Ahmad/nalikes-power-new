import { api } from '@/lib/axios'

export interface MysteryBox {
  id: string
  image: string
  title: string
  description: string
  amount: string
  off?: string
  type: 'insane' | 'mad'
  createdAt?: string
  updatedAt?: string
}

export interface ClaimRewardResponse {
  success: boolean
  userMysteryItem: any
  entryFee: number
  reward: number
  message: string
}

export interface WinningItem {
  title: string
  image: string
  amount: number
}

export const mysteryBoxesApi = {
  getAll: async (): Promise<MysteryBox[][]> => {
    const response = await api.get<MysteryBox[][]>('/mystery-boxes')
    return response.data
  },
  claimReward: async (itemId: string): Promise<ClaimRewardResponse> => {
    const response = await api.post<ClaimRewardResponse>(
      `/mystery-boxes/${itemId}/claim`
    )
    return response.data
  },
  getWinningItems: async (): Promise<WinningItem[]> => {
    const response = await api.get<WinningItem[]>(
      '/mystery-boxes/winning-items'
    )
    return response.data
  },
}
