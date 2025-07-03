import SelectContainer from "components/select/select-container";
import { redirect } from "next/navigation";

interface HomePageProps {
  searchParams: {
    category?: string[];
    title?: string[];
    count?: string[];
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const category = searchParams.category;
  const title = searchParams.title;
  const count = searchParams.count;

  const data = {
    category,
    title,
    count,
  };

  if (!category && title) {
    redirect("/");
  }

  return (
    <main className="w-full flex flex-col sm:gap-10 gap-4 sm:p-0 px-3">
      <header className="mt-12 w-full flex">
        <h1 className="w-full text-center font-bold text-6xl">Quiz</h1>
      </header>
      <SelectContainer data={data} />
    </main>
  );
}
