import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import BurgerButton from './BurgerButton';
import styles from './BurgerButton.module.scss';
const mockToggle = vi.fn();

describe('BurgerButton', () => {
  test('Should render button', () => {
    render(<BurgerButton isOpen={false} onToggle={mockToggle} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('Should add active className if isOpen is true', () => {
    render(<BurgerButton isOpen={true} onToggle={mockToggle} />);
    screen.getByRole('button').click();
    expect(screen.getByRole('button')).toHaveClass(styles.active);
  });
});
