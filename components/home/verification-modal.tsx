'use client'

import { X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useWallet } from '@/hooks/use-wallet'

import { authApi, VerifyCodeData } from '@/lib/auth-api'
import { useAuthStore } from '@/store/auth'

const verificationSchema = z.object({
  code: z
    .string()
    .length(6, 'Verification code must be 6 digits')
    .regex(/^\d+$/, 'Code must contain only numbers'),
})

type VerificationFormData = z.infer<typeof verificationSchema>

interface VerificationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  email: string
  type: 'signup' | 'signin'
  onResendCode: () => void
}

export function VerificationModal({
  open,
  onOpenChange,
  email,
  type,
  onResendCode,
}: VerificationModalProps) {
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { setUser, setIsAuthenticated } = useAuthStore()
  const { isConnected } = useWallet()

  const form = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: '',
    },
  })

  // Timer countdown
  useEffect(() => {
    if (open && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current)
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [open, timeLeft])

  // Reset timer when modal opens
  useEffect(() => {
    if (open) {
      setTimeLeft(300)
      form.reset()
    }
  }, [open, form])

  const verifyMutation = useMutation({
    mutationFn: authApi.verifyCode,
    onSuccess: (data) => {
      setUser({
        ...data.user,
        walletConnected: isConnected,
      })
      setIsAuthenticated(true)
      toast.success(
        type === 'signup' ? 'Account created successfully!' : 'Welcome back!'
      )
      onOpenChange(false)
    },
    onError: () => {
      // Error handling is done by axios interceptor
      form.reset()
    },
  })

  const onSubmit = async (data: VerificationFormData) => {
    const verifyData: VerifyCodeData = {
      email,
      code: data.code,
      type,
    }

    verifyMutation.mutate(verifyData)
  }

  const handleResendCode = () => {
    setTimeLeft(300)
    form.reset()
    onResendCode()
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const isLoading = verifyMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full max-w-md mx-4 p-0 bg-neutral-900 border-neutral-400 overflow-hidden rounded-2xl"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Email Verification</DialogTitle>
        <div className="relative">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Check Your Email
              </h2>
              <p className="text-gray-300 text-sm">
                We&apos;ve sent a 6-digit verification code to
              </p>
              <p className="text-white font-medium">{email}</p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-white text-center block">
                  Enter Verification Code
                </Label>
                <Input
                  id="code"
                  {...form.register('code')}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 text-center text-2xl tracking-widest font-mono"
                  placeholder="000000"
                  maxLength={6}
                  autoComplete="one-time-code"
                />
                {form.formState.errors.code && (
                  <p className="text-red-400 text-sm text-center">
                    {form.formState.errors.code.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[linear-gradient(to_right,_#6A2A97_0%,_#C753FD_53%,_#FA96FF_100%)] text-white font-semibold py-3"
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm mb-2">
                {timeLeft > 0 ? (
                  <>Code expires in {formatTime(timeLeft)}</>
                ) : (
                  <>Code has expired</>
                )}
              </p>

              {/* {timeLeft === 0 ? (
                <Button
                  variant="ghost"
                  onClick={handleResendCode}
                  className="text-purple-400 hover:text-purple-300"
                >
                  Resend Code
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  onClick={handleResendCode}
                  className="text-gray-500 hover:text-gray-400"
                >
                  Resend Code
                </Button>
              )} */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
