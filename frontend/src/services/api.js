import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api"
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("lumina_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401 Unauthorized (expired / invalid token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("lumina_token");
      localStorage.removeItem("lumina_user");
      // Reload to let Redux re-initialise from empty localStorage
      if (!window.location.pathname.startsWith("/login") &&
          !window.location.pathname.startsWith("/register")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
