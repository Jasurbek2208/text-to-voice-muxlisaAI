import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://textvoice-back-production.up.railway.app/api/";
const USER_TOKEN = Cookies.get("$T$O$K$E$N$") || "";

export const myAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: USER_TOKEN,
    // "Content-Type": "multipart/form-data"
  },
});