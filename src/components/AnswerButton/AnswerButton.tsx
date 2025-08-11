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
  isDisabled?: boolean;
}

export default function AnswerButton({
  answer,
  id,
  isSelected,
  isCorrectAnswer,
  isWrongAnswer,
  onSelect,
  isDisabled,
}: Props) {
  return (
    <li
      className={clsx(styles.wrapper, {
        [styles.selected]: isSelected,
        [styles.correct]: isCorrectAnswer,
        [styles.wrong]: isWrongAnswer,
      })}
    >
      <button
        className={styles.button}
        onClick={onSelect}
        disabled={isDisabled}
      >
        <span className={styles.letter}>{id}</span>
        {answer.text}
      </button>
    </li>
  );
}
