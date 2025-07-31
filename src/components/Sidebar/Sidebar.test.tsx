import { render, screen } from '@testing-library/react';
import config from '../../data/config.json';
import Sidebar from './Sidebar';

test('renders rewards list', () => {
  render(
    <Sidebar
      questions={config.questions}
      currentIndex={2}
      correctQuestions={config.questions}
    />,
  );

  expect(screen.getByRole('list')).toBeInTheDocument();
});
