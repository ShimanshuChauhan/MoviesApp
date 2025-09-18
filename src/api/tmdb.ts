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

type movieDetails = {
  id: number,
  title: string,
  overview: string,
  poster_path: string,
  release_date: string,
  vote_average: number
}

type favouriteMovieDetails = {
  id: number;
  poster: string;
  title: string;
  rating: number;
  duration: number; // runtime in minutes
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

export const getMovieDetailsById = async (id: number) => {
  const res = await api.get(`movie/${id}`, {
    params: { language: "en-US" }
  })
  const data = res.data;
  console.log(data);
  const movieDetails: movieDetails = {
    id: data.id,
    title: data.title,
    overview: data.overview,
    poster_path: `https://image.tmdb.org/t/p/original${data.poster_path}`,
    release_date: data.release_date,
    vote_average: data.vote_average.toFixed(1)
  }
  return movieDetails;
}

export const getFavouriteMoviesDetails = async (favouriteIds: number[]) => {
  const favouriteMovies: favouriteMovieDetails[] = [];

  for (const id of favouriteIds) {
    const res = await api.get(`movie/${id}`, {
      params: { language: "en-US" }
    });
    const data = res.data;

    favouriteMovies.push({
      id: data.id,
      poster: `https://image.tmdb.org/t/p/original${data.poster_path}`,
      title: data.title,
      rating: data.vote_average.toFixed(1),
      duration: data.runtime
    });
  }

  return favouriteMovies;
};
