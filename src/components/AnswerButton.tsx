import clsx from 'clsx';
import React from 'react';

import styles from './AnswerButton.module.css';

import { Answer } from '@/types';

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
