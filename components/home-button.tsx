"use client";

import { IconButton } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "node_modules/recoil";
import { quizConfigState } from "utils/recoil/atoms";

const HomeButton = () => {
  const router = useRouter();
  const setQuizConfig = useSetRecoilState(quizConfigState);

  const clickHomeButton = () => {
    setQuizConfig(null);
    router.replace("/");
  };

  return (
    <div className="absolute top-0 bottom-0 my-auto flex items-center">
      <IconButton onClick={clickHomeButton}>
        <i className="fas fa-home " />
      </IconButton>
    </div>
  );
};

export default HomeButton;
