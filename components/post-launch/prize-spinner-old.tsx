import { useEffect, useRef, useState } from 'react'
import { PrizeCard } from './PrizeCardOld'
import bitcoinImage from '@/public/images/spin-card-images/bitcoin.png'
import carImage from '@/public/images/spin-card-images/car.png'
import jacketImage from '@/public/images/spin-card-images/jacket.png'
import stoneImage from '@/public/images/spin-card-images/stone.png'
import shoesImage from '@/public/images/spin-card-images/shoes.png'
import { Shield, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Prize {
  id: string
  image: string
  amount: string
}

const prizes: Prize[] = [
  { id: '1', image: bitcoinImage.src, amount: '10000' },
  { id: '2', image: carImage.src, amount: '2000' },
  { id: '3', image: jacketImage.src, amount: '5000' },
  { id: '4', image: stoneImage.src, amount: '250' },
  { id: '5', image: shoesImage.src, amount: '500' },
  { id: '6', image: bitcoinImage.src, amount: '750' },
  { id: '7', image: carImage.src, amount: '1000' },
  { id: '8', image: jacketImage.src, amount: '2500' },
  { id: '9', image: stoneImage.src, amount: '500' },
  { id: '10', image: stoneImage.src, amount: '750' },
  { id: '11', image: shoesImage.src, amount: '1000' },
  { id: '12', image: bitcoinImage.src, amount: '2500' },
]

const PrizeSpinnerOld = () => {
  const overflowRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const [extendedPrizes, setExtendedPrizes] = useState<Prize[]>([])
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showWinAnimation, setShowWinAnimation] = useState(false) // New state for win animation
  const [cardDims, setCardDims] = useState({
    width: 0,
    height: 0,
    gap: 16,
    containerWidth: 0,
  })

  // Prepare long list for seamless scrolling
  useEffect(() => {
    const repeat = 6
    const extended = Array.from({ length: repeat }).flatMap(() =>
      prizes.map((p) => ({ ...p }))
    )
    setExtendedPrizes(extended)
  }, [])

  // Measure sizes responsively
  const measure = () => {
    const container = overflowRef.current
    const carousel = carouselRef.current
    if (!container || !carousel) return
    const firstCard = carousel.querySelector(
      '.prize-card'
    ) as HTMLElement | null
    if (!firstCard) return

    const styles = getComputedStyle(carousel)
    const gapVal = parseFloat(
      (styles.gap || styles.columnGap || '16px').toString()
    )

    setCardDims({
      width: firstCard.offsetWidth,
      height: firstCard.offsetHeight,
      gap: Number.isFinite(gapVal) ? gapVal : 16,
      containerWidth: container.clientWidth,
    })
  }

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [extendedPrizes.length])

  // Helper to center a given index exactly under the selection window
  const centerToIndex = (index: number, animate = false, duration = 3000) => {
    const carousel = carouselRef.current
    if (!carousel) return

    const { width, gap, containerWidth } = cardDims
    if (!width || !containerWidth) return

    const full = width + gap // card + gap
    const x = index * full
    const centerOffset = containerWidth / 2 - width / 2
    const translateX = -(x - centerOffset)

    carousel.style.transition = animate
      ? `transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`
      : 'none'
    carousel.style.transform = `translateX(${translateX}px)`
  }

  // Initialize centered selection when we have measurements
  const hasInit = useRef(false)
  useEffect(() => {
    if (!extendedPrizes.length || !cardDims.width) return
    if (!hasInit.current) {
      const base = Math.floor(extendedPrizes.length / 2)
      setSelectedIndex(base)
      centerToIndex(base, false)
      hasInit.current = true
    } else {
      centerToIndex(selectedIndex, false)
    }
  }, [extendedPrizes.length, cardDims.width, cardDims.containerWidth])

  const handleSpin = () => {
    if (isSpinning || !cardDims.width) return

    console.log('handleSpin called!!! 2')
    console.log('cardDims.width ===>', cardDims.width)

    setIsSpinning(true)
    setShowWinAnimation(false) // Reset win animation

    const duration = 3000 + Math.random() * 3000 // 3–6s
    const minSteps = 12
    const maxSteps = 24
    const steps = Math.floor(
      minSteps + Math.random() * (maxSteps - minSteps + 1)
    )

    const targetIndex = selectedIndex + steps

    // animate spin
    centerToIndex(targetIndex, true, duration)

    setTimeout(() => {
      // ✅ keep the winning card where it stopped
      setSelectedIndex(targetIndex)

      // ❌ don't recenter immediately (this caused reset)
      // ✅ instead, check if it's drifting too far, recenter quietly before next spin
      const safeDistance = extendedPrizes.length * 0.3 // 30% away from edges
      if (
        targetIndex < safeDistance ||
        targetIndex > extendedPrizes.length - safeDistance
      ) {
        // wrap winner into middle block (seamless reset BEFORE next spin)
        const wrappedIndex = targetIndex % prizes.length
        const middleBlock =
          Math.floor(extendedPrizes.length / 2 / prizes.length) * prizes.length
        const newIndex = middleBlock + wrappedIndex

        setSelectedIndex(newIndex)
        centerToIndex(newIndex, false) // snap silently
      }

      setIsSpinning(false)

      // Trigger win animation after spin completes
      setTimeout(() => {
        setShowWinAnimation(true)
      }, 100) // Small delay to ensure spinning state is updated
    }, duration + 50)
  }

  // Reset win animation when it completes
  useEffect(() => {
    if (showWinAnimation) {
      const timer = setTimeout(() => {
        setShowWinAnimation(false)
      }, 1200) // Duration of the animation

      return () => clearTimeout(timer)
    }
  }, [showWinAnimation])

  const pad = 8 // equal space around centered card in the selection

  console.log('selectedIndex ===>', selectedIndex)
  console.log('showWinAnimation ===>', showWinAnimation)

  return (
    <div className="overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto bg-background p-8 rounded-xl">
        {/* Carousel Container */}
        <div className="relative py-[70px] prize-spinner-container">
          {selectedIndex !== 0 && <div className="glow-lamp top-0"></div>}
          {selectedIndex !== 0 && <div className="glow-lamp bottom-0"></div>}

          {/* Selection Indicator (always centered) */}
          {selectedIndex !== 0 && (
            <motion.div
              className="pointer-events-none absolute -top-[0.6rem] left-1/2 -translate-x-1/2 z-20"
              style={{
                width: '200px',
                height: '232px',
                // top: '-1.25rem',
                top: '3.14rem',
              }}
              animate={
                showWinAnimation
                  ? {
                      scale: [1, 1.15, 0.95, 1.1, 0.97, 1],
                    }
                  : {
                      scale: 1, // smoothly return to normal
                    }
              }
              transition={
                showWinAnimation
                  ? {
                      duration: 1.8,
                      times: [0, 0.25, 0.45, 0.65, 0.85, 1],
                      ease: 'easeInOut',
                    }
                  : {
                      duration: 0.4, // smoother shrink back
                      ease: 'easeOut',
                    }
              }
            >
              <Image
                src="/images/spin-card-images/up.webp"
                alt="selection-indicator"
                width={1000}
                height={1000}
                className="w-8 h-8 absolute -top-[1.2rem] left-1/2 -translate-x-1/2 z-10"
              />
              <Image
                src="/images/spin-card-images/down.webp"
                alt="selection-indicator"
                width={1000}
                height={1000}
                className="w-8 h-8 absolute -bottom-[1.2rem] left-1/2 -translate-x-1/2 z-10"
              />
              <div className="w-full h-full rounded-[35px] shadow-glow relative selection-indicator" />
            </motion.div>
          )}

          {/* Overflow Container */}
          <div ref={overflowRef} className="rounded-lg">
            <div ref={carouselRef} className="flex gap-4">
              {extendedPrizes.map((prize, index) => (
                <PrizeCard
                  key={`${prize.id}-${index}`}
                  image={prize.image}
                  amount={prize.amount}
                  isSelected={
                    selectedIndex === index && !isSpinning && showWinAnimation
                  }
                  initialState={selectedIndex === index && !isSpinning}
                  className="spin-card-bg-majenda"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <ControlPanel isSpinning={isSpinning} handleSpin={handleSpin} />
      </div>
    </div>
  )
}

function ControlPanel({
  isSpinning,
  handleSpin,
}: {
  isSpinning: boolean
  handleSpin: () => void
}) {
  const [activeMode, setActiveMode] = useState<'manual' | 'auto'>('manual')

  return (
    <div className="w-full justify-center flex my-6">
      <div className="bg-sidebar backdrop-blur-sm rounded-3xl w-full max-w-[37rem] border border-slate-700/50 overflow-hidden">
        {/* Top Section */}
        <div className="flex items-center bg-[#0D131C] gap-2 p-4 w-full">
          {/* Provably Fair */}
          <div className="flex items-center gap-3 bg-slate-700/30 rounded-xl px-4 py-2 border border-slate-600/30 h-[50px]">
            <svg
              width="35"
              height="38"
              viewBox="0 0 35 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <path
                d="M0 5.48889L17.1 0V38C4.88511 32.9333 0 23.2222 0 17.7333V5.48889ZM34.2 5.48889L17.1 0V38C29.3149 32.9333 34.2 23.2222 34.2 17.7333V5.48889Z"
                fill="#55667E"
              />
              <path
                d="M12 20L16 23.5L24 15"
                stroke="#111923"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>

            <div className="flex flex-col gap-1 text-sm">
              <div className="text-slate-400 leading-none">This game is</div>
              <div className="text-slate-400 leading-none">Provably Fair</div>
            </div>
          </div>

          {/* SPIN Button */}
          <div className="flex-1">
            <button
              className="button-3d button-3d_double-line button-3d_red w-full h-[50px]"
              onClick={isSpinning ? () => {} : () => handleSpin()}
            >
              <span className="button-3d__outer">
                <span className="button-3d__inner flex-col gap-1">
                  <span className="button-3d__text leading-none">
                    {isSpinning ? 'SPINNING...' : 'SPIN'}
                  </span>
                  <div className="text-white/90 text-sm font-semibold leading-none">
                    $2,262.70
                  </div>
                </span>
              </span>
            </button>
          </div>

          {/* Demo Button */}
          <div
            className="bg-slate-600/40 rounded-xl border border-slate-500/30 min-w-[9rem] px-4 py-2 h-[50px] flex justify-center items-center cursor-pointer"
            onClick={isSpinning ? () => {} : () => handleSpin()}
          >
            <div className="text-slate-300 font-semibold text-lg">Demo</div>
          </div>
        </div>

        {/* Manual/Auto Toggle Section */}
        <div className="flex items-center justify-between bg-[#202A39] w-full">
          {/* Manual Button */}
          <div
            onClick={() => setActiveMode('manual')}
            className={`
              relative cursor-pointer rounded-lg transition-all duration-200 text-center h-[52px] flex justify-center items-center w-[50%]
              ${
                activeMode === 'manual'
                  ? 'text-white active-tab'
                  : 'text-slate-400 hover:text-slate-300'
              }
            `}
          >
            Manual
          </div>

          {/* Auto Button */}
          <div
            onClick={() => setActiveMode('auto')}
            className={`
              relative cursor-pointer px-8 py-4 rounded-lg transition-all duration-200 flex items-center gap-2 h-[52px] justify-center w-[50%]
              ${
                activeMode === 'auto'
                  ? 'text-white active-tab'
                  : 'text-slate-400 hover:text-slate-300'
              }
            `}
          >
            Auto
            <Info className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrizeSpinnerOld
