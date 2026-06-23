import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import './globals.css';

import { env } from '@/env';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: 'Nobins',
    template: '%s — Nobins',
  },
  description: 'A zero-knowledge pastebin with end-to-end encryption',
  alternates: {
    canonical: '/',
  },
  keywords: ['pastebin', 'encrypted', 'e2e', 'zero-knowledge', 'nobins'],
  authors: [{ name: 'Nobins' }],
  creator: 'Nobins',
  publisher: 'Nobins',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Nobins',
    title: 'Nobins',
    description: 'A zero-knowledge pastebin with end-to-end encryption',
    url: '/',
  },
  twitter: {
    card: 'summary',
    title: 'Nobins',
    description: 'A zero-knowledge pastebin with end-to-end encryption',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </body>
    </html>
  );
}
