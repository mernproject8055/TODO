import axios from "axios";

const API = axios.create({
  baseURL: "https://todo-osgs.onrender.com/"
});

export default API;
