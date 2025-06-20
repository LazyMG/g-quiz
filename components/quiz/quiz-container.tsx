"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { quizConfigState } from "utils/recoil/atoms";
import { Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "actions/quiz-actions";
import { decrypt } from "utils/decryption";

const QuizContainer = () => {
  const quizConfig = useRecoilValue(quizConfigState);
  const router = useRouter();

  useEffect(() => {
    if (!quizConfig) {
      router.replace("/");
    }
  }, []);

  const getQuestionQuery = useQuery({
    queryKey: ["questions", quizConfig?.key],
    queryFn: () =>
      getQuestions(quizConfig!.title, quizConfig!.count, quizConfig!.key),
    enabled: !!quizConfig,
  });

  const onClickHandler = (idx: number) => {
    if (
      !quizConfig ||
      !getQuestionQuery?.data ||
      getQuestionQuery?.data[idx] === null
    )
      return;
    const answer = getQuestionQuery.data[idx].name;
    const realAnswer = decrypt(answer, quizConfig.key.toString());
    console.log(realAnswer);
  };

  return (
    <div
      id="quiz-container"
      className="p-6 w-full h-2/3 flex flex-col gap-8 rounded-lg bg-blue-600"
    >
      {(!quizConfig || getQuestionQuery.isLoading) && (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner width={70} height={70} />
        </div>
      )}
      {getQuestionQuery.data &&
        getQuestionQuery.data.map((q, idx) => (
          <div key={q.id}>
            <p>{q.name}</p>
            <p>{q.mode_code}</p>
            <button onClick={() => onClickHandler(idx)}>정답</button>
          </div>
        ))}
    </div>
  );
};

export default QuizContainer;
