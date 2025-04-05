import axios from "axios";
import { STATE } from "./state";

const TEST_URL = "http://localhost:3000";
const BE_URL = "http://localhost:3000/api/v1";

const apiClient = axios.create({
  baseURL: STATE ? TEST_URL : BE_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  },
});

// Thêm interceptor để đảm bảo không có cache cho mọi request
apiClient.interceptors.request.use((config) => {
  // Thêm timestamp vào mọi URL request để đảm bảo luôn nhận dữ liệu mới nhất
  const separator = config.url?.includes('?') ? '&' : '?';
  config.url = `${config.url}${separator}_t=${new Date().getTime()}`;
  
  return config;
});

export default apiClient;