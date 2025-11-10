import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { chatApi, ChatMessage } from '@/lib/api/chat'

// React Query Hook for fetching chat messages
export const useChatMessages = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['chat-messages'],
    queryFn: () => chatApi.getMessages(),
    enabled,
    staleTime: 30000, // 30 seconds
    refetchInterval: enabled ? 30000 : false, // Poll every 30 seconds when enabled
  })
}

// React Query Hook for sending chat messages
export const useSendChatMessage = (options?: {
  onSuccess?: () => void
  onError?: (error: Error) => void
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (content: string) => {
      return await chatApi.sendMessage(content)
    },
    onSuccess: () => {
      // Invalidate and refetch messages after sending
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] })
      options?.onSuccess?.()
    },
    onError: (error) => {
      options?.onError?.(error)
    },
  })
}

