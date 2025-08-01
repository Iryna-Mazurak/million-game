import { render, screen } from '@testing-library/react';
import config from '../../data/config.json';
import Sidebar from './Sidebar';
import styles from './Sidebar.module.scss';

describe('Sidebar', () => {
  test('renders rewards list', () => {
    render(
      <Sidebar
        questions={config.questions}
        currentIndex={2}
        correctQuestions={config.questions}
      />,
    );

    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument();
  });

  test('renders 12 reward items', () => {
    render(
      <Sidebar
        questions={config.questions}
        currentIndex={1}
        correctQuestions={config.questions}
      />,
    );

    const listitems = screen.getAllByRole('listitem');

    expect(listitems).toHaveLength(12);
  });

  test('renders 5 listitem with correct className', () => {
    const currentIndex = 5;

    render(
      <Sidebar
        isOpen={true}
        questions={config.questions}
        currentIndex={currentIndex}
        correctQuestions={config.questions.slice(0, currentIndex)}
      />,
    );

    const items = screen.getAllByRole('listitem');
    let correctCount = 0;

    items.forEach((item) => {
      if (item.classList.contains(styles.correct)) {
        correctCount++;
      }
    });

    expect(correctCount).toBe(5);
  });

  test('renders 6 listitem without current and correct classNames', () => {
    const currentIndex = 5;

    render(
      <Sidebar
        isOpen={true}
        questions={config.questions}
        currentIndex={currentIndex}
        correctQuestions={config.questions.slice(0, currentIndex)}
      />,
    );

    const items = screen.getAllByRole('listitem');
    let simpleListItemsCount = 0;

    items.forEach((item) => {
      if (
        !item.classList.contains(styles.correct) &&
        !item.classList.contains(styles.current)
      ) {
        simpleListItemsCount++;
      }
    });

    expect(simpleListItemsCount).toBe(6);
  });

  test('renders only 1 listitem with current className', () => {
    const currentIndex = 5;

    render(
      <Sidebar
        isOpen={true}
        questions={config.questions}
        currentIndex={currentIndex}
        correctQuestions={config.questions.slice(0, currentIndex)}
      />,
    );

    const items = screen.getAllByRole('listitem');

    expect(items[currentIndex + 1]).toHaveClass(styles.current);
  });

  test('applies active className if isOpen is true', () => {
    render(
      <Sidebar
        isOpen={true}
        questions={config.questions}
        currentIndex={0}
        correctQuestions={[]}
      />,
    );

    const aside = screen.getByRole('complementary');

    expect(aside).toHaveClass(styles.active);
  });

  test('not applies active className if isOpen is false', () => {
    render(
      <Sidebar
        isOpen={false}
        questions={config.questions}
        currentIndex={0}
        correctQuestions={[]}
      />,
    );

    const aside = screen.getByRole('complementary');

    expect(aside).not.toHaveClass(styles.active);
  });
});
