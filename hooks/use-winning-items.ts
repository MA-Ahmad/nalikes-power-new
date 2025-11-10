import { useQuery } from '@tanstack/react-query'
import { mysteryBoxesApi, WinningItem } from '@/lib/api/mystery-boxes'

// React Query Hook for fetching winning items
export const useWinningItems = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['winning-items'],
    queryFn: () => mysteryBoxesApi.getWinningItems(),
    enabled,
    staleTime: 60000, // 1 minute
  })
}

