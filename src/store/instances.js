import axios from "axios";

export const instance = axios.create({
  baseURL: "https://5.181.109.106:3000/api/",
  headers: {'Content-Type': 'application/json;charset=utf-8'},
})
