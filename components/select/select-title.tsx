"use client";

import { Button } from "@material-tailwind/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTitles } from "actions/quiz-actions";
import { useRouter } from "next/navigation";
import { Spinner } from "@material-tailwind/react";
import { TitleCategory } from "type";

interface ISelectTitle {
  step: "CATEGORY" | "TITLE" | "COUNT";
  setStep: Dispatch<SetStateAction<"CATEGORY" | "TITLE" | "COUNT">>;
  categoryList: string[];
  isLoading: boolean;
  titleData?: string[];
}

const SelectTitle = ({
  step,
  setStep,
  categoryList,
  isLoading,
  titleData,
}: ISelectTitle) => {
  const [titleList, setTitleList] = useState<string[]>([]);
  const router = useRouter();

  const type = "TITLE";

  const getTitlesQuery = useQuery({
    queryKey: ["titles", ...categoryList],
    queryFn: () => getTitles(categoryList as TitleCategory[]),
    enabled: categoryList.length !== 0,
  });

  const saveTitle = () => {
    if (titleList.length === 0) {
      return;
    }

    setStep("COUNT");

    const currentParams = new URLSearchParams(window.location.search);

    currentParams.delete("title");

    // 기존 params 유지하고 title 추가
    titleList.forEach((title) => {
      currentParams.append("title", title);
    });

    router.push(`?${currentParams.toString()}`);
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (event.target.checked) {
      setTitleList((prev) => {
        if (prev.length === 0) {
          return [value];
        } else {
          return [...prev, value];
        }
      });
    } else {
      setTitleList((prev) => {
        if (prev.some((item) => item === value)) {
          return [...prev.filter((item) => item !== value)];
        } else {
          return prev;
        }
      });
    }
  };

  useEffect(() => {
    if (!titleData || !getTitlesQuery.data) return;

    const validTitleIds = getTitlesQuery.data.map((title) =>
      title.id.toString()
    );

    // titleData가 배열이든 아니든 배열로 만듦
    const titleArray = Array.isArray(titleData) ? titleData : [titleData];

    // 유효한 ID만 필터링
    const filteredTitles = titleArray.filter((id) =>
      validTitleIds.includes(id)
    );

    setTitleList(filteredTitles); // 내부 상태로 설정

    // searchParams에 잘못된 값이 있다면 URL에서 제거
    if (filteredTitles.length !== titleArray.length) {
      const params = new URLSearchParams(window.location.search);
      params.delete("title");

      filteredTitles.forEach((id) => {
        params.append("title", id);
      });

      router.replace(`?${params.toString()}`);
    }
  }, [titleData, getTitlesQuery.data]);

  return (
    <div
      className={`flex flex-col gap-2 py-5 px-3 bg-white rounded-lg ${
        step === type ? "" : "opacity-70 pointer-events-none"
      }`}
    >
      <h4 className="font-semibold text-lg">작품 목록</h4>
      {(isLoading || getTitlesQuery.isLoading) && (
        <div className="w-full flex justify-center pb-4">
          <Spinner width={30} height={30} />
        </div>
      )}
      {getTitlesQuery.data && (
        <>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
            {getTitlesQuery.data.length !== 0 ? (
              getTitlesQuery.data.map((title, index) => (
                <label
                  key={title.id}
                  className="relative flex items-center cursor-pointer "
                >
                  <input
                    type="checkbox"
                    className="peer hidden"
                    value={title.id}
                    onChange={changeTitle}
                    checked={titleList.includes(title.id.toString())}
                    name="title"
                  />
                  <span
                    className="w-5 h-5 rounded-full border-2 border-gray-400
              peer-checked:bg-red-500 peer-checked:border-transparent
              peer-checked:ring-2 peer-checked:ring-red-500
              peer-checked:ring-offset-2 peer-checked:ring-offset-white
              transition-all duration-150"
                  ></span>
                  <span className="ml-2">{`${title.name}${
                    title?.mobile_suit_titles
                      ? ` (${title?.mobile_suit_titles[0].count})`
                      : ""
                  }`}</span>
                  <p></p>
                </label>
              ))
            ) : (
              <div>작품이 존재하지 않습니다.</div>
            )}
          </div>
          <div className="w-full flex justify-between mt-5">
            <Button
              color="yellow"
              onClick={() => setStep("CATEGORY")}
              disabled={step !== type}
            >
              이전
            </Button>
            <Button color="yellow" onClick={saveTitle} disabled={step !== type}>
              선택
            </Button>
          </div>
        </>
      )}
      {!isLoading && categoryList.length === 0 && (
        <div className="w-full">
          <Button
            color="red"
            className="w-full"
            onClick={() => {
              setStep("CATEGORY");
              router.replace("/");
            }}
          >
            재시도
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectTitle;
