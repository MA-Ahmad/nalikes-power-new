'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { authApi } from '@/lib/auth-api'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { checkAuth, user } = useAuthStore()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  )
  const [message, setMessage] = useState('')
  const [alreadyVerified, setAlreadyVerified] = useState(false)
  const [hasVerifiedToken, setHasVerifiedToken] = useState(false)

  const verifyEmailToken = useCallback(
    async (token: string) => {
      try {
        // Set a timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        })

        const response = (await Promise.race([
          authApi.verifyEmailToken(token),
          timeoutPromise,
        ])) as { success: boolean; message: string; alreadyVerified?: boolean }

        if (response.success) {
          setStatus('success')
          if (response.alreadyVerified) {
            setAlreadyVerified(true)
            setMessage('Your email is already verified.')
          } else {
            setMessage('Email verified successfully!')
            // Refresh user data to update emailVerified status
            checkAuth()
          }
          // Update URL to remove token and add success parameter
          router.replace(
            '/verify-email?success=true' +
              (response.alreadyVerified ? '&already_verified=true' : '')
          )
        } else {
          setStatus('error')
          setMessage(response.message || 'Verification failed.')
        }
      } catch (error: any) {
        // Even if the API call failed, check if the email was actually verified
        // This handles cases where the backend verifies but returns an unexpected response
        try {
          await checkAuth()
          // Get the updated user state after checkAuth
          const updatedUser = useAuthStore.getState().user
          if (updatedUser?.emailVerified) {
            // Email is verified, so treat as success
            setStatus('success')
            setMessage('Email verified successfully!')
            router.replace('/verify-email?success=true')
            return
          }
        } catch (authError) {
          // If checkAuth fails, continue with error handling
        }

        // If email is not verified, show the error
        setStatus('error')
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          'An error occurred during verification.'
        setMessage(errorMessage)

        // Try to extract error type from response
        if (
          errorMessage.includes('Invalid') ||
          errorMessage.includes('expired') ||
          errorMessage.includes('timeout')
        ) {
          router.replace('/verify-email?error=invalid_token')
        } else if (errorMessage.includes('not found')) {
          router.replace('/verify-email?error=user_not_found')
        } else {
          router.replace('/verify-email?error=unknown')
        }
      }
    },
    [checkAuth, router]
  )

  useEffect(() => {
    const success = searchParams.get('success')
    const error = searchParams.get('error')
    const alreadyVerifiedParam = searchParams.get('already_verified')
    const token = searchParams.get('token')

    // Handle redirect parameters from backend
    if (success === 'true') {
      setStatus('success')
      if (alreadyVerifiedParam === 'true') {
        setAlreadyVerified(true)
        setMessage('Your email is already verified.')
      } else {
        setMessage('Email verified successfully!')
        // Refresh user data to update emailVerified status
        checkAuth()
      }
    } else if (error) {
      setStatus('error')
      switch (error) {
        case 'invalid_token':
          setMessage(
            'Invalid or expired verification link. Please request a new one.'
          )
          break
        case 'user_not_found':
          setMessage('User not found. Please contact support.')
          break
        case 'missing_token':
          setMessage('Verification token is missing.')
          break
        default:
          setMessage('An error occurred during verification.')
      }
    } else if (token && !hasVerifiedToken) {
      // Token parameter present - verify it
      setHasVerifiedToken(true)
      verifyEmailToken(token)
    } else if (!token && !success && !error) {
      // No parameters at all - show message to request verification
      setStatus('error')
      setMessage(
        'No verification token found. Please check your email for the verification link.'
      )
    }
  }, [searchParams, checkAuth, hasVerifiedToken, verifyEmailToken])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(to_bottom,#11042F_0%,#04010E_100%)] p-4">
      <div className="max-w-md w-full bg-[#1a0f2e] border border-[#4A2F4C]/20 rounded-2xl p-8 shadow-xl">
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-4 text-center">
            <Loader2 className="w-12 h-12 text-brand-pink animate-spin" />
            <h2 className="text-2xl font-bold text-white">Verifying Email</h2>
            <p className="text-gray-400">Please wait...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-4 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <h2 className="text-2xl font-bold text-white">Email Verified</h2>
            <p className="text-gray-300">{message}</p>
            <div className="flex gap-3 mt-4 w-full">
              <Button
                onClick={() => router.push('/home')}
                variant="outline"
                className="flex-1 border-[#4A2F4C] text-gray-300 hover:bg-[#2a1f3e]"
              >
                Go Home
              </Button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-4 text-center">
            <XCircle className="w-16 h-16 text-red-500" />
            <h2 className="text-2xl font-bold text-white">
              Verification Failed
            </h2>
            <p className="text-gray-300">{message}</p>
            <div className="flex gap-3 mt-4 w-full">
              <Button
                onClick={() => router.push('/home')}
                className="flex-1 bg-gradient-to-b from-[#EE4FFB]/40 to-[#EE4FFB]/20 border border-brand-pink hover:bg-gradient-to-b from-[#EE4FFB]/40 to-[#EE4FFB]/20 text-white"
              >
                Go Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
