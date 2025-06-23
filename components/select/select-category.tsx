"use client";

import { Spinner } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TitleCategory } from "type";

interface ISelectCategory {
  step: "CATEGORY" | "TITLE" | "COUNT";
  setStep: Dispatch<SetStateAction<"CATEGORY" | "TITLE" | "COUNT">>;
  categoryData?: string[];
  categoryList: string[];
  setCategoryList: Dispatch<SetStateAction<string[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const VALID_CATEGORIES: TitleCategory[] = [
  "ANIMATION",
  "COMICS",
  "NOVEL",
  "GAME",
  "ETC",
];

const SelectCategory = ({
  step,
  setStep,
  categoryData,
  categoryList,
  setCategoryList,
  isLoading,
  setIsLoading,
}: ISelectCategory) => {
  const router = useRouter();

  const type = "CATEGORY";

  const saveCategory = () => {
    if (categoryList.length === 0) {
      return;
    }
    setStep("TITLE");

    const params = new URLSearchParams();
    categoryList.forEach((category) => params.append("category", category));

    router.push(`?${params.toString()}`);
  };

  const changeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCategoryList((prev) => {
        if (prev.length === 0) {
          return [value];
        } else {
          return [...prev, value];
        }
      });
    } else {
      setCategoryList((prev) => {
        if (prev.some((item) => item === value)) {
          return [...prev.filter((item) => item !== value)];
        } else {
          return prev;
        }
      });
    }
  };

  useEffect(() => {
    if (categoryData) {
      if (Array.isArray(categoryData)) {
        const isValid = categoryData.every((item) =>
          VALID_CATEGORIES.includes(item as TitleCategory)
        );

        setCategoryList(isValid ? (categoryData as TitleCategory[]) : []);
      } else {
        const isValid = VALID_CATEGORIES.includes(
          categoryData as TitleCategory
        );
        setCategoryList(isValid ? [categoryData as TitleCategory] : []);
      }
    }
    setIsLoading(false);
  }, [categoryData]);

  return (
    <div
      className={`flex flex-col gap-2 py-5 px-3 bg-white rounded-lg ${
        step === type ? "" : "opacity-70 pointer-events-none"
      }`}
    >
      <h4 className="font-semibold text-lg">작품 카테고리</h4>
      {isLoading ? (
        <div className="w-full flex justify-center pb-4">
          <Spinner width={30} height={30} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            <label className="relative flex items-center cursor-pointer ">
              <input
                type="checkbox"
                className="peer hidden"
                value={"ANIMATION"}
                onChange={changeCategory}
                checked={categoryList.includes("ANIMATION")}
              />
              <span
                className="w-5 h-5 rounded-full border-2 border-gray-400
              peer-checked:bg-red-500 peer-checked:border-transparent
              peer-checked:ring-2 peer-checked:ring-red-500
              peer-checked:ring-offset-2 peer-checked:ring-offset-white
              transition-all duration-150"
              ></span>
              <span className="ml-2">애니메이션</span>
            </label>
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                value={"COMICS"}
                onChange={changeCategory}
                checked={categoryList.includes("COMICS")}
              />
              <span
                className="w-5 h-5 rounded-full border-2 border-gray-400
              peer-checked:bg-red-500 peer-checked:border-transparent
              peer-checked:ring-2 peer-checked:ring-red-500
              peer-checked:ring-offset-2 peer-checked:ring-offset-white
              transition-all duration-150"
              ></span>
              <span className="ml-2">코믹스</span>
            </label>
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                value={"NOVEL"}
                onChange={changeCategory}
                checked={categoryList.includes("NOVEL")}
              />
              <span
                className="w-5 h-5 rounded-full border-2 border-gray-400
              peer-checked:bg-red-500 peer-checked:border-transparent
              peer-checked:ring-2 peer-checked:ring-red-500
              peer-checked:ring-offset-2 peer-checked:ring-offset-white
              transition-all duration-150"
              ></span>
              <span className="ml-2">소설</span>
            </label>
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                value={"GAME"}
                onChange={changeCategory}
                checked={categoryList.includes("GAME")}
              />
              <span
                className="w-5 h-5 rounded-full border-2 border-gray-400
              peer-checked:bg-red-500 peer-checked:border-transparent
              peer-checked:ring-2 peer-checked:ring-red-500
              peer-checked:ring-offset-2 peer-checked:ring-offset-white
              transition-all duration-150"
              ></span>
              <span className="ml-2">게임</span>
            </label>
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                value={"ETC"}
                onChange={changeCategory}
                checked={categoryList.includes("ETC")}
              />
              <span
                className="w-5 h-5 rounded-full border-2 border-gray-400
              peer-checked:bg-red-500 peer-checked:border-transparent
              peer-checked:ring-2 peer-checked:ring-red-500
              peer-checked:ring-offset-2 peer-checked:ring-offset-white
              transition-all duration-150"
              ></span>
              <span className="ml-2">기타</span>
            </label>
          </div>
          <div className="w-full flex justify-end">
            <Button
              color="yellow"
              onClick={saveCategory}
              disabled={step !== type}
            >
              선택
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectCategory;
