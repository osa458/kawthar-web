import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kawthar - Abundance, verified.',
  description: 'Discover Arabic events, markets, and communities. Connect through culture and traditions.',
  keywords: ['Arabic', 'events', 'market', 'community', 'culture', 'traditions'],
  authors: [{ name: 'Kawthar Team' }],
  openGraph: {
    title: 'Kawthar - Abundance, verified.',
    description: 'Discover Arabic events, markets, and communities. Connect through culture and traditions.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Kawthar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kawthar - Abundance, verified.',
    description: 'Discover Arabic events, markets, and communities. Connect through culture and traditions.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={inter.className}>
        <AuthProvider>
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
          >
            Skip to main content
          </a>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}