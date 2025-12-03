import { api } from './axios'

export interface SendCodeData {
  username?: string // Required for signup
  email: string
  // recaptchaToken: string
  type: 'signup' | 'signin' | 'verify-email'
}

export interface VerifyCodeData {
  email: string
  code: string
  type: 'signup' | 'signin'
}

export interface SignupData {
  username: string
  email: string
  password: string
  referralCode?: string
}

export interface SigninData {
  usernameOrEmail: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  user: {
    id: string
    username: string
    email: string
    emailVerified?: boolean
    profileCompleted?: boolean
    createdAt: Date
    lastLogin?: Date
    depositWalletAddresses?: {
      evm?: { address: string; totalAmount: number; availableAmount: number }
      solana?: { address: string; totalAmount: number; availableAmount: number }
      tron?: { address: string; totalAmount: number; availableAmount: number }
    }
  }
}

export interface VerifyEmailData {
  email: string
  code: string
}

export interface VerifyEmailResponse {
  success: boolean
  message: string
}

export interface SendCodeResponse {
  message: string
}

export interface MediaImage {
  id: string
  image: string
  type?: string
  title?: string
  description?: string
  orderIndex: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface MediaImagesResponse {
  success: boolean
  images: MediaImage[]
}

// Legacy alias for backward compatibility
export type AuthModalImage = MediaImage

export interface RequestPasswordResetData {
  email: string
}

export interface RequestPasswordResetResponse {
  message: string
}

export interface ResetPasswordData {
  token: string
  password: string
  confirmPassword: string
}

export interface ResetPasswordResponse {
  success: boolean
  message: string
}

export interface SendEmailVerificationResponse {
  message: string
}

export const authApi = {
  sendCode: async (data: SendCodeData): Promise<SendCodeResponse> => {
    const response = await api.post('/auth/send-code', data)
    return response.data
  },

  verifyCode: async (data: VerifyCodeData): Promise<AuthResponse> => {
    const response = await api.post('/auth/verify-code', data)
    return response.data
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', data)
    return response.data
  },

  signin: async (data: SigninData): Promise<AuthResponse> => {
    const response = await api.post('/auth/signin', data)
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },

  getMe: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  verifyEmail: async (data: VerifyEmailData): Promise<VerifyEmailResponse> => {
    const response = await api.post('/auth/verify-email', data)
    return response.data
  },

  getMediaImages: async (type?: string): Promise<MediaImage[]> => {
    const response = await api.get<MediaImagesResponse>('/media-images')
    // API already returns only active images, but filter by type if provided
    let images = response.data.images
    if (type) {
      images = images.filter(
        (img) => img.type?.toUpperCase() === type.toUpperCase()
      )
    }
    // Sort by orderIndex
    return images.sort((a, b) => a.orderIndex - b.orderIndex)
  },

  // Legacy method for backward compatibility
  getAuthModalImages: async (type?: string): Promise<MediaImage[]> => {
    const response = await api.get<MediaImagesResponse>('/media-images')
    // API already returns only active images, but filter by type if provided
    let images = response.data.images
    if (type) {
      images = images.filter(
        (img) => img.type?.toUpperCase() === type.toUpperCase()
      )
    }
    // Sort by orderIndex
    return images.sort((a, b) => a.orderIndex - b.orderIndex)
  },

  requestPasswordReset: async (
    data: RequestPasswordResetData
  ): Promise<RequestPasswordResetResponse> => {
    const response = await api.post('/auth/request-password-reset', data)
    return response.data
  },

  resetPassword: async (
    data: ResetPasswordData
  ): Promise<ResetPasswordResponse> => {
    const response = await api.post('/auth/reset-password', data)
    return response.data
  },

  sendEmailVerification: async (): Promise<SendEmailVerificationResponse> => {
    const response = await api.post('/auth/send-email-verification')
    return response.data
  },

  verifyEmailToken: async (
    token: string
  ): Promise<{
    success: boolean
    message: string
    alreadyVerified?: boolean
  }> => {
    try {
      const response = await api.get(`/auth/verify-email?token=${token}`, {
        showToast: false, // Don't show toast for this, we'll handle it in the component
        maxRedirects: 5, // Allow following redirects
      })

      // Check if response has JSON data with success field
      if (
        response.data &&
        typeof response.data === 'object' &&
        response.data !== null &&
        !Array.isArray(response.data)
      ) {
        if ('success' in response.data) {
          return response.data as {
            success: boolean
            message: string
            alreadyVerified?: boolean
          }
        }
      }

      // If we get a successful status (200-299), the verification succeeded
      // The backend would have redirected to an error page if it failed
      if (response.status >= 200 && response.status < 300) {
        return {
          success: true,
          message: 'Email verified successfully!',
        }
      }

      // If we get here, something unexpected happened
      return {
        success: true,
        message: 'Email verified successfully!',
      }
    } catch (error: any) {
      // Check if it's a 4xx error (client error - invalid token, etc.)
      if (error.response?.status >= 400 && error.response?.status < 500) {
        const errorData = error.response?.data
        const errorMessage = errorData?.message || 'Verification failed.'

        // Check if the error response contains redirect info
        if (
          errorMessage.includes('invalid') ||
          errorMessage.includes('expired')
        ) {
          return {
            success: false,
            message:
              'Invalid or expired verification link. Please request a new one.',
          }
        }

        return {
          success: false,
          message: errorMessage,
        }
      }

      // For other errors (network, timeout, etc.), re-throw to be handled by component
      throw error
    }
  },
}
