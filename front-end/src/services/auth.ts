// import axios from "../api/axios";
import { AccountData } from "../types/types";

export const loginHanle = async ({ id, password }: AccountData) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // const res = await axios.get(`/userAccounts`);

    return {
      id: "01014017",
      role: 2001,
      password: "123",
    };

    // if (res?.data) {
    //   if (res.data["Password"] === password) {
    //     console.log("Login successful!");
    //     return {
    //       id: res.data["id"],
    //       role: res.data["Role Id"],
    //       password: res.data["Password"],
    //     };
    //   }
    // }

    // throw new Error("Invalid credentials");
  } catch {
    throw new Error("Login Fail!");
  }
};
