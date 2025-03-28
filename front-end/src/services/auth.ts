import { AccountData, Lecturer } from "../types/types";
import { ROLES } from "../types/roles";
import { CNHP } from "../types/local";
import { LOGIN_API, LECTURES_API } from "../api/apiUrl";
import { postData, getData } from "../utils/helps";

export const loginHanle = async ({ id, password }: AccountData) => {
  const res = await postData(LOGIN_API, { id, password });
  if (res && res.lecturer_id) {
    const lecturerInfo: Lecturer = await getData(
      `${LECTURES_API}/${res.lecturer_id}`
    );
    localStorage.setItem(
      CNHP,
      JSON.stringify(lecturerInfo.LecturerSubject.length > 0)
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
