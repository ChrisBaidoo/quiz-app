import React from "react";
import { Button } from "@mui/material";

interface Props {
  currentQuestion: number;
  questions: { name: string; imageUrl: string }[];
  nextQuestion: (currentQuestion: number) => void;
  gameOver: () => void;
}

const QuizNavigation = (props: Props) => {
  const { currentQuestion, questions, nextQuestion, gameOver } = props;

  const size = questions.length - 1;

  return (
    <>
      {currentQuestion < size && (
        <Button
          variant="contained"
          onClick={() => nextQuestion(currentQuestion)}
        >
          Next
        </Button>
      )}
      {currentQuestion === size && (
        <Button variant="contained" onClick={() => gameOver()}>
          Finish
        </Button>
      )}
    </>
  );
};

export default QuizNavigation;
