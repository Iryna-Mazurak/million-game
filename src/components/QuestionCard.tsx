"use client";
import { Question } from "@/types";
import { useState, useEffect } from "react";
import { useGameContext } from "@/features/game/GameProvider";
import { useRouter } from "next/navigation";
import AnswerButton from "@/components/AnswerButton";

type Props = {
  question?: Question;
};

export default function QuestionCard({ question }: Props) {
  const { answerCorrect, nextQuestion } = useGameContext();
  const router = useRouter();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!question) return;
    setSelectedIds([]);
  }, [question?.id]);

  if (!question) return null;

  const correctIds = question.answers
    .filter((a) => a.isCorrect)
    .map((a) => a.id);
  const isMultipleCorrect = correctIds.length > 1;

  const toggleAnswer = (id: string) => {
    const answer = question.answers.find((a) => a.id === id);
    if (!answer) return;

    if (!isMultipleCorrect) {
      if (answer.isCorrect) {
        answerCorrect(question);
        nextQuestion();
      } else {
        router.push("/finish");
      }
      return;
    }

    if (!answer.isCorrect) {
      router.push("/finish");
      return;
    }

    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  useEffect(() => {
    if (isMultipleCorrect) {
      const allCorrectSelected = correctIds.every((id) =>
        selectedIds.includes(id),
      );
      if (allCorrectSelected && selectedIds.length === correctIds.length) {
        answerCorrect(question);
        const timer = setTimeout(() => {
          nextQuestion();
        }, 300);
        return () => clearTimeout(timer);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds]);

  return (
    <div>
      <h2>{question.text}</h2>
      <div>
        {question.answers.map((answer) => (
          <AnswerButton
            key={answer.id}
            answer={answer}
            isSelected={selectedIds.includes(answer.id)}
            onSelect={() => toggleAnswer(answer.id)}
          />
        ))}
      </div>
    </div>
  );
}
