import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getTrendingMovies } from "../../api/searchMovies";
import s from "./HomePage.module.css";
import Loader from "../../components/Loader/Loader";
import MoviesList from "../../components/MovieList/MoviesList";
import Pagination from "../../components/Pagination/Pagination";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromParams = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const { results, total_pages } = await getTrendingMovies(currentPage);
        setMovies(results);
        setTotalPages(total_pages);
        setCurrentPage(pageFromParams);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, pageFromParams]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set("page", page);
    setSearchParams(updatedParams);
  };

  return (
    <main className={s.home_page}>
      {isLoading && <Loader />}
      {movies && <MoviesList movies={movies} />}
      {error && <ErrorMessage />}
      {!isLoading && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
};

export default HomePage;
