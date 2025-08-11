'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import AnswerButton from '@/components/AnswerButton';
import { useGameContext } from '@/features/game/GameProvider';
import { Question } from '@/types';
import styles from './QuestionCard.module.scss';

interface Props {
  question?: Question;
}

export default function QuestionCard({ question }: Props) {
  const { answerCorrect, nextQuestion } = useGameContext();
  const router = useRouter();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [wrongAnswerId, setWrongAnswerId] = useState<string | null>(null);

  const [disabledIds, setDisabledIds] = useState<string[]>([]);
  const [allDisabled, setAllDisabled] = useState(false);

  useEffect(() => {
    if (!question) return;
    setSelectedIds([]);
    setShowCorrectAnswer(false);
    setWrongAnswerId(null);
    setDisabledIds([]);
    setAllDisabled(false);
  }, [question]);

  const correctIds = useMemo(
    () => question?.answers.filter((a) => a.isCorrect).map((a) => a.id) || [],
    [question],
  );

  const isMultipleCorrect = correctIds.length > 1;

  useEffect(() => {
    if (!question || !isMultipleCorrect) return;

    const allCorrectSelected =
      correctIds.every((id) => selectedIds.includes(id)) &&
      selectedIds.length === correctIds.length;

    if (allCorrectSelected) {
      setAllDisabled(true);
      answerCorrect(question);

      setTimeout(() => setShowCorrectAnswer(true), 1000);
      setTimeout(() => {
        setShowCorrectAnswer(false);
        nextQuestion();
      }, 2000);
    }
  }, [
    selectedIds,
    correctIds,
    isMultipleCorrect,
    question,
    answerCorrect,
    nextQuestion,
  ]);

  const toggleAnswer = (id: string) => {
    if (!question) return;

    const answer = question.answers.find((a) => a.id === id);

    if (!answer) return;

    if (!isMultipleCorrect) {
      setSelectedIds([id]);
      setAllDisabled(true);

      if (answer.isCorrect) {
        answerCorrect(question);
        setTimeout(() => setShowCorrectAnswer(true), 1000);
        setTimeout(() => {
          setShowCorrectAnswer(false);
          nextQuestion();
        }, 2000);
      } else {
        setTimeout(() => setWrongAnswerId(id), 1000);
        setTimeout(() => router.push('/finish'), 2000);
      }
      return;
    }

    if (!answer.isCorrect) {
      setAllDisabled(true);
      setTimeout(() => setWrongAnswerId(id), 1000);
      setTimeout(() => router.push('/finish'), 2000);
      return;
    }

    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setDisabledIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  if (!question) return <p>Loading question...</p>;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.question}>{question.text}</h2>
      <ul className={styles.list}>
        {question.answers.map((answer) => (
          <AnswerButton
            key={`${question.id}-${answer.id}`}
            answer={answer}
            id={answer.id}
            isSelected={selectedIds.includes(answer.id)}
            isCorrectAnswer={showCorrectAnswer && answer.isCorrect}
            isWrongAnswer={wrongAnswerId === answer.id}
            onSelect={() => toggleAnswer(answer.id)}
            isDisabled={allDisabled || disabledIds.includes(answer.id)}
          />
        ))}
      </ul>
    </div>
  );
}
