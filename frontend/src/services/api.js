import axios from "axios";
const API_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
    }
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const res = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.accessToken);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      }
    } catch (refreshError) {
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    }
    return Promise.reject(error);
  },
);

export default api;
