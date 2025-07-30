'use client'

import type React from 'react'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface ChatSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

interface Message {
  id: number
  text: string
  username: string
  avatar?: string
  level: number
  timestamp: Date
}

export function ChatSidebar({ isOpen, onToggle }: ChatSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'case-battles/4586797',
      username: 'Switchback',
      level: 20,
      timestamp: new Date(),
    },
    {
      id: 2,
      text: 'anyone still join battles this days?',
      username: 'Switchback',
      level: 20,
      timestamp: new Date(),
    },
    {
      id: 3,
      text: "make a group on I'll join",
      username: 'Majestic Dog',
      level: 5,
      timestamp: new Date(),
    },
    {
      id: 4,
      text: 'is there promo code that work ?',
      username: 'Kiwaanoo',
      level: 12,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')

  const sendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      username: 'You',
      level: 15,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <>
      {/* Desktop Sidebar Container - Fixed position */}
      <div className="hidden lg:block">
        {/* Toggle Button - Fixed adjacent to sidebar */}
        <div
          className={`fixed bottom-12 -translate-y-1/2 z-50 transition-all duration-300 ease-in-out ${
            isOpen ? 'right-80' : 'right-0'
          }`}
        >
          <Button
            onClick={onToggle}
            className="rounded-l-md rounded-r-none h-12 w-8 p-0 bg-primary hover:bg-primary/90 shadow-lg"
          >
            {isOpen ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
            <span className="sr-only">
              {isOpen ? 'Close chat' : 'Open chat'}
            </span>
          </Button>
        </div>

        {/* Sidebar - Fixed position */}
        <div
          className={`fixed top-16 right-0 h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out z-40 ${
            isOpen
              ? 'w-80 bg-sidebar border-l border-neutral-700 shadow-lg'
              : 'w-0'
          } overflow-hidden`}
        >
          <div className="flex flex-col h-full">
            {/* Header - Fixed */}
            <div className="flex-shrink-0 flex items-center justify-center p-4 border-b border-neutral-700 ">
              <h3 className="font-semibold text-white">Chat</h3>
            </div>

            {/* Messages - Scrollable */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full bg-sidebar">
                <div className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className="flex items-start space-x-3"
                    >
                      <Avatar className="h-10 w-10 border-2 border-neutral-800">
                        <AvatarImage
                          src={message.avatar || '/placeholder.svg'}
                        />
                        <AvatarFallback className="bg-neutral-700 text-white text-sm">
                          {message.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-white text-sm">
                            {message.username}
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-neutral-600 text-white text-xs px-2 py-0.5 rounded-full"
                          >
                            {message.level}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed break-words">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Input - Fixed at bottom */}
            <div className="flex-shrink-0 p-4 border-t border-neutral-700 bg-sidebar">
              <div className="flex space-x-2">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar - Overlay */}
      <div
        className={`lg:hidden fixed top-16 right-0 h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out z-40 ${
          isOpen
            ? 'w-80 bg-sidebar border-l border-neutral-700 shadow-lg'
            : 'w-0'
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-center p-4 border-b border-neutral-700">
            <h3 className="font-semibold text-white">Chat</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full bg-sidebar">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10 border-2 border-neutral-800">
                      <AvatarImage src={message.avatar || '/placeholder.svg'} />
                      <AvatarFallback className="bg-neutral-700 text-white text-sm">
                        {message.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-white text-sm">
                          {message.username}
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-neutral-600 text-white text-xs px-2 py-0.5 rounded-full"
                        >
                          {message.level}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed break-words">
                        {message.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Input */}
          <div className="flex-shrink-0 p-4 border-t border-neutral-700 bg-sidebar">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-primary-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary-500"
              />
              <Button
                onClick={sendMessage}
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Toggle Button - Bottom Right (only when closed) */}
      <div
        className={`fixed bottom-12 -translate-y-1/2 z-50 transition-all block lg:hidden duration-300 ease-in-out ${
          isOpen ? 'right-80' : 'right-0'
        }`}
      >
        <Button
          onClick={onToggle}
          className="rounded-l-md rounded-r-none h-12 w-8 p-0 bg-primary hover:bg-primary/90 shadow-lg"
        >
          {isOpen ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
          <span className="sr-only">{isOpen ? 'Close chat' : 'Open chat'}</span>
        </Button>
      </div>
    </>
  )
}
