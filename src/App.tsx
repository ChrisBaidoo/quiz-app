import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "./App.css";
import { Question } from "./components/question";
import { randomInts } from "./utils";
import { Box, Typography, Chip } from "@mui/material";

function App() {
  const [questions, setQuestions] = useState<
    { name: string; imageUrl: string }[]
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);
  const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState<
    [string, string, string, string] | null
  >(null);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState<string[]>();
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const fetchData = async () => {
    const response = await fetch("https://api.disneyapi.dev/characters"); // TODO get more than the first 50
    const data = await response.json();

    const filterData = data.data.filter(
      (x: any) => x.tvShows.length || x.films.length
    );

    const tenQuestions = randomInts(10, filterData.length - 1).map((key) => {
      const { name, imageUrl } = filterData[key];
      return { name, imageUrl };
    });
    setQuestions(tenQuestions);

    setAllPossibleAnswers(filterData.map((answer: any) => answer.name));

    setCurrentQuestion(0);
  };

  const addCorrectAnswer = (
    answers: [string, string, string, string],
    currentAnswer: string
  ): [string, string, string, string] => {
    const [randomIndex] = randomInts(1, 3);
    answers[randomIndex] = currentAnswer;
    return Array.from(new Set<string>([...answers])) as [
      string,
      string,
      string,
      string
    ];
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (allPossibleAnswers && currentQuestion !== null) {
      const fourAnswers = randomInts(4, allPossibleAnswers.length - 1).map(
        (key: number) => allPossibleAnswers[key]
      ) as [string, string, string, string];

      const answers = addCorrectAnswer(
        fourAnswers,
        questions[currentQuestion].name
      );
      setCurrentQuestionAnswers(answers);
    }
  }, [currentQuestion, allPossibleAnswers, questions]);

  const checkAnswer = (selectAnswer: string) => {
    if (currentQuestion !== null) {
      if (selectAnswer === questions[currentQuestion].name) {
        setScore(score + 10);
        setMessage("Correct Answer");
      } else {
        setMessage(
          `Wrong, correct answer is ${questions[currentQuestion].name}`
        );
      }
    }
  };

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    fetchData();
    setMessage("");
  };

  const nextQuestion = (currentQuestion: any) => {
    setCurrentQuestion(currentQuestion + 1);
    setMessage("");
  };

  return (
    <div className="App">
      {gameOver && (
        <Box sx={{ marginTop: "20px" }}>
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
      )}

      {!gameOver && currentQuestion !== null && currentQuestionAnswers && (
        <>
          <Box>
            {currentQuestion + 1}/{questions.length}
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: 20 }}
              color="text.secondary"
              gutterBottom
            >
              {message}
            </Typography>
          </Box>

          <Question
            image={questions[currentQuestion].imageUrl}
            answers={currentQuestionAnswers}
            selectAnswer={checkAnswer}
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
          {currentQuestion === 9 && (
            <Button variant="contained" onClick={() => setGameOver(true)}>
              Finish
            </Button>
          )}
        </>
      )}
      {!allPossibleAnswers && <h1>Fetching questions</h1>}
    </div>
  );
}

export default App;
