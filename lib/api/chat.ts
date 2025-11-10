import { api } from '@/lib/axios'

// API response format
export interface ChatMessageResponse {
  id: string
  content: string
  timestamp: number
  formattedDate: string
  sender: {
    id: string
    username: string
    avatarUrl: string | null
    country: string | null
  }
}

// Transformed format for component use
export interface ChatMessage {
  id: string
  content: string
  senderName: string
  senderImage?: string
  senderCountry?: string
  formattedDate?: string
  timestamp?: number
  createdAt?: string
}

export interface SendMessageRequest {
  content: string
}

export interface SendMessageResponse {
  success: boolean
  message?: ChatMessage
}

export const chatApi = {
  // Send a chat message
  sendMessage: async (content: string): Promise<SendMessageResponse> => {
    const response = await api.post<SendMessageResponse>('/chat/send', {
      content,
    })
    return response.data
  },

  // Get chat messages - returns array directly
  getMessages: async (): Promise<ChatMessage[]> => {
    const response = await api.get<ChatMessageResponse[]>('/chat/messages')
    // Transform API response to component format
    return response.data.map((msg) => ({
      id: msg.id,
      content: msg.content,
      senderName: msg.sender.username,
      senderImage: msg.sender.avatarUrl || undefined,
      senderCountry: msg.sender.country || undefined,
      formattedDate: msg.formattedDate,
      timestamp: msg.timestamp,
    }))
  },
}
