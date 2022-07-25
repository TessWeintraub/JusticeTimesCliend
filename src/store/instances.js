import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  },
  withCredentials: true,
  validateStatus: status => status
});

instance.interceptors.response.use(
  async response => {
    if (response.status === 401 && response.data.message === "Access токен истек") {
      try {
        await axios.get("http://localhost:5000/auth/refresh", { withCredentials: true });
        return await retryRequest(response)
      } catch (e) {
        return e;
      }
    }
    return response;
  },
  error => Promise.reject(error)
);


const retryRequest = async response =>{
  return await axios[`${response.config.method}`](
    `${response.request.responseURL}`, {
      headers: {
        ...response.request.headers
      },
      withCredentials: response.config.withCredentials
    });
}