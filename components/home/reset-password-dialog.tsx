'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Check, X as XIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { usePasswordReset } from '@/hooks/use-password-reset'

// Password validation schema matching the backend requirements
const passwordSchema = z.string().refine(
  (val) => {
    const conditions = {
      minLength: val.length >= 8,
      hasLowercase: /[a-z]/.test(val),
      hasUppercase: /[A-Z]/.test(val),
      hasNumber: /[0-9]/.test(val),
    }
    return Object.values(conditions).every(Boolean)
  },
  {
    message: 'Password does not meet all requirements',
  }
)

const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

interface ResetPasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  token: string
  onSuccess?: () => void
}

export function ResetPasswordDialog({
  open,
  onOpenChange,
  token,
  onSuccess,
}: ResetPasswordDialogProps) {
  const { resetPassword, isResettingPassword } = usePasswordReset()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [success, setSuccess] = useState(false)

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  // Password validation helper function
  const checkPasswordConditions = (password: string) => {
    return {
      minLength: password.length >= 8,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
    }
  }

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      form.setError('root', {
        message: 'Invalid reset token. Please request a new password reset.',
      })
      return
    }

    resetPassword(
      {
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
      {
        onSuccess: () => {
          setSuccess(true)
          form.reset()
          // Close dialog after 3 seconds and call onSuccess callback
          setTimeout(() => {
            setSuccess(false)
            onOpenChange(false)
            if (onSuccess) {
              onSuccess()
            }
          }, 3000)
        },
      }
    )
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset()
      setSuccess(false)
      setShowPassword(false)
      setShowConfirmPassword(false)
    }
    onOpenChange(newOpen)
  }

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!open) {
      form.reset()
      setSuccess(false)
      setShowPassword(false)
      setShowConfirmPassword(false)
    }
  }, [open, form])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-400">
        <DialogTitle className="text-white text-2xl font-semibold">
          Set New Password
        </DialogTitle>

        {success ? (
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded">
              <p className="text-sm">
                Your password has been reset successfully! Redirecting to
                login...
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <p className="text-gray-400 text-sm">
              Enter your new password below.
            </p>

            {form.formState.errors.root && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded">
                <p className="text-sm">{form.formState.errors.root.message}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="reset-password" className="text-white">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="reset-password"
                  type={showPassword ? 'text' : 'password'}
                  {...form.register('password')}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pr-10"
                  placeholder="Enter new password"
                  disabled={isResettingPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {(() => {
                const password = form.watch('password')
                const conditions = checkPasswordConditions(password || '')
                const hasErrors = form.formState.errors.password
                const showConditions = password && password.length > 0

                if (!showConditions && !hasErrors) return null

                return (
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    {[
                      {
                        key: 'minLength',
                        label: 'Min 8 Characters',
                        met: conditions.minLength,
                      },
                      {
                        key: 'hasLowercase',
                        label: '1 Lowercase',
                        met: conditions.hasLowercase,
                      },
                      {
                        key: 'hasUppercase',
                        label: '1 Uppercase',
                        met: conditions.hasUppercase,
                      },
                      {
                        key: 'hasNumber',
                        label: '1 Number',
                        met: conditions.hasNumber,
                      },
                    ].map((condition) => (
                      <div
                        key={condition.key}
                        className="flex items-center gap-1"
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            condition.met ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        >
                          {condition.met ? (
                            <Check className="w-2.5 h-2.5 text-white" />
                          ) : (
                            <XIcon className="w-2 h-2 text-white" />
                          )}
                        </div>
                        <span
                          className={`text-[11px] font-bold ${
                            condition.met
                              ? 'text-green-400'
                              : 'text-red-400'
                          }`}
                        >
                          {condition.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              })()}
              {form.formState.errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reset-confirm-password" className="text-white">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="reset-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...form.register('confirmPassword')}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pr-10"
                  placeholder="Confirm new password"
                  disabled={isResettingPassword}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  aria-label={
                    showConfirmPassword ? 'Hide password' : 'Show password'
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {form.formState.errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isResettingPassword}
                className="flex-1 border-gray-600 text-white hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isResettingPassword || !token}
                className="flex-1 bg-[linear-gradient(to_right,_#6A2A97_0%,_#C753FD_53%,_#FA96FF_100%)] text-white font-semibold"
              >
                {isResettingPassword ? 'Resetting Password...' : 'Reset Password'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

