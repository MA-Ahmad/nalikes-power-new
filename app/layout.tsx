import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Power Win',
  description: 'Power Win',
  keywords: ['web3'],
  metadataBase: new URL('https://power.win'),

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },

  openGraph: {
    title: 'Power Win',
    description: 'Power Win',
    type: 'website',
    locale: 'en_US',
    url: 'https://power.win',
    siteName: 'Power Win',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Power Win',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Power Win',
    description: 'Power Win',
    creator: '@Power Win',
    site: '@Power Win',
    images: {
      url: '/og-image.png',
      alt: 'Power Win',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
