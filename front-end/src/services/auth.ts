import { AccountData } from "../types/types";
import { ROLES } from "../types/roles";
import { LOGIN_API } from "../api/apiUrl";
import { postData } from "../utils/helps";

export const loginHanle = async ({ id, password }: AccountData) => {
  const res = await postData(LOGIN_API, { id, password });
  return {
    id,
    role: res["admin_id"] ? ROLES.Admin : ROLES.Lecturer,
  };
};

export const logoutHandle = () => {
  localStorage.clear();
  return {
    user: "",
    role: 2000,
  };
};
