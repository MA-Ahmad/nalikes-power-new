import { useQueryClient } from '@tanstack/react-query'

/**
 * Hook to manage media images cache invalidation
 * Use this hook to invalidate cache when images are uploaded/updated from admin panel
 *
 * @example
 * // In an admin panel component after uploading a new hero image:
 * function AdminImageUpload() {
 *   const { invalidateHeroImages } = useMediaImagesCache()
 *
 *   const handleUpload = async (file: File) => {
 *     await uploadImage(file)
 *     invalidateHeroImages() // This will refresh the hero carousel
 *   }
 * }
 *
 * @example
 * // Invalidate all media images after bulk update:
 * function AdminBulkUpdate() {
 *   const { invalidateAllMediaImages } = useMediaImagesCache()
 *
 *   const handleBulkUpdate = async () => {
 *     await bulkUpdateImages()
 *     invalidateAllMediaImages()
 *   }
 * }
 */
export function useMediaImagesCache() {
  const queryClient = useQueryClient()

  /**
   * Invalidate all media images cache
   * Call this after uploading/updating/deleting images from admin panel
   */
  const invalidateAllMediaImages = () => {
    queryClient.invalidateQueries({ queryKey: ['media-images'] })
  }

  /**
   * Invalidate specific media image type cache (e.g., 'HERO', 'AUTH')
   * @param type - The media image type to invalidate
   */
  const invalidateMediaImagesByType = (type: string) => {
    queryClient.invalidateQueries({
      queryKey: ['media-images', type.toUpperCase()],
    })
  }

  /**
   * Invalidate hero images cache specifically
   */
  const invalidateHeroImages = () => {
    invalidateMediaImagesByType('HERO')
  }

  /**
   * Invalidate auth images cache specifically
   */
  const invalidateAuthImages = () => {
    invalidateMediaImagesByType('AUTH')
  }

  /**
   * Refetch all media images immediately
   */
  const refetchAllMediaImages = async () => {
    await queryClient.refetchQueries({ queryKey: ['media-images'] })
  }

  /**
   * Refetch specific media image type immediately
   * @param type - The media image type to refetch
   */
  const refetchMediaImagesByType = async (type: string) => {
    await queryClient.refetchQueries({
      queryKey: ['media-images', type.toUpperCase()],
    })
  }

  return {
    invalidateAllMediaImages,
    invalidateMediaImagesByType,
    invalidateHeroImages,
    invalidateAuthImages,
    refetchAllMediaImages,
    refetchMediaImagesByType,
  }
}
