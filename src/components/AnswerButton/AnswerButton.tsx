import React from 'react';
import clsx from 'clsx';
import { Answer } from '@/types';
import styles from './AnswerButton.module.scss';

interface Props {
  answer: Answer;
  id: string;
  isSelected: boolean;
  isCorrectAnswer?: boolean;
  isWrongAnswer?: boolean;
  onSelect: () => void;
}

export default function AnswerButton({
  answer,
  id,
  isSelected,
  isCorrectAnswer,
  isWrongAnswer,
  onSelect,
}: Props) {
  return (
    <li
      className={clsx(styles.wrapper, {
        [styles.selected]: isSelected,
        [styles.correct]: isCorrectAnswer,
        [styles.wrong]: isWrongAnswer,
      })}
    >
      <button className={styles.button} onClick={onSelect}>
        <span className={styles.letter}>{id}</span>
        {answer.text}
      </button>
    </li>
  );
}
