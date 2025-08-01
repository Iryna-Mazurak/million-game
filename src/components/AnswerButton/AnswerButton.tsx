import React from 'react';
import clsx from 'clsx';
import { Answer } from '@/types';
import styles from './AnswerButton.module.scss';

interface Props {
  answer: Answer;
  index: number;
  isSelected: boolean;
  isCorrectAnswer?: boolean;
  isWrongAnswer?: boolean;
  onSelect: () => void;
}

export default function AnswerButton({
  answer,
  index,
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
        <span className={styles.letter}>{String.fromCharCode(65 + index)}</span>
        {answer.text}
      </button>
    </li>
  );
}
