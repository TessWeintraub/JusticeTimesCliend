import axios from "axios";

export const instance = axios.create({
  baseURL: "http://5.181.109.106:5000/api/",
  headers: {'Content-Type': 'application/json;charset=utf-8'},
})
