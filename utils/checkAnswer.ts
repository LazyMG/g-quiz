import { Quiz } from "type";
import { decrypt } from "./decryption";

function normalize(text: string): string {
  return text.replace(/\s+/g, "").toLowerCase();
}

function getAllConcatCombinations(arr: string[]): string[] {
  const result: string[] = [];

  // 1개만 조합
  for (const a of arr) {
    result.push(a);
  }

  // 2개 조합
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i !== j) {
        result.push(arr[i] + arr[j]);
      }
    }
  }

  return result;
}

function isCorrectAnswer(
  userInput: string,
  candidates: string[],
  aliasCandidates: string[]
): boolean {
  const normalizedInput = normalize(userInput);
  const normalizedCandidates = candidates.map(normalize);
  const candidateCombinations = getAllConcatCombinations(normalizedCandidates);

  const normalizedAliases = aliasCandidates.map(normalize);

  const allPossibleAnswers = [...candidateCombinations, ...normalizedAliases];

  return allPossibleAnswers.includes(normalizedInput);
}

export const checkAnswer = (answer: string, quiz: Quiz, key: string) => {
  const name = decrypt(quiz.name, key);
  const mode_code = decrypt(quiz.mode_code, key);
  const en_name = decrypt(quiz.en_name, key);
  const aliasCandidates = quiz.aliases?.map((a) => decrypt(a.alias, key)) ?? [];

  const candiates = [name, mode_code, en_name];

  return isCorrectAnswer(answer, candiates, aliasCandidates);
};
