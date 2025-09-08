'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'

export function useSafariCookieFix() {
  const [needsInit, setNeedsInit] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)

  const isSafari = () => {
    return (
      typeof window !== 'undefined' &&
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    )
  }

  const checkCookieSupport = () => {
    // For Safari, check if we have a token in localStorage as fallback
    const hasLocalToken = localStorage.getItem('safari-auth-token')
    const hasSafariInitCookie = document.cookie.includes('safari-init=true')
    const hasAttemptedInit = localStorage.getItem('safari-cookie-attempted')

    console.log('Cookie check:', {
      allCookies: document.cookie,
      hasSafariInitCookie,
      hasAttemptedInit,
      hasLocalToken,
    })

    return hasSafariInitCookie || hasAttemptedInit || hasLocalToken
  }

  useEffect(() => {
    console.log('Safari detection:', {
      userAgent: navigator.userAgent,
      isSafari: isSafari(),
    })

    if (isSafari()) {
      const cookiesWorking = checkCookieSupport()

      if (!cookiesWorking) {
        setNeedsInit(true)
      }
    }
  }, [])

  const initializeCookies = async () => {
    try {
      setIsInitializing(true)

      console.log('Attempting to initialize Safari cookies...')

      // For Safari, try to get auth status and store token in localStorage
      try {
        const authResponse = await api.get('/auth/me')
        if (authResponse.data) {
          // User is authenticated, store a flag in localStorage
          localStorage.setItem('safari-auth-token', 'authenticated')
          console.log('User is already authenticated, stored in localStorage')
        }
      } catch (authError: any) {
        console.log('User not authenticated:', authError?.response?.status)
      }

      const response = await api.post('/auth/init-safari-cookies')
      console.log('Safari cookie initialization response:', response.data)

      // Mark that we've attempted initialization
      localStorage.setItem('safari-cookie-attempted', 'true')

      // Wait a moment for cookie to be set, then recheck
      setTimeout(() => {
        const cookiesWorking = checkCookieSupport()
        console.log('Cookies working after init:', cookiesWorking)

        setNeedsInit(false)
        setIsInitializing(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to initialize Safari cookies:', error)

      // Even if it fails, mark as attempted and hide banner
      localStorage.setItem('safari-cookie-attempted', 'true')
      setNeedsInit(false)
      setIsInitializing(false)
    }
  }

  return { needsInit, initializeCookies, isInitializing, isSafari: isSafari() }
}
