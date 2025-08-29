'use client'

import Navbar from '@/components/home/navbar'
import { useEffect, useState } from 'react'
import { ChatSidebar } from '@/components/home/chat/chat-sidebar'
import PostLaunch from '@/components/post-launch'
import { Button } from '@/components/ui/button'
import { Volume2, VolumeOff } from 'lucide-react'
import useSound from 'use-sound'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isSoundOn, setIsSoundOn] = useState(true)
  const router = useRouter()

  const [play, { stop }] = useSound('/sounds/post-launch.mp3', {
    loop: true, // Set to true if you want the sound to loop
    volume: 0.8, // Adjust volume (0 to 1)
  })

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
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex pt-16">
        <main
          className={`flex-1 px-4 py-8 transition-all duration-300 ease-in-out ${
            isChatOpen ? 'lg:mr-80' : 'lg:mr-0'
          }`}
        >
          <div className="max-w-[1500px] mx-auto">
            <div className="flex items-center justify-between px-48">
              <Button
                className="bg-neutral-600 text-white hover:bg-neutral-700 transition-all duration-300 ease-in-out cursor-pointer"
                onClick={() => router.push('/')}
              >
                Back
              </Button>

              <div
                className="flex items-center gap-4 p-2 rounded-md bg-neutral-600 text-white hover:bg-neutral-700 transition-all duration-300 ease-in-out cursor-pointer"
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
