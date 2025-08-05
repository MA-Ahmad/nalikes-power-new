import { api } from './axios'

export interface RegisterData {
  username: string
  email: string
  password: string
  recaptchaToken: string
}

export interface LoginData {
  email: string
  password: string
  recaptchaToken: string
}

export interface AuthResponse {
  accessToken: string
  user: {
    id: string
    username: string
    email: string
    createdAt: Date
    lastLogin?: Date
  }
}

export const authApi = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data)
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },

  getMe: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },
}
