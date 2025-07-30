"use client";
import { useGameContext } from "@/features/game/GameProvider";
import Link from "next/link";

export default function FinishPage() {
  const { questions, currentIndex, resetGame } = useGameContext();
  const lastIndex = currentIndex > 0 ? currentIndex - 1 : 0;
  const reward = questions[lastIndex]?.reward ?? 0;

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
