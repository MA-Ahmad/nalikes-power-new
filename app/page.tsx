'use client'

import SignIn from '@/components/home/signIn'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { isAuthenticated, loading } = useAuthStore()

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    }, 1000)
  }, [])

  // Redirect to home page if authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/home')
    }
  }, [isAuthenticated, loading, router])

  // Show loading state while checking auth or mounting
  if (!mounted || loading) return null

  // Don't render if authenticated (will redirect)
  if (isAuthenticated) return null

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      <SignIn />
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/root-page/cover.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
      </div>

      {/* Content Container */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center px-4">
        {/* Logo - Top Left */}
        {/* <div className="absolute top-0 left-6 sm:top-4 sm:left-32 w-full">
          <Image
            src="/root-page/logo.svg"
            alt="Power.win Logo"
            width={192}
            height={112}
            className="w-48 h-28"
            priority
          />
        </div> */}

        {/* Dog Character - Left Side */}
        <div className="absolute bottom-0 left-0 sm:left-10">
          <Image
            src="/root-page/dog.svg"
            alt="Dog Character"
            width={384}
            height={512}
            className="w-170 lg:w-200"
            priority
          />
        </div>

        {/* Coming Soon Text - Center/Right */}
        <div className="absolute md:right-20 top-[35%] md:top-1/2 -translate-y-1/2">
          <Image
            src="/root-page/coming-soon.svg"
            alt="Coming Soon"
            width={384}
            height={192}
            className="h-42 w-100 sm:w-120 md:w-150 sm:h-52"
            priority
          />
        </div>
      </div>
    </div>
  )
}
