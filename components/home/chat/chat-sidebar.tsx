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
import { cn } from '@/lib/utils'
import { ChatIcon, DiscordIcon, WinsIcon, XIcon } from '@/components/icons'
import { chatApi, ChatMessage } from '@/lib/api/chat'
import { useAuthStore } from '@/store/auth'

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
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [isInitialMount, setIsInitialMount] = useState(true)

  const { isAuthenticated, user } = useAuthStore()

  // Fetch messages helper
  const fetchMessages = async () => {
    try {
      const messages = await chatApi.getMessages()
      // Messages are already formatted by the API function
      setMessages(messages)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  // Fetch messages on component mount
  useEffect(() => {
    if (isOpen) {
      fetchMessages()
      setIsInitialMount(false)
    }
  }, [])

  // Update polling when chat open/close state changes
  useEffect(() => {
    if (!isOpen) return

    // Initial fetch when chat opens
    fetchMessages()

    // Set up polling every 30 seconds
    const interval = setInterval(() => {
      fetchMessages()
    }, 30000) // 30 seconds

    // Clean up interval on component unmount or when effect re-runs
    return () => {
      clearInterval(interval)
    }
  }, [isOpen])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (!isInitialMount && isOpen) {
      const timeoutId = setTimeout(() => {
        scrollToBottom()
      }, 100)
      return () => clearTimeout(timeoutId)
    }
  }, [messages, isInitialMount, isOpen])

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

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !isAuthenticated || isLoading) return

    const messageText = inputValue.trim()
    setInputValue('')
    setIsLoading(true)

    // Optimistically add message
    const tempMessage: ChatMessage = {
      id: `temp_${Date.now()}`,
      content: messageText,
      senderName: user?.username || 'You',
      senderImage: undefined,
      formattedDate: formatTimestamp(new Date()),
    }

    setMessages((prev) => [...prev, tempMessage])
    setTimeout(() => scrollToBottom('smooth'), 100)

    try {
      await chatApi.sendMessage(messageText)
      // Refetch messages to get the actual message from server
      await fetchMessages()
    } catch (error) {
      console.error('Error sending message:', error)
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id))
    } finally {
      setIsLoading(false)
    }
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

            {/* Messages - Scrollable */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea ref={scrollAreaRef} className="h-full bg-sidebar">
                <div className="p-4 space-y-4">
                  {messages.length > 0 ? (
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
                </div>
              </ScrollArea>
            </div>

            {/* Input - Fixed at bottom */}
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
                  disabled={!isAuthenticated || isLoading}
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
                      !inputValue.trim() || !isAuthenticated || isLoading
                    }
                    className={cn(
                      'h-8 w-8 rounded-md bg-brand-purple text-white hover:bg-brand-purple/90',
                      !inputValue.trim() || !isAuthenticated || isLoading
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

          {/* Messages */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full bg-sidebar">
              <div className="p-4 space-y-4">
                {messages.length > 0 ? (
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
              </div>
            </ScrollArea>
          </div>

          {/* Input */}
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
                disabled={!isAuthenticated || isLoading}
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
                  disabled={!inputValue.trim() || !isAuthenticated || isLoading}
                  className={cn(
                    'h-8 w-8 rounded-md bg-brand-purple text-white hover:bg-brand-purple/90',
                    !inputValue.trim() || !isAuthenticated || isLoading
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
