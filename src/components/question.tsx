import { Button, Typography, CardActions, CardContent } from "@mui/material";

interface Props {
  image: string;
  answers: [string, string, string, string];
  selectAnswer: (answer: string) => void;
}

export const Question = (props: Props) => {
  return (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
          Guess the character
        </Typography>
        <img src={props.image} alt="character" />
      </CardContent>
      <CardActions sx={{ display: "block" }}>
        {props.answers.map((answer) => (
          <Button
            variant="outlined"
            size="small"
            key={answer}
            onClick={() => props.selectAnswer(answer)}
            sx={{ textTransform: "none" }}
          >
            {answer}
          </Button>
        ))}
      </CardActions>
    </>
  );
};
