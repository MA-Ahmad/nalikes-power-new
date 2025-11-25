'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { usePasswordReset } from '@/hooks/use-password-reset'

const requestResetSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type RequestResetFormData = z.infer<typeof requestResetSchema>

interface RequestPasswordResetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RequestPasswordResetDialog({
  open,
  onOpenChange,
}: RequestPasswordResetDialogProps) {
  const { requestPasswordReset, isRequestingReset } = usePasswordReset()

  const form = useForm<RequestResetFormData>({
    resolver: zodResolver(requestResetSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: RequestResetFormData) => {
    requestPasswordReset(
      { email: data.email },
      {
        onSuccess: () => {
          form.reset()
          onOpenChange(false)
        },
        onError: () => {
          // Modal stays open on error so user can retry
        },
      }
    )
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset()
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-400">
        <DialogTitle className="text-white text-2xl font-semibold">
          Reset Your Password
        </DialogTitle>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <p className="text-gray-400 text-sm">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>

          <div className="space-y-2">
            <Label htmlFor="reset-email" className="text-white">
              Email address
            </Label>
            <Input
              id="reset-email"
              type="email"
              {...form.register('email')}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              placeholder="Enter your email"
              disabled={isRequestingReset}
            />
            {form.formState.errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isRequestingReset}
              className="flex-1 border-gray-600 text-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isRequestingReset}
              className="flex-1 bg-[linear-gradient(to_right,_#6A2A97_0%,_#C753FD_53%,_#FA96FF_100%)] text-white font-semibold"
            >
              {isRequestingReset ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
