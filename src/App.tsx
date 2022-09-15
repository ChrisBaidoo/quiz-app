import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "./App.css";
import { GameOver } from "./components/gameOver";
import { Question } from "./components/question";
import { randomInts } from "./utils";
import { Box } from "@mui/system";

function App() {
  const [questions, setQuestions] = useState<
    { name: string; imageUrl: string }[]
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);
  const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState<
    [string, string, string, string] | null
  >(null);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState<string[]>();

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
        console.log("right");
      } else console.log("wrong");
    }
  };

  return (
    <div className="App">
      {currentQuestion !== null && currentQuestionAnswers ? (
        <div>
          <Box>
            {currentQuestion + 1}/{questions.length}
          </Box>
          <Box>{questions[currentQuestion].name}</Box>
          <Question
            image={questions[currentQuestion].imageUrl}
            answers={currentQuestionAnswers}
            selectAnswer={checkAnswer}
          />

          {currentQuestion < 9 && (
            <Button
              variant="contained"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            >
              Next
            </Button>
          )}
          {currentQuestion && currentQuestion > 10 && <GameOver />}
        </div>
      ) : (
        <h1>Fetching questions</h1>
      )}
    </div>
  );
}

export default App;
