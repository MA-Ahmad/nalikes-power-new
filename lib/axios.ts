import axios from 'axios'
import { toast } from 'react-hot-toast'

// Better API URL handling
// const getApiUrl = () => {
//   const envUrl = process.env.NEXT_PUBLIC_API_URL

//   // If environment variable is set, use it as-is (should be full URL with protocol)
//   if (envUrl) {
//     return envUrl
//   }

//   // Development fallback
//   return 'http://localhost:3000'
// }

// const baseUrl = getApiUrl()

// Use relative path for API calls since Next.js rewrites will handle the proxying
const baseUrl = '/api'

export const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for Safari compatibility
api.interceptors.request.use(
  (config) => {
    // Ensure credentials are always sent for Safari
    config.withCredentials = true
    return config
  },
  (error) => Promise.reject(error)
)

// Add request interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the request config has showToast set to false
    const showToast = error.config?.showToast ?? true

    const errorMessage =
      error?.response?.data?.message || error?.message || 'An error occurred'

    if (showToast) {
      toast.error(errorMessage)
    }

    return Promise.reject(error)
  }
)

// Helper type to extend axios request config
declare module 'axios' {
  export interface AxiosRequestConfig {
    showToast?: boolean
  }
}
