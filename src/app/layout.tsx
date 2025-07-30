import React from 'react';
import type { Metadata } from 'next';
import { GameProvider } from '@/features/game/GameProvider';

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
    <html lang="en">
      <body>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
