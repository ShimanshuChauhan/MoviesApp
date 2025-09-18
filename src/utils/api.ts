import axios from "axios";

const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTdkZmRjOWJlMmQ2OGQwY2NiOGZkMGU0YWY0NDY3NiIsIm5iZiI6MTc1ODAwMDg0MC44NjYsInN1YiI6IjY4YzhmNmM4MTM2YmMyMjlkMWRjZDI0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._aitaNjtIBWxVZVrSGY2N7mv8tp8idiwQ35nMpYgsuE";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default api;