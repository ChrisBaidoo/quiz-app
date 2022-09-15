import { useState, useEffect } from "react";
import { randomInts } from "../functions/utils";

const useFetchData = () => {
  const [questions, setQuestions] = useState<
    { name: string; imageUrl: string }[]
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);
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

    const uniqueData = [
      ...new Set<string>(filterData.map((answer: any) => answer.name)),
    ];
    setAllPossibleAnswers(uniqueData);

    setCurrentQuestion(0);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    questions,
    allPossibleAnswers,
    currentQuestion,
    setCurrentQuestion,
    fetchData,
  };
};

export default useFetchData;
