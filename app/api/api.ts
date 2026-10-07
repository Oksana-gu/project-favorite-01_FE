import axios from "axios";

export const api = axios.create({
  baseURL: "https://project-favorite-01-be.onrender.com/api",
  withCredentials: true,
});