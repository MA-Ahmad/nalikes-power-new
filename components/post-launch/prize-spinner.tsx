import { useEffect, useRef, useState } from 'react'
import { Shield, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import confetti from 'canvas-confetti'
import useSound from 'use-sound'
import PrizeCard from './prize-card'
import { useMysteryBoxes } from '@/hooks/use-mystery-boxes'
import { useAuthStore } from '@/store/auth'
import { mysteryBoxesApi } from '@/lib/api/mystery-boxes'
import { toast } from 'react-hot-toast'

interface Prize {
  id: string
  title: string
  off: string
  image: string
  amount: string
}

const ENTRY_FEE = 1 // Hardcoded spin amount in USD

const PrizeSpinner = () => {
  const overflowRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const { data: mysteryBoxes = [], isLoading } = useMysteryBoxes()
  const { user, syncWalletStatus } = useAuthStore()
  const [extendedPrizes, setExtendedPrizes] = useState<Prize[]>([])
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showWinAnimation, setShowWinAnimation] = useState(false)
  const [claimedPrizeId, setClaimedPrizeId] = useState<string | null>(null)
  const [cardDims, setCardDims] = useState({
    width: 0,
    height: 0,
    gap: 16,
    containerWidth: 0,
  })

  // Check EVM wallet balance
  const evmBalance = user?.depositWalletAddresses?.evm?.availableAmount || 0
  const hasSufficientBalance = evmBalance >= ENTRY_FEE

  // Prepare long list for seamless scrolling
  useEffect(() => {
    if (mysteryBoxes.length === 0) return
    const prizes: Prize[] = mysteryBoxes.map((box: any) => ({
      id: box.id,
      title: box.title,
      off: box.off,
      image: box.image,
      amount: box.amount,
    }))
    const repeat = 6
    const extended = Array.from({ length: repeat }).flatMap(() =>
      prizes.map((p) => ({ ...p }))
    )
    setExtendedPrizes(extended)
  }, [mysteryBoxes])

  // Convert mystery boxes to prizes format (for use in other places)
  const prizes: Prize[] = mysteryBoxes.map((box: any) => ({
    id: box.id,
    title: box.title,
    off: box.off,
    image: box.image,
    amount: box.amount,
  }))

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
    console.log('handleSpin called!!! 1')

    console.log('cardDims.width ===>', cardDims.width)

    if (isSpinning || !cardDims.width) return

    // Check balance before allowing spin
    if (!hasSufficientBalance) {
      toast.error(
        `Insufficient balance. Required: $${ENTRY_FEE}. Current balance: $${evmBalance.toFixed(
          2
        )}`
      )
      return
    }

    console.log('handleSpin called!!! 2')

    setIsSpinning(true)
    setShowWinAnimation(false) // Reset win animation
    setClaimedPrizeId(null) // Reset claimed prize

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

      // Get the winning prize ID using modulo to handle extended array
      // Since extendedPrizes is just repeated prizes, we can use modulo to get the actual prize
      let winningPrize: Prize | undefined
      let winningPrizeId: string | undefined

      if (prizes.length > 0) {
        const winningPrizeIndex = targetIndex % prizes.length
        winningPrize = prizes[winningPrizeIndex]
      } else if (
        extendedPrizes.length > 0 &&
        targetIndex < extendedPrizes.length
      ) {
        // Fallback to extendedPrizes if prizes array is not ready
        winningPrize = extendedPrizes[targetIndex]
      }

      winningPrizeId = winningPrize?.id

      console.log('targetIndex ===>', targetIndex)
      console.log('extendedPrizes.length ===>', extendedPrizes.length)
      console.log('prizes.length ===>', prizes.length)
      console.log('winningPrize ===>', winningPrize)
      console.log('winningPrizeId ===>', winningPrizeId)

      // ❌ don't recenter immediately (this caused reset)
      // ✅ instead, check if it's drifting too far, recenter quietly before next spin
      const safeDistance = extendedPrizes.length * 0.3 // 30% away from edges
      if (
        prizes.length > 0 &&
        (targetIndex < safeDistance ||
          targetIndex > extendedPrizes.length - safeDistance)
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

      // Claim reward after spin completes
      if (winningPrizeId) {
        claimReward(winningPrizeId)
      } else {
        console.error('Failed to get winning prize ID', {
          targetIndex,
          prizesLength: prizes.length,
          extendedPrizesLength: extendedPrizes.length,
        })
        toast.error('Failed to determine winning prize. Please try again.')
      }

      // Trigger win animation after spin completes
      setTimeout(() => {
        setShowWinAnimation(true)
      }, 100) // Small delay to ensure spinning state is updated
    }, duration + 50)
  }

  const claimReward = async (itemId: string) => {
    try {
      const response = await mysteryBoxesApi.claimReward(itemId)
      setClaimedPrizeId(itemId)
      toast.success(`Reward claimed! $${response.reward}`)
      // Refresh wallet balance after claiming
      await syncWalletStatus()
    } catch (error: any) {
      console.error('Failed to claim reward:', error)
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to claim reward'
      )
    }
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

  // useEffect(() => {
  //   if (showWinAnimation) {
  //     const count = 200
  //     const defaults = {
  //       origin: { y: 0.7 },
  //     }

  //     function fire(particleRatio: number, opts: any) {
  //       confetti({
  //         ...defaults,
  //         ...opts,
  //         particleCount: Math.floor(count * particleRatio),
  //       })
  //     }

  //     function fireConfetti() {
  //       fire(0.25, {
  //         spread: 26,
  //         startVelocity: 55,
  //       })
  //       fire(0.2, {
  //         spread: 60,
  //       })
  //       fire(0.35, {
  //         spread: 100,
  //         decay: 0.91,
  //         scalar: 0.8,
  //       })
  //       fire(0.1, {
  //         spread: 120,
  //         startVelocity: 25,
  //         decay: 0.92,
  //         scalar: 1.2,
  //       })
  //       fire(0.1, {
  //         spread: 120,
  //         startVelocity: 45,
  //       })
  //     }

  //     // First confetti
  //     fireConfetti()

  //     // Second confetti after 1 second
  //     const confettiTimer = setTimeout(() => {
  //       fireConfetti()
  //     }, 1000)

  //     const timer = setTimeout(() => {
  //       setShowWinAnimation(false)
  //     }, 1200)

  //     return () => {
  //       clearTimeout(timer)
  //       clearTimeout(confettiTimer)
  //     }
  //   }
  // }, [showWinAnimation])

  // Add this hook at the top of your component, with other hooks
  const [playConfetti] = useSound('/sounds/confetti.mp3', {
    volume: 0.8,
  })

  // Update the useEffect
  useEffect(() => {
    if (showWinAnimation) {
      const count = 200
      const defaults = {
        origin: { y: 0.7 },
      }

      function fire(particleRatio: number, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        })
      }

      function fireConfetti() {
        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        })
        fire(0.2, {
          spread: 60,
        })
        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
        })
        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
        })
        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        })
      }

      // First confetti and sound
      fireConfetti()
      playConfetti()

      // Second confetti and sound after 1 second
      const confettiTimer = setTimeout(() => {
        fireConfetti()
        playConfetti()
      }, 1000)

      const timer = setTimeout(() => {
        setShowWinAnimation(false)
      }, 1200)

      return () => {
        clearTimeout(timer)
        clearTimeout(confettiTimer)
      }
    }
  }, [showWinAnimation, playConfetti])
  return (
    <div className="overflow-x-hidden relative">
      <div className="absolute inset-0 -top-[50px] flex items-center justify-center">
        <Image
          src="/images/mystery-box/square-pattern.svg"
          alt="Square Pattern"
          width={1920}
          height={600}
          className="w-full h-full object-cover opacity-[0.3]"
        />
      </div>
      <div className="w-full max-w-6xl mx-auto p-8 rounded-xl">
        {/* Carousel Container */}
        <div className="relative py-[70px] prize-spinner-container">
          {selectedIndex !== 0 && (
            <motion.div
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-20"
              style={{
                width: '250px',
                height: '270px',
                // top: '-1.25rem',
                top: '2.75rem',
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
                src="/images/spin-card-images/down.svg"
                alt="selection-indicator"
                width={15000}
                height={15000}
                className="w-14 h-14 absolute -top-[1.5rem] left-1/2 -translate-x-1/2 z-[55555]"
              />

              <svg
                viewBox="0 0 249 274"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 left-1/2 -translate-x-1/2 max-w-[250px] w-full h-[270px] z-50"
                preserveAspectRatio="none"
              >
                <foreignObject
                  x="-43.7957"
                  y="-43.657"
                  width="335.693"
                  height="361.314"
                >
                  <div
                    // @ts-ignore
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                      backdropFilter: 'blur(21.9px)',
                      clipPath: 'url(#bgblur_0_3308_6128_clip_path)',
                      height: '100%',
                      width: '100%',
                    }}
                  ></div>
                </foreignObject>
                <path
                  data-figma-bg-blur-radius="43.7957"
                  d="M241.532 0.138672C245.16 0.138672 248.102 3.07986 248.102 6.70801V253.529C248.102 255.326 247.366 257.045 246.065 258.285L231.627 272.047C230.405 273.211 228.783 273.861 227.095 273.861H6.56934C2.94119 273.861 0 270.92 0 267.292V23.1553C0 21.3896 0.71045 19.6976 1.97168 18.4619L18.7598 2.01562C19.9876 0.812767 21.6376 0.13879 23.3564 0.138672H241.532ZM27.7646 11.0879C26.1574 11.0879 24.6054 11.6763 23.4033 12.7432L12.5459 22.3799C11.1412 23.6266 10.3379 25.4158 10.3379 27.2939V258.533C10.338 262.161 13.2792 265.103 16.9072 265.103H220.15C221.804 265.103 223.397 264.479 224.611 263.355L236.731 252.144C238.075 250.9 238.84 249.152 238.84 247.321V17.6572C238.84 14.0291 235.898 11.0879 232.27 11.0879H27.7646Z"
                  fill="url(#paint0_linear_3308_6128)"
                />
                <defs>
                  <clipPath
                    id="bgblur_0_3308_6128_clip_path"
                    transform="translate(43.7957 43.657)"
                  >
                    <path d="M241.532 0.138672C245.16 0.138672 248.102 3.07986 248.102 6.70801V253.529C248.102 255.326 247.366 257.045 246.065 258.285L231.627 272.047C230.405 273.211 228.783 273.861 227.095 273.861H6.56934C2.94119 273.861 0 270.92 0 267.292V23.1553C0 21.3896 0.71045 19.6976 1.97168 18.4619L18.7598 2.01562C19.9876 0.812767 21.6376 0.13879 23.3564 0.138672H241.532ZM27.7646 11.0879C26.1574 11.0879 24.6054 11.6763 23.4033 12.7432L12.5459 22.3799C11.1412 23.6266 10.3379 25.4158 10.3379 27.2939V258.533C10.338 262.161 13.2792 265.103 16.9072 265.103H220.15C221.804 265.103 223.397 264.479 224.611 263.355L236.731 252.144C238.075 250.9 238.84 249.152 238.84 247.321V17.6572C238.84 14.0291 235.898 11.0879 232.27 11.0879H27.7646Z" />
                  </clipPath>
                  <linearGradient
                    id="paint0_linear_3308_6128"
                    x1="1.1527e-07"
                    y1="51.6156"
                    x2="186.673"
                    y2="276.172"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#EE4FFB" />
                    <stop offset="0.447613" stop-color="#FDB5FD" />
                    <stop offset="1" stop-color="#6F6BFF" />
                  </linearGradient>
                </defs>
              </svg>

              <Image
                src="/images/spin-card-images/up.svg"
                alt="selection-indicator"
                width={15000}
                height={15000}
                className="w-14 h-14 absolute -bottom-[1.5rem] left-1/2 -translate-x-1/2 z-[55555]"
              />
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
                  title={prize.title}
                  isSelected={
                    selectedIndex === index && !isSpinning && showWinAnimation
                  }
                  off={prize.off}
                  initialState={selectedIndex === index && !isSpinning}
                />
              ))}
            </div>
          </div>
        </div>

        <ControlPanel
          isSpinning={isSpinning}
          handleSpin={handleSpin}
          hasSufficientBalance={hasSufficientBalance}
          entryFee={ENTRY_FEE}
          evmBalance={evmBalance}
        />
      </div>
    </div>
  )
}

const ControlPanel = ({
  isSpinning,
  handleSpin,
  hasSufficientBalance,
  entryFee,
  evmBalance,
}: {
  isSpinning: boolean
  handleSpin: () => void
  hasSufficientBalance: boolean
  entryFee: number
  evmBalance: number
}) => {
  const [activeMode, setActiveMode] = useState<'manual' | 'auto'>('manual')

  return (
    <div className="w-full justify-center flex my-6">
      <div className="relative inline-block w-full max-w-[504px]">
        <svg
          width="504"
          height="149"
          viewBox="0 0 504 149"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <foreignObject x="-400" y="-400" width="1304" height="949">
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                backdropFilter: 'blur(200px)',
                clipPath: 'url(#bgblur_0_3308_6143_clip_path)',
                height: '100%',
                width: '100%',
              }}
            ></div>
          </foreignObject>
          <path
            data-figma-bg-blur-radius="400"
            d="M26.4854 0.5H498C501.038 0.5 503.5 2.96243 503.5 6V122.515C503.5 123.973 502.92 125.373 501.889 126.404L481.403 146.889C480.372 147.92 478.973 148.5 477.515 148.5H6C2.96243 148.5 0.5 146.038 0.5 143V26.4854C0.5 25.0267 1.0799 23.6281 2.11133 22.5967L22.5967 2.11133C23.6281 1.0799 25.0267 0.5 26.4854 0.5Z"
            fill="url(#paint0_linear_3308_6143)"
            stroke="url(#paint1_linear_3308_6143)"
          />
          <defs>
            <clipPath
              id="bgblur_0_3308_6143_clip_path"
              transform="translate(400 400)"
            >
              <path d="M26.4854 0.5H498C501.038 0.5 503.5 2.96243 503.5 6V122.515C503.5 123.973 502.92 125.373 501.889 126.404L481.403 146.889C480.372 147.92 478.973 148.5 477.515 148.5H6C2.96243 148.5 0.5 146.038 0.5 143V26.4854C0.5 25.0267 1.0799 23.6281 2.11133 22.5967L22.5967 2.11133C23.6281 1.0799 25.0267 0.5 26.4854 0.5Z" />
            </clipPath>
            <linearGradient
              id="paint0_linear_3308_6143"
              x1="252"
              y1="14.5079"
              x2="252"
              y2="149"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#11042F" />
              <stop offset="1" stop-color="#020106" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_3308_6143"
              x1="-2.10424e-06"
              y1="82.2624"
              x2="38.0098"
              y2="214.991"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#EE4FFB" stop-opacity="0.2" />
              <stop offset="1" stop-color="#F8DBCE" stop-opacity="0.05" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute top-0 left-0 w-full p-4 pb-4.5 flex items-center justify-between gap-2 control-boxes">
          <div className="relative inline-block w-full max-w-[133px]">
            <svg
              width="133"
              height="48"
              viewBox="0 0 133 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <foreignObject x="-40" y="-40" width="213" height="128">
                <div
                  // @ts-ignore
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    backdropFilter: 'blur(20px)',
                    clipPath: 'url(#bgblur_0_3308_6146_clip_path)',
                    height: '100%',
                    width: '100%',
                  }}
                ></div>
              </foreignObject>
              <g data-figma-bg-blur-radius="40">
                <path
                  d="M6.24264 1.75736L1.75736 6.24264C0.632141 7.36786 0 8.89398 0 10.4853V42C0 45.3137 2.68629 48 6 48H122.515C124.106 48 125.632 47.3679 126.757 46.2426L131.243 41.7574C132.368 40.6321 133 39.106 133 37.5147V6C133 2.68629 130.314 0 127 0H10.4853C8.89398 0 7.36786 0.632139 6.24264 1.75736Z"
                  fill="url(#paint0_linear_3308_6146)"
                />
                <path
                  d="M10.4854 0.5H127C130.038 0.5 132.5 2.96243 132.5 6V37.5146C132.5 38.9733 131.92 40.3719 130.889 41.4033L126.403 45.8887C125.372 46.9201 123.973 47.5 122.515 47.5H6C2.96243 47.5 0.5 45.0376 0.5 42V10.4854C0.5 9.02668 1.0799 7.62813 2.11133 6.59668L6.59668 2.11133C7.62813 1.0799 9.02668 0.5 10.4854 0.5Z"
                  stroke="white"
                  stroke-opacity="0.1"
                />
              </g>
              <defs>
                <clipPath
                  id="bgblur_0_3308_6146_clip_path"
                  transform="translate(40 40)"
                >
                  <path d="M6.24264 1.75736L1.75736 6.24264C0.632141 7.36786 0 8.89398 0 10.4853V42C0 45.3137 2.68629 48 6 48H122.515C124.106 48 125.632 47.3679 126.757 46.2426L131.243 41.7574C132.368 40.6321 133 39.106 133 37.5147V6C133 2.68629 130.314 0 127 0H10.4853C8.89398 0 7.36786 0.632139 6.24264 1.75736Z" />
                </clipPath>
                <linearGradient
                  id="paint0_linear_3308_6146"
                  x1="66.3603"
                  y1="-2"
                  x2="66.3603"
                  y2="48"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#030109" stop-opacity="0.2" />
                  <stop offset="1" stop-color="#030109" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex items-center gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 w-full justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.31248 12.879C4.31248 19.283 11.9845 21.606 11.9845 21.606C11.9845 21.606 19.6565 19.283 19.6565 12.879C19.6565 6.474 19.9345 5.974 19.3195 5.358C18.7035 4.742 12.9905 2.75 11.9845 2.75C10.9785 2.75 5.26548 4.742 4.65048 5.358C4.1377 5.87079 4.24453 5.17473 4.2947 9"
                  stroke="#A5A9C1"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.38574 11.8746L11.2777 13.7696L15.1757 9.86963"
                  stroke="#A5A9C1"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="text-brand-neutral text-[12px] font-semibold">
                This game is <br />
                probably fair
              </div>
            </div>
          </div>
          <div
            className={cn(
              'relative inline-block w-full max-w-[180px] px-3 py-2.5',
              !hasSufficientBalance || isSpinning
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            )}
            onClick={
              isSpinning || !hasSufficientBalance
                ? () => {}
                : () => handleSpin()
            }
          >
            <svg
              // width="180"
              // height="58"
              viewBox="0 0 180 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <foreignObject x="-60" y="-60" width="300" height="178">
                <div
                  // @ts-ignore
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    backdropFilter: 'blur(30px)',
                    clipPath: 'url(#bgblur_0_5013_5106_clip_path)',
                    height: '100%',
                    width: '100%',
                  }}
                ></div>
              </foreignObject>
              <path
                data-figma-bg-blur-radius="60"
                d="M14.7617 0.5H174C177.038 0.5 179.5 2.96243 179.5 6V45.3535C179.5 47.074 178.695 48.6955 177.324 49.7354L168.562 56.3818C167.606 57.1073 166.439 57.5 165.238 57.5H6C2.96243 57.5 0.5 55.0376 0.5 52V12.6465C0.5 10.926 1.30515 9.30452 2.67578 8.26465L11.4375 1.61816C12.3938 0.892747 13.5614 0.5 14.7617 0.5Z"
                fill="url(#paint0_linear_5013_5106)"
                stroke="#EE4FFB"
              />
              <defs>
                <clipPath
                  id="bgblur_0_5013_5106_clip_path"
                  transform="translate(60 60)"
                >
                  <path d="M14.7617 0.5H174C177.038 0.5 179.5 2.96243 179.5 6V45.3535C179.5 47.074 178.695 48.6955 177.324 49.7354L168.562 56.3818C167.606 57.1073 166.439 57.5 165.238 57.5H6C2.96243 57.5 0.5 55.0376 0.5 52V12.6465C0.5 10.926 1.30515 9.30452 2.67578 8.26465L11.4375 1.61816C12.3938 0.892747 13.5614 0.5 14.7617 0.5Z" />
                </clipPath>
                <linearGradient
                  id="paint0_linear_5013_5106"
                  x1="90"
                  y1="0"
                  x2="90"
                  y2="58"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#EE4FFB" stop-opacity="0.2" />
                  <stop offset="1" stop-color="#EE4FFB" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <div className="relative text-pink-light font-semibold text-center whitespace-nowrap flex flex-col gap-1 items-center justify-center !leading-none">
              <span
                className={cn('block', !hasSufficientBalance && 'text-[10px]')}
              >
                {isSpinning
                  ? 'SPINNING'
                  : !hasSufficientBalance
                  ? 'INSUFFICIENT BALANCE'
                  : 'SPIN'}
              </span>
              <span className="block font-medium">
                $
                {entryFee.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
          <div className="relative inline-block w-full max-w-[125px] px-3 py-2.5">
            <svg
              // width="125"
              // height="48"
              viewBox="0 0 125 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <foreignObject x="-60" y="-60" width="245" height="168">
                <div
                  // @ts-ignore
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    backdropFilter: 'blur(30px)',
                    clipPath: 'url(#bgblur_0_5013_5420_clip_path)',
                    height: '100%',
                    width: '100%',
                  }}
                ></div>
              </foreignObject>
              <g data-figma-bg-blur-radius="60">
                <path
                  d="M7.13595 1.5491L1.97639 6.21335C0.718034 7.3509 0 8.96794 0 10.6642V42C0 45.3137 2.68629 48 6 48H113.84C115.327 48 116.761 47.448 117.864 46.4509L123.024 41.7867C124.282 40.6491 125 39.0321 125 37.3358V6C125 2.68629 122.314 0 119 0H11.1596C9.67275 0 8.2389 0.552038 7.13595 1.5491Z"
                  fill="url(#paint0_linear_5013_5420)"
                />
                <path
                  d="M11.1592 0.5H119C122.038 0.5 124.5 2.96243 124.5 6V37.3359C124.5 38.8908 123.842 40.3733 122.688 41.416L117.528 46.0801C116.517 46.9938 115.203 47.4999 113.841 47.5H6C2.96243 47.5 0.5 45.0376 0.5 42V10.6641C0.500053 9.10918 1.15808 7.6267 2.31152 6.58398L7.47168 1.91992C8.48258 1.00619 9.79653 0.500096 11.1592 0.5Z"
                  stroke="#6F6BFF"
                  stroke-opacity="0.6"
                />
              </g>
              <defs>
                <clipPath
                  id="bgblur_0_5013_5420_clip_path"
                  transform="translate(60 60)"
                >
                  <path d="M7.13595 1.5491L1.97639 6.21335C0.718034 7.3509 0 8.96794 0 10.6642V42C0 45.3137 2.68629 48 6 48H113.84C115.327 48 116.761 47.448 117.864 46.4509L123.024 41.7867C124.282 40.6491 125 39.0321 125 37.3358V6C125 2.68629 122.314 0 119 0H11.1596C9.67275 0 8.2389 0.552038 7.13595 1.5491Z" />
                </clipPath>
                <linearGradient
                  id="paint0_linear_5013_5420"
                  x1="-20.5357"
                  y1="0.461856"
                  x2="-20.5357"
                  y2="48.4948"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#6F6BFF" stop-opacity="0.2" />
                  <stop offset="1" stop-color="#6F6BFF" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
              Demo
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between w-full absolute bottom-0 left-0">
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

          <div
            onClick={() => setActiveMode('auto')}
            className={`
              relative cursor-pointer px-8 py-4 rounded-lg transition-all duration-200 flex items-center gap-2 h-[52px] justify-center w-[50%]
              ${
                activeMode === 'auto'
                  ? 'text-white active-tab active-tab-fast'
                  : 'text-slate-400 hover:text-slate-300'
              }
            `}
          >
            Fast
            <Info className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrizeSpinner
