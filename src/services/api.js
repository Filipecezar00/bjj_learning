import api from "../services/api";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && token !== "") {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token anexado a requisição: ", config.url);
    } else {
      console.warn(
        "AVISO: Nenhum token encontrado para essa requisição:",
        config.url,
      );
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
    }
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      const res = await axios.post("http://localhost:3000/api/refresh", {
        refreshToken,
      });

      if (res.status === 200) {
        const { accessToken } = res.data;
        localStorage.setItem("token", accessToken);

        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
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
