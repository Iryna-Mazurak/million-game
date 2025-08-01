import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import BurgerButton from './BurgerButton';
import styles from './BurgerButton.module.scss';
const mockToggle = vi.fn();

describe('BurgerButton', () => {
  test('renders button', () => {
    render(<BurgerButton isOpen={false} onToggle={mockToggle} />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  test('applies active className if isOpen is true', () => {
    render(<BurgerButton isOpen={true} onToggle={mockToggle} />);

    screen.getByRole('button').click();
    const button = screen.getByRole('button');

    expect(button).toHaveClass(styles.active);
  });
});
