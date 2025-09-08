'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'

export function useSafariCookieFix() {
  const [needsInit, setNeedsInit] = useState(false)

  useEffect(() => {
    // Detect Safari (but not Chrome-based browsers)
    const isSafari =
      typeof window !== 'undefined' &&
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

    if (isSafari) {
      // Check if cookies are working
      const hasCookies =
        document.cookie.includes('accessToken') ||
        document.cookie.includes('safari-init')

      if (!hasCookies) {
        setNeedsInit(true)
      }
    }
  }, [])

  const initializeCookies = async () => {
    try {
      await api.post('/auth/init-safari-cookies')
      setNeedsInit(false)
      // Reload page after initialization
      window.location.reload()
    } catch (error) {
      console.error('Failed to initialize Safari cookies:', error)
    }
  }

  return { needsInit, initializeCookies }
}
