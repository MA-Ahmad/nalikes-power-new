'use client'

import Navbar from '@/components/home/navbar'
import { useEffect, useState } from 'react'
import { ChatSidebar } from '@/components/home/chat/chat-sidebar'
import { useRouter } from 'next/navigation'
import BitcoinGame from '@/components/game'

export default function GamePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const router = useRouter()

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex pt-16 relative h-screen">
        <main
          className={`flex-1 px-4 lg:px-0 py-8 transition-all duration-300 ease-in-out bg-neutral-800 ${
            isChatOpen ? 'lg:mr-80' : 'lg:mr-0'
          }`}
        >
          <div className="max-w-[1500px] mx-auto w-full h-full px-6">
            <BitcoinGame />
          </div>
        </main>

        {/* Chat Sidebar - Part of layout on desktop, overlay on mobile */}
        <ChatSidebar isOpen={isChatOpen} onToggle={toggleChat} />
      </div>
    </div>
  )
}
