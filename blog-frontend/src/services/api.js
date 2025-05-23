import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, 
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  }
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerUser = data => API.post("/auth/signup", data).then(res => res.data);
export const loginUser = data => API.post("/auth/login", data).then(res => res.data);
export const getAllPosts = () => API.get("/posts").then(res => res.data);
export const getMyPosts = () => API.get("/posts/mine").then(res => res.data);
export const createPost = data => API.post("/posts", data).then(res => res.data);
