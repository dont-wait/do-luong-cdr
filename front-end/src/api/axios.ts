import { LOGIN_API } from "./apiUrl";
import axios from "axios";
import { STATE } from "./state";
import Cookies from "js-cookie";

const TEST_URL = "http://localhost:3000";
const BE_URL = "http://localhost:3000/api/v1";

const apiClient = axios.create({
  baseURL: STATE ? TEST_URL : BE_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
  withCredentials: true,
});

// Interceptor để thêm access_token vào header của tất cả các yêu cầu
apiClient.interceptors.request.use((config) => {
  const separator = config.url?.includes("?") ? "&" : "?";
  config.url = `${config.url}${separator}_t=${new Date().getTime()}`;

  // Lấy access_token từ cookie và thêm vào header
  const accessToken = Cookies.get("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

const login = async (id: string, password: string) => {
  try {
    const response = await apiClient.post(LOGIN_API, {
      id,
      password,
    });

    Cookies.set("access_token", response.data.data.access_token, {
      path: "/",
      secure: false,
      expires: 1,
    });

    return {
      user: response.data.data.user,
      accessToken: response.data.data.access_token,
    };
  } catch {
    console.error("Error during login:");
  }
};

export { apiClient, login };
