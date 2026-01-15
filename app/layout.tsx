import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { QueryProvider } from '@/context/query-provider'
import { AuthProvider } from '@/context/auth-provider'
import { Toaster } from 'react-hot-toast'
import { AppLoader } from '@/components/app-loader'
import { MobileBottomNavbar } from '@/components/home/mobile-bottom-navbar'
import {
  aeonikBold,
  aeonikLight,
  aeonikMedium,
  aeonikMonoBlack,
  aeonikMonoRegular,
  aeonikRegular,
} from './fonts'
import Script from 'next/script'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Power.win - Crypto Casino where the edge belongs to the player',
  description:
    'Play games, win prizes, and climb the leaderboard with Power.win',
  verification: {
    google: 'mREN--1L8N-o5TCL03M9AKNu7ntX2Zxl9gqYxCF6jco',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${aeonikRegular.variable} ${aeonikBold.variable} ${aeonikLight.variable} ${aeonikMedium.variable} ${aeonikMonoRegular.variable} ${aeonikMonoBlack.variable}`}
      >
        {/* Google Tag Manager - loads early for proper tracking */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-THNLQSJL');`,
          }}
        />
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VX3GYJ2KTF"
          strategy="afterInteractive"
        />
        <Script
          id="ga4-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VX3GYJ2KTF');
            `,
          }}
        />
        {/* Google Tag Manager (noscript) - fallback for users with JavaScript disabled */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-THNLQSJL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <AppLoader>
                {children}
                <MobileBottomNavbar />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    style: {
                      background: '#1f2937',
                      color: '#f9fafb',
                      border: '1px solid #374151',
                    },
                    success: {
                      iconTheme: {
                        primary: '#10b981',
                        secondary: '#f9fafb',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: '#ef4444',
                        secondary: '#f9fafb',
                      },
                    },
                  }}
                />
              </AppLoader>
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
