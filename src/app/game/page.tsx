"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameContext } from "@/features/game/GameProvider";
import Sidebar from "@/components/Sidebar";
import QuestionCard from "@/components/QuestionCard";
import config from "@/data/config.json";

export default function GamePage() {
  const { questions, setQuestions, currentIndex, correctQuestions } =
    useGameContext();
  const router = useRouter();

  useEffect(() => {
    if (questions.length && currentIndex >= questions.length) {
      router.push("/finish");
    }
  }, [currentIndex, questions.length, router]);

  useEffect(() => {
    if (!questions.length) {
      setQuestions(config.questions);
    }
  }, [setQuestions, questions]);

  if (!questions.length) return <p>Loading...</p>;

  if (currentIndex >= questions.length) return null;

  return (
    <div>
      <QuestionCard question={questions[currentIndex]} />
      <Sidebar
        questions={questions}
        currentIndex={currentIndex}
        correctQuestions={correctQuestions}
      />
    </div>
  );
}
