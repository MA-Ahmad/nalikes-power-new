import { create } from 'zustand'
import { api } from '@/lib/axios'
import axios from 'axios'

interface User {
  id: string
  username: string
  email: string
  createdAt: Date
  lastLogin?: Date
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
  error: string | null
  checkAuth: () => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User | null) => void
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  checkAuth: async () => {
    try {
      const response = await api.get<User>('/auth/me', { showToast: false })
      set({
        user: response.data,
        isAuthenticated: true,
        error: null,
      })
    } catch (err) {
      set({
        user: null,
        isAuthenticated: false,
        error: axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : err instanceof Error
          ? err.message
          : 'Authentication failed',
      })
    } finally {
      set({ loading: false })
    }
  },
  logout: async () => {
    try {
      await api.post('/auth/logout')
      set({
        user: null,
        isAuthenticated: false,
        error: null,
      })
    } catch (err) {
      console.error('Logout error:', err)
      set({
        error: axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : err instanceof Error
          ? err.message
          : 'Logout failed',
      })
    }
  },
}))
