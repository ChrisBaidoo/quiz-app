import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { Question } from "./Question";

interface Props {
  image: string;
  answers: [string, string, string, string];
  selectAnswer: (answer: string) => void;
  disabled: boolean;
  currentQuestion: number;
  questions: { name: string; imageUrl: string }[];
  nextQuestion: (currentQuestion: number) => void;
  gameOver: () => void;
  message: string;
}

const QuizCard = (props: Props) => {
  const {
    answers,
    selectAnswer,
    currentQuestion,
    questions,
    nextQuestion,
    gameOver,
    message,
  } = props;

  return (
    <>
      <Box>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          {props.message}
        </Typography>
      </Box>

      <Question
        image={questions[currentQuestion].imageUrl}
        answers={answers}
        selectAnswer={selectAnswer}
        disabled={message !== ""}
      />

      {currentQuestion < 9 && (
        <Button
          variant="contained"
          onClick={() => nextQuestion(currentQuestion)}
        >
          Next
        </Button>
      )}
      {props.currentQuestion === 9 && (
        <Button variant="contained" onClick={() => gameOver}>
          Finish
        </Button>
      )}
    </>
  );
};

export default QuizCard;
