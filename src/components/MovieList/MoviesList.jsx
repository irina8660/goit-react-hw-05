import s from "./MoviesList.module.css";
import { Link, useLocation } from "react-router-dom";

const MoviesList = ({ movies }) => {
  const location = useLocation();
  const movieImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <ul className={s.movies_list}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.movies_item}>
          <Link
            to={`/movies/${movie.id}`}
            state={location}
            className={s.movies_link}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : movieImg
              }
              alt={movie.title}
              className={s.movies_img}
            />
            <p className={s.movies_title}>
              {`${movie.title} ${
                movie.release_date &&
                `(${new Date(movie.release_date).getFullYear()})`
              }`}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
