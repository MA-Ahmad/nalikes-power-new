'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'

export function useSafariCookieFix() {
  const [needsInit, setNeedsInit] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)

  const checkCookieSupport = () => {
    // Check if safari-init cookie exists (non-HttpOnly cookie we can read)
    const hasSafariInitCookie = document.cookie.includes('safari-init=true')

    // Check if we've already attempted initialization
    const hasAttemptedInit = localStorage.getItem('safari-cookie-attempted')

    return hasSafariInitCookie || hasAttemptedInit
  }

  useEffect(() => {
    // Detect Safari (but not Chrome-based browsers)
    const isSafari =
      typeof window !== 'undefined' &&
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

    if (isSafari) {
      const cookiesWorking = checkCookieSupport()

      if (!cookiesWorking) {
        setNeedsInit(true)
      }
    }
  }, [])

  const initializeCookies = async () => {
    try {
      setIsInitializing(true)

      const response = await api.post('/auth/init-safari-cookies')
      console.log('Safari cookie initialization response:', response)

      // Mark that we've attempted initialization
      localStorage.setItem('safari-cookie-attempted', 'true')

      // Wait a moment for cookie to be set, then recheck
      setTimeout(() => {
        const cookiesWorking = checkCookieSupport()
        console.log('Cookies working after init:', cookiesWorking)

        if (cookiesWorking) {
          setNeedsInit(false)
        }
        setIsInitializing(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to initialize Safari cookies:', error)
      setIsInitializing(false)
    }
  }

  return { needsInit, initializeCookies, isInitializing }
}
