import { AccountData } from "../types/types";

export const loginHanle = async ({ id, password }: AccountData) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      id: "01014017",
      role: 2001,
      password: "123",
    };
  } catch {
    throw new Error("Login Fail!");
  }
};
