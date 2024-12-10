import { DarkThemeToggle } from "flowbite-react";
import { useEffect, useState, useCallback } from "react";
import MemoizedBookList from "./Books";

const NYT_BEST_SELLERS_URL =
  "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=" +
  import.meta.env.VITE_NYT;

function App() {
  const [bestSellers, setBestSellers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBestSellers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(NYT_BEST_SELLERS_URL);
      const data = await response.json();
      setBestSellers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBestSellers();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <main className="flex min-h-screen max-w-[960px] flex-col items-center justify-center gap-2 dark:bg-gray-800">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-2xl dark:text-white">Flowbite React + Vite</h1>
          <DarkThemeToggle />
        </div>
        {isLoading ? <p>Loading...</p> : null}
        {error ? <p>{error}</p> : null}
        {bestSellers ? (
          <MemoizedBookList bestSellers={bestSellers} />
        ) : (
          <p>No books</p>
        )}
      </main>
    </div>
  );
}

export default App;
