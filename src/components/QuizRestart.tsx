import React from "react";
import { Typography, Box, Button } from "@mui/material";

interface Props {
  score: number;
  restartGame: () => void;
}

const QuizRestart = (props: Props) => {
  const { score, restartGame } = props;

  return (
    <>
      <Box sx={{ margin: "20px" }}>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Your final score is {score}
        </Typography>

        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={() => restartGame()}
        >
          Restart
        </Button>
      </Box>
    </>
  );
};

export default QuizRestart;
