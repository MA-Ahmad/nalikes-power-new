import { useQuery } from '@tanstack/react-query'
import { mysteryBoxesApi, MysteryBox } from '@/lib/api/mystery-boxes'

export const useMysteryBoxes = () => {
  return useQuery({
    queryKey: ['mystery-boxes'],
    queryFn: async () => {
      const data = await mysteryBoxesApi.getAll()
      // Backend returns array of arrays, flatten it
      const allBoxes = data.flat()
      return allBoxes as MysteryBox[]
    },
    staleTime: 60 * 1000, // 1 minute
  })
}
