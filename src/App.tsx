import React, { useState, useEffect } from "react";
import "./App.css";
import { Question } from "./components/question";

const randomInts = (quantity: number, max: number): number[] => {
  const set = new Set<number>();
  while (set.size < quantity) {
    set.add(Math.floor(Math.random() * max));
  }
  return [...set];
};

function App() {
  const [questions, setQuestions] = useState<
    { name: string; imageUrl: string }[]
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState<
    [string, string, string, string] | null
  >(null);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState<any>();

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

    const fourAnswers = randomInts(4, filterData.length - 1).map((key) => {
      const { name } = filterData[key];
      return { name };
    });

    setAllPossibleAnswers(fourAnswers);

    setQuestions(tenQuestions);



  console.log(currentQuestionAnswers);
  console.log(allPossibleAnswers);
  console.log(currentQuestion);
  console.log(questions);

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div className="App">
      {currentQuestionAnswers ? (
        <Question
          image={questions[currentQuestion].imageUrl}
          answers={currentQuestionAnswers}
          allPossibleAnswers={allPossibleAnswers}
        />
      ) : (
        "Loading...."
      )}
      <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
        Next
      </button>
    </div>
  );
}

export default App;
