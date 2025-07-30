'use client';

import React from 'react';
import Link from 'next/link';
import { useGameContext } from '@/features/game/GameProvider';

export default function FinishPage() {
  const { questions, currentIndex, resetGame } = useGameContext();

  const reward =
    currentIndex > 0 ? (questions[currentIndex - 1]?.reward ?? 0) : 0;

  return (
    <main>
      <p>Your score:</p>
      <p>${reward.toLocaleString()}</p>
      <Link href="/" onClick={resetGame}>
        Try Again
      </Link>
    </main>
  );
}
