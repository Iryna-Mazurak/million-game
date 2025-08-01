import { useRouter } from 'next/navigation';
import { act } from '@testing-library/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import config from '@/data/config.json';
import { GameContext } from '@/features/game/GameProvider';
import { Question } from '@/types';
import QuestionCard from './QuestionCard';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const mockPush = vi.fn();

const mockQuestionSingle: Question = {
  id: 1,
  reward: 200,
  text: 'What is the capital of France?',
  answers: [
    { id: '1', text: 'Paris', isCorrect: true },
    { id: '2', text: 'London', isCorrect: false },
    { id: '3', text: 'Rome', isCorrect: false },
    { id: '4', text: 'Berlin', isCorrect: false },
  ],
};

const mockQuestionMultiple: Question = {
  id: 2,
  text: 'Select prime numbers',
  reward: 100,
  answers: [
    { id: 'a', text: '2', isCorrect: true },
    { id: 'b', text: '3', isCorrect: true },
    { id: 'c', text: '4', isCorrect: false },
    { id: 'd', text: '5', isCorrect: true },
  ],
};

describe('QuestionCard', () => {
  const answerCorrect = vi.fn();
  const nextQuestion = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  const mockGameContext = {
    questions: config.questions,
    currentIndex: 5,
    correctAnswers: 1,
    correctQuestions: config.questions,
    setQuestions: () => {},
    nextQuestion,
    resetGame: () => {},
    answerCorrect,
  };

  const renderWithContext = (question: Question | undefined) => {
    return render(
      <GameContext.Provider value={mockGameContext}>
        <QuestionCard question={question} />
      </GameContext.Provider>,
    );
  };

  test('renders loading if question is not provided', () => {
    renderWithContext(undefined);
    expect(screen.getByText(/loading question/i)).toBeInTheDocument();
  });

  test('renders question and answers', () => {
    renderWithContext(mockQuestionSingle);
    expect(screen.getByText(mockQuestionSingle.text)).toBeInTheDocument();
    mockQuestionSingle.answers.forEach((a) => {
      expect(screen.getByText(a.text)).toBeInTheDocument();
    });
  });

  test('handles correct single answer', async () => {
    renderWithContext(mockQuestionSingle);

    await act(async () => {
      fireEvent.click(screen.getByText('Paris'));
      vi.advanceTimersByTime(1000);
    });

    expect(answerCorrect).toHaveBeenCalledWith(mockQuestionSingle);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(nextQuestion).toHaveBeenCalled();
  });

  test('handles correct multiple answers', async () => {
    renderWithContext(mockQuestionMultiple);

    await act(async () => {
      fireEvent.click(screen.getByText('2'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('3'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('5'));
    });
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(answerCorrect).toHaveBeenCalledWith(mockQuestionMultiple);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(nextQuestion).toHaveBeenCalled();
  });

  test('handles wrong single answer and navigates to /finish', async () => {
    renderWithContext(mockQuestionSingle);

    await act(async () => {
      fireEvent.click(screen.getByText('London'));
      vi.advanceTimersByTime(1000);
    });

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockPush).toHaveBeenCalledWith('/finish');
  });

  test('handles wrong answer in multiple correct and navigates to /finish', async () => {
    renderWithContext(mockQuestionMultiple);

    await act(async () => {
      fireEvent.click(screen.getByText('4'));
      vi.advanceTimersByTime(1000);
    });

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockPush).toHaveBeenCalledWith('/finish');
  });
});
