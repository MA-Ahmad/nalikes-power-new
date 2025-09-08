'use client'

import { useSafariCookieFix } from '@/hooks/use-safari-cookie-fix'
import { useState } from 'react'

export function SafariCookieBanner() {
  const { needsInit, initializeCookies, isInitializing, isSafari } =
    useSafariCookieFix()
  const [dismissed, setDismissed] = useState(false)

  if (!needsInit || dismissed || !isSafari) return null

  return (
    <div className="fixed top-16 left-0 right-0 bg-blue-600 text-white p-4 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm">
            <strong>Safari User:</strong> Due to Safari's privacy settings, some
            features may require initialization. Click "Initialize" to enable
            full functionality.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={initializeCookies}
            disabled={isInitializing}
            className="bg-white text-blue-600 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isInitializing ? 'Initializing...' : 'Initialize'}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-white hover:text-gray-200 p-1"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
