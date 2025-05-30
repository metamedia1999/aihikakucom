/* eslint-disable @next/next/no-page-custom-font */
import './globals.css'
import type { Metadata } from 'next'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CTAFreeDiagnosis } from '@/components/modals/cta-free-diagnosis'
import { headers } from 'next/headers'

export const metadata: Metadata = {
  metadataBase: new URL('https://ai比較.com'),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://ai比較.com',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: 'https://img.ai-daiko.com/ogp.webp',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['https://img.ai-daiko.com/ogp.webp'],
  },
  alternates: {
    canonical: 'https://ai比較.com',
  },
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const heads = await headers()
  const pathname = heads.get('next-url') || '/'
  const metadataBase = metadata.metadataBase?.toString() || 'https://ai-hikaku.com'

  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={metadataBase.replace(/\/$/, '') + pathname} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "url": "https://ai比較.com",
              "name": SITE_NAME,
              "logo": "https://img.ai-daiko.com/logo.webp",
              "description": SITE_DESCRIPTION,
              "sameAs": ["https://twitter.com/aihikaku"]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <CTAFreeDiagnosis />
        </div>
      </body>
    </html>
  )
}
