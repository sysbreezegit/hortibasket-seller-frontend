import axios from "axios";


export const AGENT_API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1/seller";


const axiosAdmin = axios.create({
  baseURL: AGENT_API,
});

axiosAdmin.interceptors.request.use(
  (config) => {
    if (
      !config?.url?.includes("/login") &&
      !config?.url?.includes("/register")
    ) {
      const storage = localStorage.getItem("affiliate-auth");
      let token: string | null = null;

      if (storage) {
        try {
          const parsed = JSON.parse(storage);
          token = parsed?.state?.accessToken ?? null;
        } catch (err) {
          console.error("Failed to parse affiliate-auth:", err);
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: any) => Promise.reject(error)
);

axiosAdmin.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token expired or unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("affiliate-auth");
    }

    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export { axiosAdmin };
export default axiosAdmin;
