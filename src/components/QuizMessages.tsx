import React from "react";
import { Typography, Box } from "@mui/material";

interface Props {
  currentQuestion: number;
  questions: { name: string; imageUrl: string }[];
  message: string;
}

const QuizMessages = (props: Props) => {
  const { currentQuestion, questions, message } = props;

  return (
    <>
      <Box sx={{ margin: "20px" }}>
        {currentQuestion + 1}/{questions.length}
      </Box>
      <Box>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {message}
        </Typography>
      </Box>
    </>
  );
};

export default QuizMessages;
