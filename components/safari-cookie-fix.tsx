'use client'

import { useEffect } from 'react'

export function SafariCookieFix() {
  useEffect(() => {
    // Safari-specific cookie fix
    if (
      typeof window !== 'undefined' &&
      window.navigator.userAgent.includes('Safari') &&
      !window.navigator.userAgent.includes('Chrome') // Exclude Chrome-based browsers
    ) {
      // Force reload if cookies are not working
      const checkCookies = () => {
        if (!document.cookie.includes('accessToken')) {
          // Try to refresh the page once
          if (!sessionStorage.getItem('safari-cookie-retry')) {
            sessionStorage.setItem('safari-cookie-retry', 'true')
            window.location.reload()
          }
        }
      }

      // Check after a short delay
      setTimeout(checkCookies, 1000)
    }
  }, [])

  return null // This component doesn't render anything
}
