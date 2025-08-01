import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import AnswerButton from './AnswerButton';
import styles from './AnswerButton.module.scss';
const mockAnswer = {
  id: '1',
  text: 'Sample answer',
  isCorrect: true,
};

describe('AnswerButton', () => {
  test('renders answer text and letter', () => {
    render(
      <AnswerButton
        answer={mockAnswer}
        index={0}
        isSelected={false}
        onSelect={() => {}}
      />,
    );

    expect(screen.getByText('Sample answer')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  test('calls onSelect when button is clicked', () => {
    const onSelect = vi.fn();

    render(
      <AnswerButton
        answer={mockAnswer}
        index={0}
        isSelected={false}
        onSelect={onSelect}
      />,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalled();
  });

  test('applies selected className if isSelected is true', () => {
    render(
      <AnswerButton
        answer={mockAnswer}
        index={0}
        isSelected={true}
        onSelect={() => {}}
      />,
    );

    const listitem = screen.getByRole('listitem');

    expect(listitem).toHaveClass(styles.selected);
  });

  test('applies correct className if isCorrectAnswer is true', () => {
    render(
      <AnswerButton
        answer={mockAnswer}
        index={0}
        isCorrectAnswer={true}
        isSelected={false}
        onSelect={() => {}}
      />,
    );

    const listitem = screen.getByRole('listitem');

    expect(listitem).toHaveClass(styles.correct);
  });

  test('applies wrong className if isWrongAnswer is true', () => {
    render(
      <AnswerButton
        answer={mockAnswer}
        index={0}
        isWrongAnswer={true}
        isSelected={false}
        onSelect={() => {}}
      />,
    );

    const listitem = screen.getByRole('listitem');

    expect(listitem).toHaveClass(styles.wrong);
  });
});
