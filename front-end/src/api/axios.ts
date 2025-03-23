import axios from "axios";
import { STATE } from "./state";

const TEST_URL = "http://localhost:3000";
const BE_URL = "http://localhost:3000/api/v1";

export default axios.create({
  baseURL: STATE === "TEST" ? TEST_URL : BE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
