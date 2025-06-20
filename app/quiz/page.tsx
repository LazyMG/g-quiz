import QuizContainer from "components/quiz/quiz-container";

const QuizPage = () => {
  return (
    <main className="w-full h-full flex flex-col gap-12">
      <header className="mt-28 w-full flex">
        <h1 className="w-full text-center font-bold text-6xl">Quiz</h1>
      </header>
      <QuizContainer />
    </main>
  );
};

export default QuizPage;
