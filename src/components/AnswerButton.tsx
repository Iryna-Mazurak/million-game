import React from 'react';
import clsx from 'clsx';
import { Answer } from '@/types';
import styles from './AnswerButton.module.css';

interface Props {
  answer: Answer;
  isSelected: boolean;
  onSelect: () => void;
}

export default function AnswerButton({ answer, isSelected, onSelect }: Props) {
  return (
    <button
      className={clsx(styles.button, { [styles.selected]: isSelected })}
      onClick={onSelect}
    >
      {answer.text}
    </button>
  );
}
