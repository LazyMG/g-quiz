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
    <main className="w-full flex flex-col gap-12">
      <header className="mt-28 w-full flex">
        <h1 className="w-full text-center font-bold text-6xl">Quiz</h1>
      </header>
      <SelectContainer data={data} />
    </main>
  );
}
