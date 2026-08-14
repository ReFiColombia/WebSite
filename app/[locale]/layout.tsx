import Navbar from '@/components/Navbar'
import { CampaignBanner } from '@/components/home/refi/CampaignBanner'
import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Outfit } from 'next/font/google'
import Providers from './providers'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { Toaster } from '@/components/ui/toaster'
import { unstable_setRequestLocale } from 'next-intl/server'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap'
})

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap'
})

const SITE_URL = 'https://reficolombia.org'
const TITLE = 'ReFi Colombia - Finanzas que regeneran'
const DESCRIPTION =
  'ReFi Colombia es la comunidad nacional de finanzas regenerativas que reorienta el dinero hacia lo vivo: ecosistemas, comunidades y bienes comunes. Del extraer al regenerar.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: '%s - ReFi Colombia' },
  description: DESCRIPTION,
  applicationName: 'ReFi Colombia',
  keywords: [
    'ReFi Colombia',
    'finanzas regenerativas',
    'regenerative finance',
    'ReFi',
    'Celo',
    'blockchain',
    'Web3',
    'Colombia'
  ],
  authors: [{ name: 'ReFi Colombia', url: SITE_URL }],
  openGraph: {
    type: 'website',
    siteName: 'ReFi Colombia',
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: TITLE }]
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    site: '@RefiColombia',
    images: ['/og.jpg']
  },
  robots: { index: true, follow: true },
  themeColor: '#0e1220',
  colorScheme: 'dark'
}

export async function generateStaticParams () {
  return [{ locale: 'en' }, { locale: 'es' }]
}
const locales = ['en', 'es']
export default async function RootLayout ({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  pageProps: any
  params: any
}) {
  if (!locales.includes(locale as any)) notFound()
  unstable_setRequestLocale(locale)
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${outfit.variable}`}
    >
      <body className='grain min-h-dvh bg-bg text-fg antialiased'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <CampaignBanner />
            <Navbar />
            {children}
            <Toaster />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
