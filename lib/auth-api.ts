import { api } from './axios'

export interface SendCodeData {
  username?: string // Required for signup
  email: string
  // recaptchaToken: string
  type: 'signup' | 'signin'
}

export interface VerifyCodeData {
  email: string
  code: string
  type: 'signup' | 'signin'
}

export interface AuthResponse {
  accessToken: string
  user: {
    id: string
    username: string
    email: string
    createdAt: Date
    lastLogin?: Date
    depositWalletAddresses?: {
      evm?: { address: string; totalAmount: number; availableAmount: number }
      solana?: { address: string; totalAmount: number; availableAmount: number }
      tron?: { address: string; totalAmount: number; availableAmount: number }
    }
  }
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

export const authApi = {
  sendCode: async (data: SendCodeData): Promise<SendCodeResponse> => {
    const response = await api.post('/auth/request-access', data)
    return response.data
  },

  verifyCode: async (data: VerifyCodeData): Promise<AuthResponse> => {
    const response = await api.post('/auth/confirm-access', data)
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },

  getMe: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  getAuthModalImages: async (): Promise<AuthModalImage[]> => {
    const response = await api.get<AuthModalImagesResponse>(
      '/auth-modal-images'
    )
    // Filter only active images and return the array
    return response.data.images.filter((img) => img.isActive)
  },
}
