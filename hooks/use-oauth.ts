import { useState, useCallback } from 'react'

export interface OAuthResult {
  user: {
    id: string
    username: string
    email: string
    emailVerified?: boolean
    createdAt: Date | string
    lastLogin?: Date | string
    depositWalletAddresses?: {
      evm?: { address: string; totalAmount: number; availableAmount: number }
      solana?: { address: string; totalAmount: number; availableAmount: number }
      tron?: { address: string; totalAmount: number; availableAmount: number }
    }
  }
  accessToken: string
  isNewConnection?: boolean
}

export const useOAuth = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get API URL - for OAuth popups, we need the full backend URL
  // since popups don't go through Next.js rewrites
  const getApiUrl = () => {
    // If NEXT_PUBLIC_API_URL is set, use it (should be full backend URL)
    if (process.env.NEXT_PUBLIC_BACKEND_URL) {
      return process.env.NEXT_PUBLIC_BACKEND_URL
    }
    // Fallback: assume backend is on port 3300 (from next.config.ts)
    // In production, this should be set via NEXT_PUBLIC_BACKEND_URL
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:3300'
      }
    }
    // Production fallback - should be set via env var
    return window.location.origin
  }

  const loginWithOAuth = useCallback(
    async (
      provider: 'google' | 'twitter' | 'x',
      referralCode?: string
    ): Promise<OAuthResult> => {
      setLoading(true)
      setError(null)

      try {
        const apiUrl = getApiUrl()
        const params = new URLSearchParams()

        if (referralCode) {
          params.append('referralCode', referralCode)
        }

        // For OAuth popups, use the full backend URL directly
        // Popups don't go through Next.js rewrites, so we need the actual backend URL
        const authUrl = `${apiUrl}/api/auth/oauth/${provider}?${params.toString()}`

        // Open popup window
        const width = 500
        const height = 600
        const left = (window.screen.width - width) / 2
        const top = (window.screen.height - height) / 2

        const popup = window.open(
          authUrl,
          `${provider} OAuth`,
          `width=${width},height=${height},left=${left},top=${top}`
        )

        if (!popup) {
          setLoading(false)
          const errorMsg =
            'Failed to open OAuth popup. Please check your popup blocker settings.'
          setError(errorMsg)
          throw new Error(errorMsg)
        }

        return new Promise<OAuthResult>((resolve, reject) => {
          let resolved = false
          let intervalId: NodeJS.Timeout | null = null

          const cleanup = () => {
            if (intervalId) {
              clearInterval(intervalId)
              intervalId = null
            }
            window.removeEventListener('message', messageHandler)
          }

          const messageHandler = (event: MessageEvent) => {
            // Log for debugging
            console.log('OAuth message received:', {
              origin: event.origin,
              expectedOrigin: apiUrl,
              type: event.data?.type,
              data: event.data,
            })

            // Security: Verify origin - allow same origin or API URL
            const allowedOrigins = [
              apiUrl,
              window.location.origin,
              apiUrl.replace(/\/$/, ''), // Remove trailing slash
              window.location.origin.replace(/\/$/, ''), // Remove trailing slash
            ]

            if (!allowedOrigins.includes(event.origin)) {
              console.warn(
                'OAuth message from unexpected origin:',
                event.origin
              )
              return
            }

            if (event.data?.type === 'OAUTH_SUCCESS') {
              if (resolved) return
              resolved = true
              cleanup()
              popup?.close()
              setLoading(false)

              const { user, accessToken, isNewConnection } = event.data.data

              resolve({
                user,
                accessToken,
                isNewConnection,
              })
            } else if (event.data?.type === 'OAUTH_ERROR') {
              if (resolved) return
              resolved = true
              cleanup()
              popup?.close()
              setLoading(false)
              const errorMsg = event.data.error || 'OAuth authentication failed'
              setError(errorMsg)
              reject(new Error(errorMsg))
            }
          }

          window.addEventListener('message', messageHandler)

          // Handle popup closed manually - but give it more time
          // The popup might redirect multiple times during OAuth flow
          let checkCount = 0
          const maxChecks = 300 // 5 minutes (300 * 1 second)

          intervalId = setInterval(() => {
            if (resolved) {
              if (intervalId) clearInterval(intervalId)
              return
            }

            checkCount++

            if (popup?.closed) {
              // Only reject if we've given it enough time (at least 10 seconds)
              // This allows for OAuth redirects
              if (checkCount >= 10) {
                cleanup()
                setLoading(false)
                const errorMsg = 'OAuth popup was closed before completion'
                setError(errorMsg)
                reject(new Error(errorMsg))
              }
            }

            // Timeout after 5 minutes
            if (checkCount >= maxChecks) {
              cleanup()
              setLoading(false)
              const errorMsg = 'OAuth authentication timed out'
              setError(errorMsg)
              reject(new Error(errorMsg))
            }
          }, 1000)
        })
      } catch (err) {
        setLoading(false)
        const errorMsg = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMsg)
        throw err
      }
    },
    []
  )

  const connectOAuth = useCallback(
    async (provider: 'google' | 'twitter' | 'x'): Promise<OAuthResult> => {
      // For connecting OAuth to existing account, we can use the same flow
      // but with state parameter indicating it's a connection
      return loginWithOAuth(provider)
    },
    [loginWithOAuth]
  )

  return {
    loginWithOAuth,
    connectOAuth,
    loading,
    error,
    clearError: () => setError(null),
  }
}
