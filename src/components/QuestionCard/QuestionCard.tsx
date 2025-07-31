'use client';

import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import AnswerButton from '@/components/AnswerButton';
import { useGameContext } from '@/features/game/GameProvider';
import { Question } from '@/types';
import styles from './QuestionCard.module.css';

interface Props {
  question?: Question;
}

export default function QuestionCard({ question }: Props) {
  const { answerCorrect, nextQuestion } = useGameContext();
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!question) return;
    setSelectedIds([]);
  }, [question]);

  const correctIds = useMemo(() => {
    return question?.answers.filter((a) => a.isCorrect).map((a) => a.id) || [];
  }, [question]);

  const isMultipleCorrect = useMemo(() => {
    return correctIds.length > 1;
  }, [correctIds]);

  useEffect(() => {
    if (!question || !isMultipleCorrect) return;

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
  }, [
    selectedIds,
    correctIds,
    isMultipleCorrect,
    question,
    answerCorrect,
    nextQuestion,
  ]);

  if (!question) {
    return <p>Loading question...</p>;
  }

  const toggleAnswer = (id: string) => {
    const answer = question.answers.find((a) => a.id === id);
    if (!answer) return;

    if (!isMultipleCorrect) {
      if (answer.isCorrect) {
        answerCorrect(question);
        nextQuestion();
      } else {
        router.push('/finish');
      }
      return;
    }

    if (!answer.isCorrect) {
      router.push('/finish');
      return;
    }

    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.question}>{question.text}</h2>
      <ul className={styles.list}>
        {question.answers.map((answer) => (
          <AnswerButton
            key={answer.id}
            answer={answer}
            isSelected={selectedIds.includes(answer.id)}
            onSelect={() => toggleAnswer(answer.id)}
          />
        ))}
      </ul>
    </div>
  );
}
