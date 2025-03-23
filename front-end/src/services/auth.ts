import { AccountData } from "../types/types";
import { ROLES } from "../types/roles";

export const loginHanle = async ({ id, password }: AccountData) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(id, password);
    // navigate to admin
    /* return {
       id: "01014017",
       role: ROLES.Admin,
       password: "123",
     }; */

    // navigate to CNHP

    // navigate to lecturer
    return {
      id: "01014017",
      role: ROLES.Lecturer,
      password: "123",
    };
  } catch {
    throw new Error("Login Fail!");
  }
};
