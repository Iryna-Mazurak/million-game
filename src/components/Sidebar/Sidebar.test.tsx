import { render, screen } from '@testing-library/react';
import config from '../../data/config.json';
import Sidebar from './Sidebar';
import styles from './Sidebar.module.scss';

describe('Sidebar', () => {
  test('Should render rewards list', () => {
    render(
      <Sidebar
        questions={config.questions}
        currentIndex={2}
        correctQuestions={config.questions}
      />,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  test('Should render 12 reward items', () => {
    render(
      <Sidebar
        questions={config.questions}
        currentIndex={1}
        correctQuestions={config.questions}
      />,
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(12);
  });

  test('Should render 5 listitem with correct className', () => {
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

  test('Should render 6 listitem without current and correct classNames', () => {
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

  test('Should render 1 listitem with current className', () => {
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

  test('Should add active className if isOpen is true', () => {
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

  test('Should not add active className if isOpen is false', () => {
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

  test('debug run', () => {
    console.log('🔥 Тести запустилися!');
    expect(true).toBe(true);
  });
});
