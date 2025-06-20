"use client";

import { Button } from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { Dispatch, SetStateAction, useState } from "react";
import { quizConfigState } from "utils/recoil/atoms";

interface ISelectProblemCount {
  setStep: Dispatch<SetStateAction<"CATEGORY" | "TITLE" | "COUNT">>;
}

const SelectProblemCount = ({ setStep }: ISelectProblemCount) => {
  const [problemCount, setProblemCount] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const setQuizConfig = useSetRecoilState(quizConfigState);

  const quizStart = () => {
    const categoryList = searchParams.getAll("category");
    const titleList = searchParams.getAll("title");

    if (!categoryList || !titleList) {
      router.replace("/");
      return;
    } else if (categoryList.length === 0 || titleList.length === 0) {
      router.replace("/");
      return;
    }
    if (isNaN(Number(problemCount)) || Number(problemCount) <= 0) {
      alert("유효한 문제 수를 입력해주세요.");
      return;
    }

    setQuizConfig({
      title: titleList,
      count: Number(problemCount),
      key: Date.now(),
    });

    router.push("/quiz");
  };

  return (
    <div className="flex flex-col gap-2 py-5 px-3 bg-white rounded-lg">
      <h4 className="font-semibold text-lg mb-2">최대 문제 수</h4>
      <div className="flex flex-col gap-2">
        <input
          type="number"
          placeholder="최대 문제 수를 입력하세요."
          className="pl-3 py-2 text-lg border-2 border-gray-400 rounded-lg focus:border-red-600 focus:outline-none"
          value={problemCount}
          onChange={(event) => {
            setProblemCount(event.target.value);
          }}
          name="count"
        />
        <p className="text-sm text-gray-600">
          총 문제 수와 최대 문제 수는 다를 수 있습니다.
        </p>
      </div>
      <div className="w-full flex justify-between mt-5">
        <Button color="yellow" onClick={() => setStep("TITLE")}>
          이전
        </Button>
        <Button color="red" onClick={quizStart}>
          시작
        </Button>
      </div>
    </div>
  );
};

export default SelectProblemCount;
