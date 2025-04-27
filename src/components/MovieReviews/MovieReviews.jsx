import { useEffect, useState } from "react";
import s from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { getMovieReviews } from "../../api/searchMovies";

const MovieReviews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const { results } = await getMovieReviews(movieId);
        setReviews(results);
        console.log(results);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [movieId]);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <div>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {!error && !isLoading && (
        <ul className={s.list}>
          {reviews.length > 0
            ? reviews.map(
                ({
                  author,
                  content,
                  created_at,
                  id,
                  author_details: { avatar_path },
                }) => (
                  <li key={id} className={s.item}>
                    <img
                      src={
                        avatar_path
                          ? `https://image.tmdb.org/t/p/w200${avatar_path}`
                          : defaultImg
                      }
                      alt={author}
                      className={s.img}
                    />

                    <div className={s.rev_wrap}>
                      <div>
                        <h3 className={s.name}>{author}</h3>
                        <p className={s.date}>
                          {format(new Date(created_at), "d.MM.yyyy")}
                        </p>
                      </div>
                      <p className={s.content}>{content}</p>
                    </div>
                  </li>
                )
              )
            : "We have not found any reviews for this film."}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
