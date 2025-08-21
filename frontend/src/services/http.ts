// src/services/http.ts
import axios from "axios";

const http = axios.create({
  baseURL:"https://swan-botanical.onrender.com/api",
  withCredentials: true, // to send cookies
});

export default http;
