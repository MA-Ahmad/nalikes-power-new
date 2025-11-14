import { useMutation, useQuery } from '@tanstack/react-query'
import { miniGameApi, Game, EnterGameRequest } from '@/lib/api/mini-game'

// React Query Hook for fetching games list
// Cache for 24 hours (24 * 60 * 60 * 1000 = 86400000 ms)
export const useMiniGames = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['mini-games'],
    queryFn: () => miniGameApi.getGamesList(),
    enabled,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 24 * 60 * 60 * 1000, // 24 hours (formerly cacheTime)
  })
}

// React Query Hook for entering a game
export const useEnterGame = (options?: {
  onSuccess?: (gameUrl: string) => void
  onError?: (error: Error) => void
}) => {
  return useMutation({
    mutationFn: async (data: EnterGameRequest) => {
      return await miniGameApi.enterGame(data)
    },
    onSuccess: (gameUrl) => {
      options?.onSuccess?.(gameUrl)
    },
    onError: (error) => {
      options?.onError?.(error)
    },
  })
}
