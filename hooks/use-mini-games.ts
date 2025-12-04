import { useMutation, useQuery } from '@tanstack/react-query'
import { miniGameApi, Game, EnterGameRequest } from '@/lib/api/mini-game'

// Cache duration: 48 hours in milliseconds
const CACHE_DURATION = 48 * 60 * 60 * 1000 // 172800000 ms

// React Query Hook for fetching games list
// Cache for 48 hours
export const useMiniGames = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['mini-games'],
    queryFn: () => miniGameApi.getGamesList(),
    enabled,
    staleTime: CACHE_DURATION, // Data stays fresh for 48 hours
    gcTime: CACHE_DURATION, // Keep in cache for 48 hours (React Query v5)
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: false, // Don't refetch on mount if data is fresh
    refetchOnReconnect: false, // Don't refetch on reconnect if data is fresh
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
