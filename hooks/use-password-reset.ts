import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/lib/auth-api'
import { toast } from 'react-hot-toast'

export const usePasswordReset = () => {
  const requestResetMutation = useMutation({
    mutationFn: authApi.requestPasswordReset,
    onSuccess: (data) => {
      toast.success(data.message || 'Password reset email sent successfully!')
    },
    onError: (error: any) => {
      // Error toast is handled by axios interceptor
      console.error('Password reset request failed:', error)
    },
  })

  const resetPasswordMutation = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: (data) => {
      toast.success(data.message || 'Password reset successfully!')
    },
    onError: (error: any) => {
      // Error toast is handled by axios interceptor
      console.error('Password reset failed:', error)
    },
  })

  return {
    requestPasswordReset: requestResetMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    isRequestingReset: requestResetMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
    requestResetError: requestResetMutation.error,
    resetPasswordError: resetPasswordMutation.error,
  }
}

