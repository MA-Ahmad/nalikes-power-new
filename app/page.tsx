'use client'

import Navbar from '@/components/home/navbar'
import Image from 'next/image'
import banner from '@/public/images/banner.png'
import { SectionCards } from '@/components/home/section-cards'
import { useState } from 'react'
import { ChatSidebar } from '@/components/home/chat/chat-sidebar'
import newBanner from '@/public/images/new-banner.png'
import Banner from '@/components/home/banner'

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Main Layout Container */}
      <div className="flex pt-16">
        {/* Main Content - Adjusts margin based on sidebar state on desktop */}
        <main
          className={`flex-1 px-4 py-8 transition-all duration-300 ease-in-out ${
            isChatOpen ? 'lg:mr-80' : 'lg:mr-0'
          }`}
        >
          <div className="max-w-[1500px] mx-auto">
            <Banner />

            {/* Banner Image */}
            <div className="mb-8 mt-8">
              <Image
                src={newBanner}
                alt="Banner"
                layout="responsive"
                width={1920}
                height={600}
                className="rounded-lg"
                placeholder="blur"
                blurDataURL={newBanner.src}
              />
            </div>

            <SectionCards />
          </div>
        </main>

        {/* Chat Sidebar - Part of layout on desktop, overlay on mobile */}
        <ChatSidebar isOpen={isChatOpen} onToggle={toggleChat} />
      </div>
    </div>
  )
}
