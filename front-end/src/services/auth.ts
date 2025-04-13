import { AccountData, Lecturer } from "../types/types";
import { CNHP } from "../types/local";
import { LECTURES_API } from "../api/apiUrl";
import { getData } from "../utils/helps";
import { login } from "../api/axios";

export const loginHanle = async ({ id, password }: AccountData) => {
  const res = await login(id, password);
  if (res) {
    const { user, accessToken } = res;
    if (user && user.lecturer_id) {
      const lecturerInfo: Lecturer = await getData(
        `${LECTURES_API}/${user.lecturer_id}`
      );

      localStorage.setItem(
        CNHP,
        JSON.stringify(lecturerInfo.subjects.length > 0)
      );
    }
    return {
      id,
      role: user.role_id,
      accessToken,
    };
  }
};

export const logoutHandle = () => {
  localStorage.clear();
  return {
    user: "",
    role: 2000,
  };
};
