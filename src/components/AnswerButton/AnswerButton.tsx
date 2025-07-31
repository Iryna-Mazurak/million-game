import React from 'react';
import clsx from 'clsx';
import { Answer } from '@/types';
import styles from './AnswerButton.module.css';

interface Props {
  answer: Answer;
  isSelected: boolean;
  isCorrectAnswer?: boolean;
  onSelect: () => void;
}

export default function AnswerButton({
  answer,
  isSelected,
  isCorrectAnswer,
  onSelect,
}: Props) {
  return (
    <li
      className={clsx(styles.wrapper, {
        [styles.selected]: isSelected,
        [styles.correct]: isCorrectAnswer,
      })}
    >
      <button className={styles.button} onClick={onSelect}>
        {answer.text}
      </button>
    </li>
  );
}
