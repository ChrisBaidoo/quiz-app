import React, { useState, useEffect } from "react";
import "./App.css";
import { randomInts } from "./functions/utils";
import QuizCard from "./components/QuizCard";
import QuizRestart from "./components/QuizRestart";
import useFetchData from "./hooks/useFetchData";
import { addCorrectAnswer } from "./functions/quiz";

function App() {
  const {
    questions,
    allPossibleAnswers,
    currentQuestion,
    fetchData,
    setCurrentQuestion,
  } = useFetchData();

  const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState<
    [string, string, string, string] | null
  >(null);

  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

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
      {gameOver && <QuizRestart score={score} restartGame={restartGame} />}

      {!gameOver && currentQuestion !== null && currentQuestionAnswers && (
        <>
          <QuizCard
            answers={currentQuestionAnswers}
            selectAnswer={checkAnswer}
            currentQuestion={currentQuestion === null ? 0 : currentQuestion}
            questions={questions}
            nextQuestion={nextQuestion}
            setGameOver={() => setGameOver(true)}
            message={message}
            disabled={false}
          />
        </>
      )}
      {!allPossibleAnswers && <h1>Fetching questions</h1>}
    </div>
  );
}

export default App;
