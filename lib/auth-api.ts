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
  usernameOrEmail: string
  password: string
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

export interface AuthModalImage {
  id: string
  image: string
  title: string
  description: string
  orderIndex: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthModalImagesResponse {
  images: AuthModalImage[]
}

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

  getAuthModalImages: async (): Promise<AuthModalImage[]> => {
    const response = await api.get<AuthModalImagesResponse>(
      '/auth-modal-images'
    )
    // Filter only active images and return the array
    return response.data.images.filter((img) => img.isActive)
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
}
