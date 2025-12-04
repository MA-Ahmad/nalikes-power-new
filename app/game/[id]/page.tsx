'use client'

import Navbar from '@/components/home/navbar'
import { useState, useEffect } from 'react'
import { ChatSidebar } from '@/components/home/chat/chat-sidebar'
import { useRouter, useParams } from 'next/navigation'
import { useEnterGame } from '@/hooks/use-mini-games'
import { useAuthStore } from '@/store/auth'
import { toast } from 'react-hot-toast'
import { RefreshCcw, ArrowLeft } from 'lucide-react'

export default function GameIframePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isRefetchingBalance, setIsRefetchingBalance] = useState(false)
  const [gameUrl, setGameUrl] = useState<string | null>(null)
  const router = useRouter()
  const params = useParams()
  const gameId = params?.id as string
  const { syncWalletStatus } = useAuthStore()

  const enterGameMutation = useEnterGame({
    onSuccess: (url) => {
      setGameUrl(url)
    },
    onError: (error) => {
      console.error('Failed to enter game:', error)
      toast.error('Failed to load game. Please try again.')
      // Redirect back to home after a short delay
      setTimeout(() => {
        router.push('/')
      }, 2000)
    },
  })

  useEffect(() => {
    if (gameId) {
      enterGameMutation.mutate({
        gameid: gameId,
        currency: 'usd',
        screen_mode: 1,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId])

  const handleCloseGame = () => {
    router.push('/')
  }

  const handleRefetchBalance = async () => {
    setIsRefetchingBalance(true)
    try {
      await syncWalletStatus()
      toast.success('Balance updated successfully')
    } catch (error) {
      toast.error('Failed to refetch balance')
      console.error('Failed to refetch balance:', error)
    } finally {
      setIsRefetchingBalance(false)
    }
  }

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <div className="min-h-screen bg-black relative">
      <Navbar />
      <div className="flex">
        <main
          className={`flex-1 bg-[#040315] sm:bg-transparent transition-all duration-300 ease-in-out ${
            isChatOpen ? 'lg:mr-80' : 'lg:mr-0'
          }`}
        >
          <div className="mt-4 sm:mt-8 px-2 sm:px-4">
            {enterGameMutation.isPending ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] sm:min-h-[600px] gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                <p className="text-white text-lg">Loading game...</p>
              </div>
            ) : gameUrl ? (
              <GameIframe
                url={gameUrl}
                onClose={handleCloseGame}
                onRefetchBalance={handleRefetchBalance}
                isRefetching={isRefetchingBalance}
              />
            ) : enterGameMutation.isError ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] sm:min-h-[600px] gap-4">
                <p className="text-white text-lg">Failed to load game</p>
                <button
                  onClick={handleCloseGame}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Go Back</span>
                </button>
              </div>
            ) : null}
          </div>
        </main>

        {/* Chat Sidebar - Part of layout on desktop, overlay on mobile */}
        <ChatSidebar isOpen={isChatOpen} onToggle={toggleChat} />
      </div>
    </div>
  )
}

// Game iframe component
function GameIframe({
  url,
  onClose,
  onRefetchBalance,
  isRefetching,
}: {
  url: string
  onClose: () => void
  onRefetchBalance: () => void
  isRefetching: boolean
}) {
  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg">
      {/* Close button */}
      <div className="flex justify-end gap-2 w-full p-2 sm:p-4 mt-10 sm:mt-6">
        <button
          onClick={onRefetchBalance}
          disabled={isRefetching}
          className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-base"
        >
          <RefreshCcw
            className={`w-3 h-3 sm:w-4 sm:h-4 ${
              isRefetching ? 'animate-spin' : ''
            }`}
          />
          <span className="hidden sm:inline">
            {isRefetching ? 'Refetching...' : 'Refetch Balance'}
          </span>
          <span className="sm:hidden">Refresh</span>
        </button>
        <button
          onClick={onClose}
          className="bg-white/10 hover:bg-white/20 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-base"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Close</span>
        </button>
      </div>
      {/* Game iframe */}
      <div className="w-full relative h-[calc(100vh-180px)] sm:h-auto sm:pb-[56.25%]">
        <iframe
          src={url}
          className="absolute top-0 left-0 w-full h-full border-0"
          allow="fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  )
}
