import axios from "axios";

const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDExNDYyMWJlN2RlMDUwMzNjNWI0YjgzMWFjYTE2YiIsIm5iZiI6MTc0NDgzMzkyOS4wNjksInN1YiI6IjY4MDAwZDg5Yzc3ZmQxZGY3NGFkMDIwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s50PtdyZ-tvUQ2awMWSzd6SVpcttHkjr7mFtqW2xv4A";

const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

export const getTrendingMovies = async (page) => {
  const response = await movieApi.get(`/3/trending/movie/week?page=${page}`);
  return response.data;
};

export const searchMovies = async (query) => {
  try {
    const response = await movieApi.get(
      `/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const searchMovieById = async (id) => {
  try {
    const response = await movieApi.get(`/3/movie/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const getMovieCast = async (id) => {
  const response = await movieApi.get(`/3/movie/${id}/credits`);
  return response.data;
};

export const getMovieReviews = async (id) => {
  const response = await movieApi.get(`/3/movie/${id}/reviews`);
  console.log(response.data);
  return response.data;
};
