import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Luxury Wildlife Retreat | Premium Nature Experience',
  description: 'Experience luxury in the heart of nature. Our premium wildlife retreat offers unique accommodations, breathtaking views, and unforgettable experiences in the wilderness.',
  keywords: ['luxury wildlife retreat', 'nature experience', 'premium accommodations', 'wildlife sanctuary', 'eco-tourism', 'luxury cabins', 'forest retreat'],
  authors: [{ name: 'Luxury Wildlife Retreat' }],
  openGraph: {
    title: 'Luxury Wildlife Retreat | Premium Nature Experience',
    description: 'Experience luxury in the heart of nature. Our premium wildlife retreat offers unique accommodations, breathtaking views, and unforgettable experiences in the wilderness.',
    // url: 'https://luxurywildliferetreat.com',
    siteName: 'Luxury Wildlife Retreat',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury Wildlife Retreat - Premium Nature Experience',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Luxury Wildlife Retreat | Premium Nature Experience',
  //   description: 'Experience luxury in the heart of nature. Our premium wildlife retreat offers unique accommodations, breathtaking views, and unforgettable experiences in the wilderness.',
  //   images: ['/og-image.jpg'],
  // },
  // robots: {
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     'max-video-preview': -1,
  //     'max-image-preview': 'large',
  //     'max-snippet': -1,
  //   },
  // },
  // verification: {
  //   google: 'your-google-site-verification',
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans" suppressHydrationWarning>{children}</body>
    </html>
  )
}
