export type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: number;
  text: string;
  reward: number;
  answers: Answer[];
};
