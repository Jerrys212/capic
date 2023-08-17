import axios from "axios";
const axiosCapic = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND}`,
});

export default axiosCapic;
