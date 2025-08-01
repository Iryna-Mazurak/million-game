'use client';

import React from 'react';
import clsx from 'clsx';
import styles from './BurgerButton.module.scss';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export default function BurgerButton({ isOpen, onToggle }: Props) {
  return (
    <button
      className={clsx(styles.burgerMenu, {
        [styles.active]: isOpen,
      })}
      onClick={onToggle}
      aria-label="Toggle menu"
    >
      <div className={styles.burgerMenuItem}></div>
      <div className={styles.burgerMenuItem}></div>
      <div className={styles.burgerMenuItem}></div>
    </button>
  );
}
