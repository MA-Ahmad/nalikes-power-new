'use client'

import * as React from 'react'
import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
  type CarouselApi,
} from '@/components/ui/carousel'
import { authApi } from '@/lib/auth-api'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

// Fallback images if API fails or returns empty
const fallbackImages: Array<{
  id: string
  image: string
  title: string
  description: string
  orderIndex: number
  isActive: boolean
}> = [
  {
    id: '1',
    image: '/images/modal-hero.png',
    title: 'Powerblocks Hero 1',
    description: '',
    orderIndex: 0,
    isActive: true,
  },
  {
    id: '2',
    image: '/images/hero2.png',
    title: 'Powerblocks Hero 2',
    description: '',
    orderIndex: 1,
    isActive: true,
  },
]

// Custom vertical controls component for desktop (arrows + dots)
function CarouselVerticalControls() {
  const { api, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!api) return
      api.scrollTo(index)
      // Reset autoplay after manual navigation
      const autoplay = api.plugins()?.autoplay
      if (autoplay) {
        autoplay.reset()
      }
    },
    [api]
  )

  const onInit = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setScrollSnaps(api.scrollSnapList())
  }, [])

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  React.useEffect(() => {
    if (!api) return

    onInit(api)
    onSelect(api)
    api.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)

    return () => {
      api.off('reInit', onInit).off('reInit', onSelect).off('select', onSelect)
    }
  }, [api, onInit, onSelect])

  if (scrollSnaps.length <= 1) return null

  return (
    <div className="flex flex-col items-center gap-2 absolute right-4 top-1/2 -translate-y-1/2 z-10">
      {/* Top arrow */}
      <button
        type="button"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="size-8 rounded-full border border-white/20 bg-black/50 hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center rotate-90 text-white"
        aria-label="Previous slide"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>

      {/* Dots */}
      <div className="flex flex-col gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onDotButtonClick(index)}
            className={cn(
              'h-2 w-2 rounded-full transition-all',
              selectedIndex === index
                ? 'bg-white h-6'
                : 'bg-white/50 hover:bg-white/75'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom arrow */}
      <button
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="size-8 rounded-full border border-white/20 bg-black/50 hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center rotate-90 text-white"
        aria-label="Next slide"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}

export function HeroCarousel() {
  const isMobile = useIsMobile()
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, playOnInit: true })
  )

  // Fetch images from backend with type 'hero' - only shows hero type images
  const {
    data: images = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['media-images', 'HERO'],
    queryFn: () => authApi.getMediaImages('HERO'),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  })

  // Filter images by type 'HERO' (client-side filtering as backup)
  const filteredImages = images.filter(
    (img) => img.type?.toUpperCase() === 'HERO' || !img.type // Include if type is HERO or undefined (for backward compatibility)
  )

  const displayImages =
    filteredImages.length > 0 ? filteredImages : fallbackImages

  // Sort by orderIndex
  const sortedImages = [...displayImages].sort((a, b) => {
    return a.orderIndex - b.orderIndex
  })

  if (isLoading) {
    return (
      <div className="w-full h-[400px] sm:h-[600px] flex items-center justify-center">
        <div className="text-white">Loading images...</div>
      </div>
    )
  }

  if (sortedImages.length === 0) {
    return null
  }

  // Mobile layout: horizontal carousel with bottom dots
  if (isMobile) {
    return (
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
          align: 'start',
        }}
      >
        <CarouselContent>
          {sortedImages.map((image, index) => (
            <CarouselItem key={image.id || index} className="pl-0">
              <div className="relative w-full h-[500px] sm:h-[500px]">
                <Image
                  src={image.image}
                  //   src="/images/home/hero.png"
                  alt={image.title || image.description || 'Powerblocks Hero'}
                  width={1920}
                  height={600}
                  className="w-full h-[500px] sm:h-[500px] object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    )
  }

  // Desktop layout: vertical carousel with images on right, vertical dots on right, arrows top/bottom
  return (
    <div className="relative w-full h-[800px]">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        orientation="vertical"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
          align: 'start',
          axis: 'y',
        }}
      >
        <CarouselContent className="h-[800px] -mt-0">
          {sortedImages.map((image, index) => (
            <CarouselItem key={image.id || index} className="pt-0">
              <div className="relative w-full h-[800px]">
                <Image
                  src={image.image}
                  //   src="/images/home/hero.png"
                  alt={image.title || image.description || 'Powerblocks Hero'}
                  width={1920}
                  height={600}
                  className="w-full h-[800px] object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Vertical controls on right side: top arrow, dots, bottom arrow */}
        <CarouselVerticalControls />
      </Carousel>
    </div>
  )
}
