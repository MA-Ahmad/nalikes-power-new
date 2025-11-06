'use client'

import Navbar from '@/components/home/navbar'
import { useEffect, useState } from 'react'
import { ChatSidebar } from '@/components/home/chat/chat-sidebar'
import PostLaunch from '@/components/post-launch'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Volume2, VolumeOff } from 'lucide-react'
import useSound from 'use-sound'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuthStore } from '@/store/auth'

export default function MysteryBoxPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isSoundOn, setIsSoundOn] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { isAuthenticated, user, loading } = useAuthStore()

  const [play, { stop }] = useSound('/sounds/post-launch.mp3', {
    loop: true, // Set to true if you want the sound to loop
    volume: 0.8, // Adjust volume (0 to 1)
  })

  // Check if component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check authentication after mount and redirect if not authenticated
  useEffect(() => {
    if (mounted && !loading) {
      if (!isAuthenticated) {
        router.push('/')
      }
    }
  }, [mounted, loading, isAuthenticated, router])

  useEffect(() => {
    if (isSoundOn) {
      play()
    } else {
      stop()
    }

    // 🔑 Cleanup: stop music when leaving page (unmount)
    return () => {
      stop()
    }
  }, [isSoundOn, play, stop])

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  // Don't render content until mounted and authenticated check is complete
  if (!mounted || loading || !isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex pt-26 relative">
        <main
          className={`flex-1 px-4 lg:px-0 py-8 transition-all duration-300 ease-in-out ${
            isChatOpen ? 'lg:mr-80' : 'lg:mr-0'
          }`}
        >
          <div className="max-w-[1500px] mx-auto h-[200px] w-full absolute top-0">
            <Image
              src="/images/mystery-box/sun-rays.svg"
              alt="Sun Rays"
              width={1920}
              height={600}
              className="absolute top-0 left-1/2 -translate-x-1/2 object-cover w-[50rem] h-[11rem]"
            />
          </div>
          <Image
            src="/images/mystery-box/page-bg.png"
            alt="Mystery Box"
            width={1920}
            height={600}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          <div className="max-w-[1500px] mx-auto">
            <div className="flex items-center justify-between px-48">
              <div
                className="text-white hover:-translate-x-1 transition-all duration-300 ease-in-out cursor-pointer z-[5] flex items-center gap-2"
                onClick={() => router.push('/')}
              >
                <ArrowLeft className="w-4 h-4" /> <span>Back</span>
              </div>

              <h3 className="text-2xl font-bold text-white z-[5]">
                Welcome Case Mystery Box
              </h3>

              <div
                className="flex items-center gap-4 p-2 rounded-md text-white hover:bg-white/20 transition-all duration-300 ease-in-out cursor-pointer z-[5]"
                onClick={() => setIsSoundOn(!isSoundOn)}
              >
                {isSoundOn ? (
                  <Volume2 className="w-4 h-4 text-green-400" />
                ) : (
                  <VolumeOff className="w-4 h-4 text-red-400" />
                )}
              </div>
            </div>
            <PostLaunch />
          </div>
        </main>

        {/* Chat Sidebar - Part of layout on desktop, overlay on mobile */}
        <ChatSidebar isOpen={isChatOpen} onToggle={toggleChat} />
      </div>
    </div>
  )
}
