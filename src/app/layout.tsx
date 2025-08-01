import React from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { GameProvider } from '@/features/game/GameProvider';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Millionaire Game',
  description: 'Who wants to be a millionaire?',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Millionaire Game',
    description: 'Who wants to be a millionaire?',
    siteName: 'Millionaire Game',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Millionaire Game Preview',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
