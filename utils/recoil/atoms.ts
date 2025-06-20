import { atom } from "recoil";

interface IQuizConfig {
  title: string[];
  count: number;
  key: number;
}

export const quizConfigState = atom<IQuizConfig | null>({
  key: "quizConfigState",
  default: null,
});
