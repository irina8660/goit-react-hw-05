import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import s from "./MoviesPage.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import { searchMovies } from "../../api/searchMovies";
import MoviesList from "../../components/MovieList/MoviesList";
import Pagination from "../../components/Pagination/Pagination";

const MoviePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const pageFromParams = Number(searchParams.get("page")) || 1;
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const { results, total_pages } = await searchMovies(
          query,
          pageFromParams
        );
        console.log("RESULTS FROM API:", results);
        setMovies(results ?? []);
        setTotalPages(total_pages);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.trim() !== "") {
      fetchMovies();
    } else {
      setMovies([]);
      setTotalPages(null);
    }
  }, [query, pageFromParams]);

  const handleSearch = (query) => {
    setSearchParams({ query, page: 1 });
  };

  const handlePageChange = (page) => {
    setSearchParams({ query, page });
  };

  return (
    <div className={s.container}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {!isLoading && !error && movies?.length > 0 && (
        <MoviesList movies={movies} />
      )}
      {error && <ErrorMessage />}

      {totalPages > 1 && !isLoading && !error && (
        <Pagination
          totalPages={totalPages}
          currentPage={pageFromParams}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default MoviePage;
