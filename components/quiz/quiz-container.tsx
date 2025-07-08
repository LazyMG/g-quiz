"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { quizConfigState } from "utils/recoil/atoms";
import { Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "actions/quiz-actions";
import { decrypt } from "utils/decryption";
import { checkAnswer } from "utils/checkAnswer";

const QuizContainer = () => {
  const quizConfig = useRecoilValue(quizConfigState);
  const router = useRouter();
  const [myAnswer, setMyAnswer] = useState("");
  const [isRight, setIsRight] = useState<boolean | null>(null);
  const [myCount, setMyCount] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const realAnswerRef = useRef("");
  const inputRef = useRef<HTMLInputElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!quizConfig) {
      router.replace("/");
    }
  }, []);

  useEffect(() => {
    if (isRight === null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRight, currentCount]);

  useEffect(() => {
    if (isRight !== null && hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, [isRight]);

  const getQuestionQuery = useQuery({
    queryKey: ["questions", quizConfig?.key],
    queryFn: () =>
      getQuestions(quizConfig!.title, quizConfig!.count, quizConfig!.key),
    enabled: !!quizConfig,
    refetchOnWindowFocus: false,
  });

  if (
    !quizConfig ||
    getQuestionQuery.isLoading ||
    !getQuestionQuery.data ||
    getQuestionQuery.isFetching
  ) {
    return (
      <div className="p-6 w-full h-2/3 flex flex-col gap-8 rounded-lg bg-blue-600">
        <div className="w-full h-full flex justify-center items-center">
          <Spinner width={70} height={70} />
        </div>
      </div>
    );
  }

  const currentQuiz = getQuestionQuery.data[currentCount];

  const nextQuiz = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!quizConfig || !getQuestionQuery.data) return;
    if (
      currentCount + 1 === quizConfig.count ||
      getQuestionQuery.data.length <= currentCount + 1
    ) {
      setIsEnd(true);
      return;
    }
    setImageLoading(true);
    setIsRight(null);
    setMyAnswer("");
    realAnswerRef.current = "";
    setCurrentCount((prev) => prev + 1);
  };

  const quizHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!quizConfig || myAnswer === "" || imageLoading) return;

    const check = checkAnswer(myAnswer, currentQuiz, quizConfig.key.toString());
    const answer_code = decrypt(
      currentQuiz.mode_code,
      quizConfig.key.toString()
    );
    const answer_name = decrypt(currentQuiz.name, quizConfig.key.toString());
    realAnswerRef.current = `${answer_code} ${answer_name}`;

    if (check) {
      setIsRight(true);
      setMyCount((prev) => prev + 1);
    } else {
      setIsRight(false);
    }
  };

  const restart = () => {
    getQuestionQuery.refetch();
    setIsRight(null);
    setMyAnswer("");
    realAnswerRef.current = "";
    setCurrentCount(0);
    setMyCount(0);
    setIsEnd(false);
  };

  return (
    <div
      id="quiz-container"
      className="sm:p-6 py-4 px-6 w-full h-fit flex flex-col sm:gap-8 rounded-lg bg-blue-600 gap-2 sm:mb-10"
    >
      {isEnd && (
        <div className="w-full h-[350px] sm:h-[600px] rounded-md bg-white flex flex-col justify-center items-center gap-2">
          <span className="text-3xl font-bold">
            {`${myCount}/${
              getQuestionQuery.data.length === quizConfig.count
                ? quizConfig.count
                : getQuestionQuery.data.length
            }`}
          </span>
          <div className="flex gap-2">
            <button
              className="rounded-lg px-3 py-2 bg-yellow-500"
              onClick={restart}
            >
              다시 풀기
            </button>
            <button
              className="rounded-lg px-3 py-2 bg-red-500"
              onClick={() => router.replace("/")}
            >
              처음으로
            </button>
          </div>
        </div>
      )}

      {!isEnd && (
        <>
          <div className="w-full flex justify-between">
            <h2 className="text-lg sm:text-3xl font-bold">{`${
              currentCount + 1
            }번`}</h2>
            <h2 className="text-lg sm:text-3xl font-bold">{`맞힌 문제: ${myCount}/${
              getQuestionQuery.data.length === quizConfig.count
                ? quizConfig.count
                : getQuestionQuery.data.length
            }`}</h2>
          </div>

          <div className="w-full h-[350px] sm:h-[600px] rounded-md bg-white flex justify-center items-center py-6 sm:py-12 relative">
            {imageLoading && (
              <div className="absolute inset-0 bg-white rounded-md z-10 flex items-center justify-center">
                <div className="w-full h-[350px] sm:h-[600px] animate-pulse bg-gray-300 rounded-md" />
              </div>
            )}
            <img
              className="h-full object-contain"
              src={`${currentQuiz.image_url}`}
              alt="quiz"
              loading="lazy"
              onLoad={() => setImageLoading(false)}
            />
          </div>

          {isRight === null && (
            <form
              className="w-full h-10 rounded-md py-3 sm:py-6 flex items-center justify-center gap-7 flex-1"
              onSubmit={quizHandler}
            >
              <input
                value={myAnswer}
                onChange={(e) => setMyAnswer(e.target.value)}
                className="w-2/4 border-2 px-3 py-1"
                ref={inputRef}
              />
              <button
                type="submit"
                className="rounded-lg px-3 py-2 bg-yellow-500"
              >
                정답
              </button>
            </form>
          )}

          {isRight !== null && (
            <form
              onSubmit={nextQuiz}
              className="w-full h-10 rounded-md py-2 sm:py-6 flex flex-col items-center justify-center gap-1 sm:gap-5 flex-1 bg-white"
            >
              <div className="text-red-500 text-md sm:text-lg font-bold">
                {isRight ? "정답!" : "오답"}
              </div>
              <input className="sr-only" tabIndex={-1} ref={hiddenInputRef} />
              <div className="sm:text-xl font-bold text-md">
                {realAnswerRef.current}
              </div>
              <button
                type="submit"
                className="rounded-lg sm:px-3 sm:py-2 bg-yellow-500 px-2 py-1"
              >
                {currentCount + 1 === quizConfig.count ||
                getQuestionQuery.data.length <= currentCount + 1
                  ? "종료"
                  : "다음"}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default QuizContainer;
