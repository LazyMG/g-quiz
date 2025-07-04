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
          categoryList={Array.from(new Set(category))}
          setCategoryList={setCategory}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        {(step === "TITLE" || step === "COUNT") && (
          <SelectTitle
            setStep={setStep}
            step={step}
            categoryList={Array.from(new Set(category))}
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
