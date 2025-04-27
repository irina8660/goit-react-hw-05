import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { searchMovieById } from "../../api/searchMovies";

import s from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import { BackLink } from "../../components/BackLink/BackLink";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const MovieDetailsPage = () => {
  const movieDefaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  const location = useLocation();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const backLink = useRef(location.state ?? "/movies");

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        setError(false);
        const result = await searchMovieById(movieId);
        setMovie(result);
        console.log(result);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieById();
  }, [movieId]);

  if (!movie) return null;

  const {
    genres,
    original_title,
    title,
    overview,
    poster_path,
    release_date,
    runtime,
    production_countries,
    tagline,
    vote_average,
  } = movie;

  const totalGenres = genres?.map((genre) => genre.name).join(", ") ?? "";
  const totalCountries =
    production_countries?.map((country) => country.name).join(", ") ?? "";

  return (
    <div className={s.wrapper}>
      <BackLink to={backLink.current}>Back to movies</BackLink>
      <div className={s.info_wrapper}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300${poster_path}`
              : movieDefaultImg
          }
          alt={title}
          className={s.movies_img}
        />

        <ul className={s.movie_info}>
          {title && (
            <li className={s.title_wrapper}>
              <h2 className={s.movie_title}>
                {title}
                {release_date && `(${new Date(release_date).getFullYear()})`}
              </h2>
              {original_title && (
                <p className={s.subtitle}>Origin title: {original_title}</p>
              )}
            </li>
          )}
          {runtime && (
            <li className={s.info}>
              <h3 className={s.info_header}>Duration:</h3>
              <p className={s.info__item}>{runtime} min.</p>
            </li>
          )}
          {vote_average && (
            <li className={s.info}>
              <h3 className={s.info_header}>Rating:</h3>
              <p className={s.info__item}>{Math.round(vote_average * 10)}%</p>
            </li>
          )}
          {overview && (
            <li className={s.info}>
              <h3 className={s.info_header}>Description:</h3>{" "}
              <p className={s.info__item}>{overview}</p>
            </li>
          )}
          {totalGenres && totalGenres.length > 0 && (
            <li className={s.info}>
              <h3 className={s.info_header}>Genres:</h3>
              <p className={s.info__item}>{totalGenres}</p>
            </li>
          )}
          {totalCountries && totalCountries.length > 0 && (
            <li className={s.info}>
              <h3 className={s.info_header}>Counties:</h3>
              <p className={s.info__item}>{totalCountries}</p>
            </li>
          )}
          {tagline && (
            <li className={s.info}>
              <h3 className={s.info_header}>Tagline:</h3>
              <p className={s.info__item}>{tagline}</p>
            </li>
          )}
          <li className={s.info_nav}>
            {!isLoading && !error && (
              <ul className={s.link_list}>
                <li>
                  <NavLink
                    to="cast"
                    state={location.state}
                    className={buildLinkClass}
                  >
                    Cast
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="reviews"
                    state={location.state}
                    className={buildLinkClass}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default MovieDetailsPage;
