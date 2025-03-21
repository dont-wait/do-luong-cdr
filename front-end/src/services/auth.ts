import axios from "../api/axios";
import { AccountData } from "../types/types";

export const loginHanle = async ({ id, password }: AccountData) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await axios.get(`/userAccounts/${id}`);

    if (res?.data) {
      if (res.data["Password"] === password) {
        console.log("Login successful!");
        return res.data["Role Id"];
      }
    }

    throw new Error("Invalid credentials");
  } catch {
    throw new Error("Login Fail!");
  }
};
