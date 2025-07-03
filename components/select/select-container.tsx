"use client";

import { useState } from "react";
import SelectCategory from "./select-category";
import SelectTitle from "./select-title";
import SelectProblemCount from "./select-problem-count";

interface ISelectContainer {
  data?: {
    category?: string[];
    title?: string[];
    count?: string[];
  };
}

const SelectContainer = ({ data }: ISelectContainer) => {
  const urlStep = data?.category ? "TITLE" : "CATEGORY";

  const [step, setStep] = useState<"CATEGORY" | "TITLE" | "COUNT">(urlStep);
  const [category, setCategory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const titles = formData.getAll("title"); // checkbox input
    const count = formData.get("count");

    if (
      !titles.length ||
      typeof count !== "string" ||
      isNaN(Number(count)) ||
      Number(count) <= 0
    ) {
      alert("입력값을 확인해주세요");
      return;
    }

    // ✅ 이때만 제출 허용
    event.currentTarget.submit(); // action="/quiz"로 POST 전송
  };

  return (
    <div
      id="select-container"
      className="p-6 w-full flex flex-col gap-8 rounded-lg bg-blue-600 mb-10"
    >
      <div className="flex flex-col gap-8">
        <SelectCategory
          setStep={setStep}
          step={step}
          categoryData={data?.category}
          categoryList={category}
          setCategoryList={setCategory}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        {(step === "TITLE" || step === "COUNT") && (
          <SelectTitle
            setStep={setStep}
            step={step}
            categoryList={category}
            isLoading={isLoading}
            titleData={data?.title}
          />
        )}
        {step === "COUNT" && <SelectProblemCount setStep={setStep} />}
      </div>
    </div>
  );
};

export default SelectContainer;
