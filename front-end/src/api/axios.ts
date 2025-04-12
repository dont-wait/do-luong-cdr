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

    // Lưu access token vào cookie bằng js-cookie
    const accessToken = response.data.data.access_token;
    console.log(accessToken);
    Cookies.set("access_token", accessToken, {
      path: response.data.data.user["admin_id"] ? "/admin" : "/lecturer",
      secure: false,
      sameSite: "Strict",
      expires: 1,
    });

    // Trả về thông tin người dùng
    return response.data.data.user;
  } catch (error) {
    console.error(
      "Error during login:",
      error.response ? error.response.data : error.message
    );
  }
};

export { apiClient, login };
