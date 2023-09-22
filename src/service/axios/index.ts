import axios from "axios";

const BASE_URL = "http://localhost:9696/api/";

export const myAxios = axios.create({
  baseURL: BASE_URL,
  // headers: { "Content-Type": "multipart/form-data" },
});