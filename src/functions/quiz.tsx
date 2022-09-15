import { randomInts } from "./utils";

export const addCorrectAnswer = (
  answers: [string, string, string, string],
  currentAnswer: string
): [string, string, string, string] => {
  if (!answers.includes(currentAnswer)) {
    const [randomIndex] = randomInts(1, 3);
    answers[randomIndex] = currentAnswer;
  }

  return Array.from(new Set<string>([...answers])) as [
    string,
    string,
    string,
    string
  ];
};
