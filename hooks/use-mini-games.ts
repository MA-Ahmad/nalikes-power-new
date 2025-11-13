import { useQuery } from '@tanstack/react-query'
import { miniGameApi, Game } from '@/lib/api/mini-game'

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
