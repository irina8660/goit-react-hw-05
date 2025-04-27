import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api/searchMovies";
import s from "./MovieCast.module.css";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movieCast, setMovieCast] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const response = await getMovieCast(movieId);
        setMovieCast(response.cast); // ← тут потрібно взяти response.cast
        console.log(response.cast);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <div>
      {isLoading && <Loader />}
      {!error && !isLoading && movieCast && movieCast.length > 0 && (
        <ul className={s.list}>
          {movieCast.map(({ cast_id, character, name, profile_path }) => (
            <li key={cast_id} className={s.item}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : defaultImg
                }
                alt={name}
                className={s.img}
              />
              <div className={s.wrapper}>
                <h3 className={s.name}>{name}</h3>
                <h4 className={s.title}>{character}</h4>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
