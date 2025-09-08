'use client'

import { useSafariCookieFix } from '@/hooks/use-safari-cookie-fix'

export function SafariCookieBanner() {
  const { needsInit, initializeCookies } = useSafariCookieFix()

  if (!needsInit) return null

  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div>
          <p className="text-sm">
            Safari requires cookie initialization for this site to work
            properly.
          </p>
        </div>
        <button
          onClick={initializeCookies}
          className="bg-white text-blue-600 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100"
        >
          Enable Cookies
        </button>
      </div>
    </div>
  )
}
