import React from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <Head>
        <link
          rel="preload"
          as="image"
          href="../images/button-hover.png"
          type="image/png"
        />
        <link
          rel="preload"
          as="image"
          href="../images/button-selected.png"
          type="image/png"
        />
        <link
          rel="preload"
          as="image"
          href="../images/button-correct.png"
          type="image/png"
        />
        <link
          rel="preload"
          as="image"
          href="../images/button-wrong.png"
          type="image/png"
        />
      </Head>
      <body>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
