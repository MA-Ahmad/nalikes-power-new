'use client'

import type React from 'react'

import { useState, useEffect, useRef } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  Send,
  Smile,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { ChatIcon, DiscordIcon, WinsIcon, XIcon } from '@/components/icons'
import { useAuthStore } from '@/store/auth'
import { useChatMessages, useSendChatMessage } from '@/hooks/use-chat'
import { useWinningItems } from '@/hooks/use-winning-items'
import Image from 'next/image'
interface ChatSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

function formatTimestamp(date?: string | Date): string {
  if (!date) return 'Just now'

  const messageDate = typeof date === 'string' ? new Date(date) : date
  const now = new Date()

  // Check if message is from today
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const messageDay = new Date(
    messageDate.getFullYear(),
    messageDate.getMonth(),
    messageDate.getDate()
  )

  if (messageDay.getTime() === today.getTime()) {
    // Today - show time
    const timePart = messageDate
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
      .toLowerCase()
    return `Today at ${timePart}`
  } else {
    // Not today - show date and time
    const datePart = messageDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
    const timePart = messageDate
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
      .toLowerCase()
    return `${datePart} at ${timePart}`
  }
}

export function ChatSidebar({ isOpen, onToggle }: ChatSidebarProps) {
  const [activeTab, setActiveTab] = useState('chat')
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [isInitialMount, setIsInitialMount] = useState(true)

  const { isAuthenticated, user } = useAuthStore()

  // React Query hooks
  const {
    data: messages = [],
    isLoading: isLoadingMessages,
    isFetching: isFetchingMessages,
  } = useChatMessages(isOpen && activeTab === 'chat')

  const { data: winningItems = [], isLoading: isLoadingWinningItems } =
    useWinningItems(isOpen && activeTab === 'wins')

  const sendMessageMutation = useSendChatMessage({
    onSuccess: () => {
      setInputValue('')
      setTimeout(() => scrollToBottom('smooth'), 100)
    },
  })

  // Set initial mount to false after first render
  useEffect(() => {
    if (isOpen) {
      setIsInitialMount(false)
    }
  }, [isOpen])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (!isInitialMount && isOpen && activeTab === 'chat') {
      const timeoutId = setTimeout(() => {
        scrollToBottom()
      }, 100)
      return () => clearTimeout(timeoutId)
    }
  }, [messages, isInitialMount, isOpen, activeTab])

  const scrollToBottom = (behavior: ScrollBehavior = 'auto') => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      ) as HTMLElement
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior,
        })
      }
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim() || !isAuthenticated || sendMessageMutation.isPending)
      return

    const messageText = inputValue.trim()
    sendMessageMutation.mutate(messageText)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Desktop Sidebar Container - Fixed position */}
      <div className="hidden lg:block">
        {/* Toggle Button - Fixed adjacent to sidebar */}
        <div
          className={`fixed bottom-14 -translate-y-1/2 z-50 transition-all duration-300 ease-in-out ${
            isOpen ? 'right-80' : 'right-0'
          }`}
        >
          <Button
            onClick={onToggle}
            className="rounded-l-md rounded-r-none h-8 w-8 p-0 bg-brand-purple text-white hover:bg-brand-purple/80 shadow-lg cursor-pointer"
          >
            {isOpen ? (
              <ArrowRight className="h-5 w-5" />
            ) : (
              <ArrowLeft className="h-5 w-5" />
            )}
            <span className="sr-only">
              {isOpen ? 'Close chat' : 'Open chat'}
            </span>
          </Button>
        </div>

        {/* Sidebar - Fixed position */}
        <div
          className={`fixed top-16 right-0 h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out z-40 ${
            isOpen ? 'w-80 bg-sidebar shadow-lg' : 'w-0'
          } overflow-hidden`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 w-full">
              <div className="flex items-center w-full p-1 bg-neutral-800 rounded-md gap-1">
                <Button
                  className={cn(
                    'flex-1  border-gray-700 text-white bg-neutral-800  hover:text-white hover:bg-neutral-700 font-bold',
                    activeTab === 'chat' && 'bg-neutral-700 text-white'
                  )}
                  onClick={() => setActiveTab('chat')}
                >
                  <ChatIcon
                    className="h-4 w-4"
                    id="desktop"
                    active={activeTab === 'chat'}
                  />
                  Chat
                </Button>
                <Button
                  className={cn(
                    'flex-1  border-gray-700 text-gray-400 bg-neutral-800 hover:bg-neutral-700 hover:text-white font-bold',
                    activeTab === 'wins' && 'bg-neutral-700 text-white'
                  )}
                  onClick={() => setActiveTab('wins')}
                >
                  <WinsIcon
                    className="h-4 w-4"
                    id="desktop"
                    active={activeTab === 'wins'}
                  />
                  Wins
                </Button>
              </div>
            </div>

            {/* Messages/Wins - Scrollable */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea ref={scrollAreaRef} className="h-full bg-sidebar">
                <div
                  className={cn(
                    'p-4',
                    activeTab === 'chat' ? 'space-y-4' : 'space-y-2'
                  )}
                >
                  {activeTab === 'chat' ? (
                    <>
                      {isLoadingMessages ? (
                        // Loading skeleton for messages
                        Array.from({ length: 3 }).map((_, index) => (
                          <div
                            key={`skeleton-${index}`}
                            className="flex items-start space-x-2"
                          >
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="flex-1 min-w-0 space-y-2">
                              <div className="flex items-center space-x-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-16" />
                              </div>
                              <Skeleton className="h-4 w-full max-w-[200px]" />
                            </div>
                          </div>
                        ))
                      ) : messages.length > 0 ? (
                        messages.map((message) => (
                          <div
                            key={message.id}
                            className="flex items-start space-x-2"
                          >
                            <Avatar className="h-10 w-10 border-2 border-neutral-800">
                              <AvatarImage
                                src={message.senderImage || '/placeholder.svg'}
                              />
                              <AvatarFallback className="bg-neutral-700 text-white text-sm">
                                {message.senderName.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-300 text-sm">
                                  {message.senderName}
                                </span>
                                {message.formattedDate && (
                                  <span className="text-gray-500 text-xs">
                                    {message.formattedDate}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-400 text-sm leading-[1.3] break-words font-semibold">
                                {message.content}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col gap-2">
                          <p className="text-gray-400 text-center text-sm">
                            No messages yet
                          </p>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </>
                  ) : (
                    <>
                      {isLoadingWinningItems ? (
                        // Loading skeleton for winning items
                        Array.from({ length: 3 }).map((_, index) => (
                          <div
                            key={`skeleton-win-${index}`}
                            className="flex items-start space-x-2 py-2"
                          >
                            <Skeleton className="h-14 w-14 rounded-full" />
                            <div className="flex-1 min-w-0 space-y-2">
                              <Skeleton className="h-4 w-20" />
                              <Skeleton className="h-4 w-16" />
                            </div>
                          </div>
                        ))
                      ) : winningItems.length > 0 ? (
                        winningItems.map((item, index) => (
                          <div
                            key={`${item.title}-${index}`}
                            className="flex items-start space-x-2"
                          >
                            <div className="p-1 w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center">
                              <Image
                                src={item.image || '/placeholder.svg'}
                                alt={item.title}
                                width={1000}
                                height={1000}
                                className="w-12 h-12 object-cover rounded-full"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-300 text-sm">
                                  {item.title}
                                </span>
                              </div>
                              <div className="flex flex-col gap-1 mt-1">
                                <span className="text-gray-400 text-sm font-semibold">
                                  $ {item.amount}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col gap-2">
                          <p className="text-gray-400 text-center text-sm">
                            No winning items yet
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Input - Fixed at bottom (only show for chat tab) */}
            {activeTab === 'chat' && (
              <div className="flex-shrink-0 p-4 bg-sidebar">
                {/* <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-primary border-gray-600 text-white placeholder:text-gray-400 focus:border-primary-500"
                />
                <Button
                  onClick={sendMessage}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div> */}

                <div className="relative flex items-center w-full rounded-md bg-neutral-800 overflow-hidden">
                  <Input
                    type="text"
                    placeholder={
                      isAuthenticated
                        ? 'Send a message...'
                        : 'Please log in to send messages'
                    }
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={!isAuthenticated || sendMessageMutation.isPending}
                    className="flex-grow h-10 pl-4 pr-24 bg-transparent border-none text-gray-200 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:bg-transparent hover:text-gray-300"
                      disabled={!isAuthenticated}
                    >
                      <Smile className="h-5 w-5" />
                      <span className="sr-only">Add emoji</span>
                    </Button>
                    <Button
                      type="submit"
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={
                        !inputValue.trim() ||
                        !isAuthenticated ||
                        sendMessageMutation.isPending
                      }
                      className={cn(
                        'h-8 w-8 rounded-md bg-brand-purple text-white hover:bg-brand-purple/90',
                        !inputValue.trim() ||
                          !isAuthenticated ||
                          sendMessageMutation.isPending
                          ? 'opacity-50 cursor-not-allowed'
                          : 'cursor-pointer'
                      )}
                    >
                      <Send className="h-5 w-5" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full mt-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-[#BABABA] hover:text-[#6f6bff] p-1.5 rounded-md">
                      <DiscordIcon className="h-3 w-3" />
                    </div>
                    <div className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-[#BCBCBC] hover:text-[#6f6bff] p-1.5 rounded-md">
                      <XIcon className="h-3 w-3" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 p-1 px-1.5 text-xs rounded-md">
                    Chat Rules
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar - Overlay */}
      <div
        className={`lg:hidden fixed top-16 right-0 h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out z-40 ${
          isOpen ? 'w-80 bg-sidebar shadow-lg' : 'w-0'
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 w-full">
            <div className="flex items-center w-full p-1 bg-neutral-800 rounded-md gap-1">
              <Button
                className={cn(
                  'flex-1  border-gray-700 text-white bg-neutral-800  hover:text-white hover:bg-neutral-700 font-bold',
                  activeTab === 'chat' && 'bg-neutral-700 text-white'
                )}
                onClick={() => setActiveTab('chat')}
              >
                <ChatIcon
                  className="h-4 w-4"
                  id="mobile"
                  active={activeTab === 'chat'}
                />
                Chat
              </Button>
              <Button
                className={cn(
                  'flex-1  border-gray-700 text-gray-400 bg-neutral-800 hover:bg-neutral-700 hover:text-white font-bold',
                  activeTab === 'wins' && 'bg-neutral-700 text-white'
                )}
                onClick={() => setActiveTab('wins')}
              >
                <WinsIcon
                  className="h-4 w-4"
                  id="mobile"
                  active={activeTab === 'wins'}
                />
                Wins
              </Button>
            </div>
          </div>

          {/* Messages/Wins */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full bg-sidebar">
              <div
                className={cn(
                  'p-4',
                  activeTab === 'chat' ? 'space-y-4' : 'space-y-2'
                )}
              >
                {activeTab === 'chat' ? (
                  <>
                    {isLoadingMessages ? (
                      // Loading skeleton for messages
                      Array.from({ length: 3 }).map((_, index) => (
                        <div
                          key={`skeleton-mobile-${index}`}
                          className="flex items-start space-x-2"
                        >
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex items-center space-x-2">
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-3 w-16" />
                            </div>
                            <Skeleton className="h-4 w-full max-w-[200px]" />
                          </div>
                        </div>
                      ))
                    ) : messages.length > 0 ? (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className="flex items-start space-x-2"
                        >
                          <Avatar className="h-10 w-10 border-2 border-neutral-800">
                            <AvatarImage
                              src={message.senderImage || '/placeholder.svg'}
                            />
                            <AvatarFallback className="bg-neutral-700 text-white text-sm">
                              {message.senderName.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-300 text-sm">
                                {message.senderName}
                              </span>
                              {message.formattedDate && (
                                <span className="text-gray-500 text-xs">
                                  {message.formattedDate}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm leading-[1.3] break-words font-semibold">
                              {message.content}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col gap-2">
                        <p className="text-gray-400 text-center text-sm">
                          No messages yet
                        </p>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                ) : (
                  <>
                    {isLoadingWinningItems ? (
                      // Loading skeleton for winning items
                      Array.from({ length: 3 }).map((_, index) => (
                        <div
                          key={`skeleton-win-mobile-${index}`}
                          className="flex items-start space-x-2 py-2"
                        >
                          <Skeleton className="h-14 w-14 rounded-full" />
                          <div className="flex-1 min-w-0 space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </div>
                      ))
                    ) : winningItems.length > 0 ? (
                      winningItems.map((item, index) => (
                        <div
                          key={`${item.title}-${index}`}
                          className="flex items-start space-x-2"
                        >
                          <div className="p-1 w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center">
                            <Image
                              src={item.image || '/placeholder.svg'}
                              alt={item.title}
                              width={1000}
                              height={1000}
                              className="w-12 h-12 object-cover rounded-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-300 text-sm">
                                {item.title}
                              </span>
                            </div>
                            <div className="flex flex-col gap-1 mt-1">
                              <span className="text-gray-400 text-sm font-semibold">
                                $ {item.amount}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col gap-2">
                        <p className="text-gray-400 text-center text-sm">
                          No winning items yet
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Input (only show for chat tab) */}
          {activeTab === 'chat' && (
            <div className="flex-shrink-0 p-4 bg-sidebar">
              <div className="relative flex items-center w-full rounded-md bg-neutral-800 overflow-hidden">
                <Input
                  type="text"
                  placeholder={
                    isAuthenticated
                      ? 'Send a message...'
                      : 'Please log in to send messages'
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={!isAuthenticated || sendMessageMutation.isPending}
                  className="flex-grow h-10 pl-4 pr-24 bg-transparent border-none text-gray-200 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:bg-transparent hover:text-gray-300"
                    disabled={!isAuthenticated}
                  >
                    <Smile className="h-5 w-5" />
                    <span className="sr-only">Add emoji</span>
                  </Button>
                  <Button
                    type="submit"
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={
                      !inputValue.trim() ||
                      !isAuthenticated ||
                      sendMessageMutation.isPending
                    }
                    className={cn(
                      'h-8 w-8 rounded-md bg-brand-purple text-white hover:bg-brand-purple/90',
                      !inputValue.trim() ||
                        !isAuthenticated ||
                        sendMessageMutation.isPending
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer'
                    )}
                  >
                    <Send className="h-5 w-5" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between w-full mt-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-[#BABABA] hover:text-[#6f6bff] p-1.5 rounded-md">
                    <DiscordIcon className="h-3 w-3" />
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-[#BCBCBC] hover:text-[#6f6bff] p-1.5 rounded-md">
                    <XIcon className="h-3 w-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 p-1 px-1.5 text-xs rounded-md">
                  Chat Rules
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Toggle Button - Bottom Right (only when closed) */}
      <div
        className={`fixed bottom-14 -translate-y-1/2 z-50 transition-all block lg:hidden duration-300 ease-in-out ${
          isOpen ? 'right-80' : 'right-0'
        }`}
      >
        <Button
          onClick={onToggle}
          className="rounded-l-md rounded-r-none h-8 w-8 p-0 bg-brand-purple text-white hover:bg-brand-purple/80 shadow-lg cursor-pointer"
        >
          {isOpen ? (
            <ArrowRight className="h-5 w-5" />
          ) : (
            <ArrowLeft className="h-5 w-5" />
          )}
          <span className="sr-only">{isOpen ? 'Close chat' : 'Open chat'}</span>
        </Button>
      </div>
    </>
  )
}
