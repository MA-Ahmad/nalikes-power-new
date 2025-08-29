import { Metadata } from 'next'

const seoKeywords = [
  // General Keywords
  'Web3 development agency',
]

export function generatePageMetadata({
  title,
  description,
  ogImagePath = '/opengraph-image.png',
  path = '',
}: {
  title?: string
  description: string
  ogImagePath?: string
  path?: string
}): Metadata {
  const isHomePage = !title // Assuming that if no title is passed, it's the home page
  const fullTitle = isHomePage
    ? 'Powerblock'
    : `${title ? `${title} | ` : ''} Powerblock`
  const descriptionText =
    description ||
    'Powerblock is a platform for building your Web3 products in Weeks, not Months'
  const baseUrl = 'https://powerblock.io'
  const fullUrl = `${baseUrl}${path}`

  return {
    title: fullTitle,
    description: descriptionText,
    keywords: seoKeywords,
    openGraph: {
      title: fullTitle,
      description: descriptionText,
      type: 'website',
      locale: 'en_US',
      url: fullUrl,
      siteName: 'Powerblock',
      images: [
        {
          url: ogImagePath,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: descriptionText,
      creator: '@powerblock',
      site: '@powerblock',
      images: [ogImagePath],
    },
    metadataBase: new URL(baseUrl),
  }
}
