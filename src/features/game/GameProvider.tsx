"use client";
import React, { createContext, useState, useContext, useCallback } from "react";
import { Question } from "@/types";

type GameContextType = {
  questions: Question[];
  currentIndex: number;
  correctAnswers: number;
  correctQuestions: Question[];
  setQuestions: (q: Question[]) => void;
  nextQuestion: () => void;
  resetGame: () => void;
  answerCorrect: (q: Question) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [correctQuestions, setCorrectQuestions] = useState<Question[]>([]);

  const nextQuestion = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const resetGame = useCallback(() => {
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setCorrectQuestions([]);
  }, []);

  const answerCorrect = (q: Question) => {
    setCorrectAnswers((prev) => prev + 1);
    setCorrectQuestions((prev) => [...prev, q]);
  };

  return (
    <GameContext.Provider
      value={{
        questions,
        setQuestions,
        currentIndex,
        nextQuestion,
        correctAnswers,
        correctQuestions,
        resetGame,
        answerCorrect,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGameContext must be used within GameProvider");
  return ctx;
};
