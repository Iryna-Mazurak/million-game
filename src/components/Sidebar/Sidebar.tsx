import React from 'react';
import clsx from 'clsx';
import { Question } from '@/types';
import styles from './Sidebar.module.css';

type SidebarProps = {
  isOpen?: boolean;
  questions: Question[];
  currentIndex: number;
  correctQuestions: Question[];
};

export default function Sidebar({
  isOpen,
  questions,
  currentIndex,
  correctQuestions,
}: SidebarProps) {
  const reversedQuestions = [...questions].slice().reverse();
  const currentQuestion = questions[currentIndex];
  const currentReward = currentQuestion ? currentQuestion.reward : 0;

  return (
    <aside
      className={clsx(styles.sidebar, {
        [styles.active]: isOpen,
      })}
    >
      <ul className={styles.list}>
        {reversedQuestions.map((q) => {
          const isCurrent = q.reward === currentReward;
          const isCorrect = correctQuestions.some((cq) => cq.id === q.id);
          return (
            <li
              key={q.id}
              className={`${styles.item} ${
                isCurrent ? styles.current : isCorrect ? styles.correct : ''
              }`}
            >
              <span className={styles.itemContent}>
                ${q.reward.toLocaleString()}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
