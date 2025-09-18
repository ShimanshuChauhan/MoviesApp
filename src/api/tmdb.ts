import api from "../utils/api";

type popularMovie = {
  id: number,
  poster_path: string
}

type trendingMovie = {
  id: number,
  poster_path: string
}

type searchResults = {
  id: number,
  name: string,
  release_date: Date,
  poster_path: string
}

export const getPopularMoviesData = async () => {
  const res = await api.get("/movie/popular", {
    params: { language: "en-US", page: 1 },
  });

  const data = res.data.results;
  const popularMovies: popularMovie[] = data.map((movie: any) => {
    return {
      id: movie.id,
      poster_path: `https://image.tmdb.org/t/p/original${movie.poster_path}`
    }
  })
  return popularMovies;
};

export const getTrendingMoviesData = async () => {
  const res = await api.get("/trending/movie/day", {
    params: { language: "en-US", page: 1 }
  });

  const data = res.data.results;
  const trendingMovies: trendingMovie[] = data.map((movie: any) => {
    return {
      id: movie.id,
      poster_path: `https://image.tmdb.org/t/p/original${movie.poster_path}`
    }
  })
  return trendingMovies;
}

export const searchMoviesByName = async (input: string) => {
  const res = await api.get(`/search/movie?query=${input}`);
  const data = res.data.results;
  const searchResults: searchResults[] = data.map((movie: any) => {
    return {
      id: movie.id,
      name: movie.title,
      release_date: movie.release_date,
      poster_path: `https://image.tmdb.org/t/p/original${movie.poster_path}`
    }
  })
  return searchResults;
}

