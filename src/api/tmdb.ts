import api from "../utils/api";

export const getPopularMoviesData = async () => {
  const res = await api.get("/movie/popular", {
    params: { language: "en-US", page: 1 },
  });
  return res.data;
};
