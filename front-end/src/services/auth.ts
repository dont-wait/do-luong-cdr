import { AccountData, Lecturer } from "../types/types";
import { ROLES } from "../types/roles";
import { CNHP } from "../types/local";
import { LECTURES_API } from "../api/apiUrl";
import { getData } from "../utils/helps";
import { login } from "../api/axios";

export const loginHanle = async ({ id, password }: AccountData) => {
  const res = await login(id, password);

  if (res && res.lecturer_id) {
    const lecturerInfo: Lecturer = await getData(
      `${LECTURES_API}/${res.lecturer_id}`
    );
    localStorage.setItem(
      CNHP,
      JSON.stringify(lecturerInfo.subjects.length > 0)
    );
  }
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
