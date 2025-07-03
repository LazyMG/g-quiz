import HomeButton from "components/home-button";
import QuizContainer from "components/quiz/quiz-container";

const QuizPage = () => {
  return (
    <main className="w-full h-full flex flex-col gap-10 sm:p-0 px-3">
      <header className="mt-12 w-full flex relative">
        <h1 className="w-full text-center font-bold text-6xl">Quiz</h1>
        <HomeButton />
      </header>
      <QuizContainer />
    </main>
  );
};

export default QuizPage;
