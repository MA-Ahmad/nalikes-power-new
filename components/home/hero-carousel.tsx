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
    <div className="flex flex-col items-center gap-2 absolute right-4 top-1/2 -translate-y-1/2 z-10 w-[48px] min-h-[144px]">
      <svg
        // width="48"
        // height="144"
        viewBox="0 0 48 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <foreignObject x="-70" y="-70" width="187.999" height="284">
          <div
            // @ts-ignore
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              backdropFilter: 'blur(35px)',
              clipPath: 'url(#bgblur_0_5045_15476_clip_path)',
              height: '100%',
              width: '100%',
            }}
          ></div>
        </foreignObject>
        <g data-figma-bg-blur-radius="70">
          <path
            d="M6.24167 1.75736L1.75725 6.24178C0.631518 7.36751 -0.000665172 8.89449 -0.000110956 10.4865L0.0442798 138.002C0.0454331 141.315 2.73139 144 6.04429 144H37.5137C39.105 144 40.6312 143.368 41.7564 142.243L46.2417 137.757C47.3669 136.632 47.999 135.106 47.999 133.515V6C47.999 2.68629 45.3127 0 41.999 0H10.4843C8.89301 0 7.36688 0.632139 6.24167 1.75736Z"
            fill="#0C0A12"
          />
          <path
            d="M10.4844 0.5H41.999C45.0366 0.5 47.499 2.96243 47.499 6V133.515C47.499 134.973 46.9191 136.372 45.8877 137.403L41.4023 141.889C40.3709 142.92 38.9723 143.5 37.5137 143.5H6.04395C3.00729 143.5 0.545022 141.039 0.543945 138.002L0.5 10.4863C0.499495 9.02717 1.07869 7.62758 2.11035 6.5957L6.5957 2.11133C7.62715 1.0799 9.0257 0.5 10.4844 0.5Z"
            stroke="white"
            stroke-opacity="0.1"
          />
        </g>
        <defs>
          <clipPath
            id="bgblur_0_5045_15476_clip_path"
            transform="translate(70 70)"
          >
            <path d="M6.24167 1.75736L1.75725 6.24178C0.631518 7.36751 -0.000665172 8.89449 -0.000110956 10.4865L0.0442798 138.002C0.0454331 141.315 2.73139 144 6.04429 144H37.5137C39.105 144 40.6312 143.368 41.7564 142.243L46.2417 137.757C47.3669 136.632 47.999 135.106 47.999 133.515V6C47.999 2.68629 45.3127 0 41.999 0H10.4843C8.89301 0 7.36688 0.632139 6.24167 1.75736Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="w-full h-full relative flex flex-col items-center justify-between min-h-[144px] py-2">
        {/* Top arrow */}
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="size-8 rounded-md border border-white/5 bg-black/50 hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white group cursor-pointer mb-1"
          aria-label="Previous slide"
        >
          <svg
            width="21"
            height="12"
            viewBox="0 0 21 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180"
          >
            <path
              d="M19.6667 1L15 5.66667L13.8333 6.83333M10.3333 10.3333L1 1"
              stroke="gray"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="group-hover:stroke-white"
            />
          </svg>
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
          className="size-8 rounded-lg border border-white/5 bg-black/50 hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white group cursor-pointer mt-1"
          aria-label="Next slide"
        >
          <svg
            width="21"
            height="12"
            viewBox="0 0 21 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.6667 1L15 5.66667L13.8333 6.83333M10.3333 10.3333L1 1"
              stroke="gray"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="group-hover:stroke-white"
            />
          </svg>
        </button>
      </div>
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
