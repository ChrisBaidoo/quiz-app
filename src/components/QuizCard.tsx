import React from "react";
import { Question } from "./Question";
import QuizNavigation from "./QuizNavigation";
import QuizMessages from "./QuizMessages";

interface Props {
  answers: [string, string, string, string];
  selectAnswer: (answer: string) => void;
  disabled: boolean;
  currentQuestion: number;
  questions: { name: string; imageUrl: string }[];
  nextQuestion: (currentQuestion: number) => void;
  setGameOver: () => void;
  message: string;
}

const QuizCard = (props: Props) => {
  const {
    answers,
    selectAnswer,
    currentQuestion,
    questions,
    nextQuestion,
    setGameOver,
    message,
  } = props;

  return (
    <>
      <QuizMessages
        currentQuestion={currentQuestion}
        questions={questions}
        message={message}
      />
      <Question
        image={questions[currentQuestion].imageUrl}
        answers={answers}
        selectAnswer={selectAnswer}
        disabled={message !== ""}
      />
      <QuizNavigation
        currentQuestion={currentQuestion}
        questions={questions}
        nextQuestion={nextQuestion}
        gameOver={setGameOver}
      />
    </>
  );
};

export default QuizCard;
