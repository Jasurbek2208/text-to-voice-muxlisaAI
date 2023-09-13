import axios from "axios";

const TOKEN = "2tS3A-ceAkJFUFnLsxXaEQ";
const BASE_URL = "https://api.muxlisa.uz/v1/api/services/";

export const myAxios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
});