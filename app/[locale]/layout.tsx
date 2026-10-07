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
import { SOCIALS } from '@/lib/links'

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

const META = {
  es: {
    title: 'ReFi Colombia - Finanzas que regeneran',
    description:
      'ReFi Colombia es la comunidad nacional de finanzas regenerativas que reorienta el dinero hacia lo vivo: ecosistemas, comunidades y bienes comunes. Del extraer al regenerar.',
    ogLocale: 'es_CO'
  },
  en: {
    title: 'ReFi Colombia - Finance that regenerates',
    description:
      'ReFi Colombia is the national regenerative finance community redirecting money toward living systems: ecosystems, communities and the commons. From extracting to regenerating.',
    ogLocale: 'en_US'
  }
} as const

type Locale = keyof typeof META

export async function generateMetadata ({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const l: Locale = locale === 'en' ? 'en' : 'es'
  const m = META[l]
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: m.title, template: '%s - ReFi Colombia' },
    description: m.description,
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
    alternates: {
      canonical: `/${l}`,
      languages: { es: '/es', en: '/en', 'x-default': '/es' }
    },
    openGraph: {
      type: 'website',
      siteName: 'ReFi Colombia',
      title: m.title,
      description: m.description,
      url: `${SITE_URL}/${l}`,
      locale: m.ogLocale,
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: m.title }]
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      site: '@RefiColombia',
      images: ['/og.jpg']
    },
    robots: { index: true, follow: true },
    themeColor: '#0e1220',
    colorScheme: 'dark'
  }
}

// Structured data so search engines know who is behind the site.
const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ReFi Colombia',
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  description: META.es.description,
  areaServed: 'CO',
  sameAs: SOCIALS.map((s) => s.href)
}

export async function generateStaticParams () {
  return [{ locale: 'es' }, { locale: 'en' }]
}
const locales = ['es', 'en']
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
      <head>
        {/* Sections fade in on scroll. Without JavaScript they must simply show. */}
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
      </head>
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
