import { CrudFormClass } from "../../../../class/CrudFormClass";
import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { useState, useEffect } from "react";
import { fetchData } from "../../../../utils/helps";
import { ROLES } from "../../../../types/roles";

const UserAccount = () => {
  const [data, setData] = useState<Obj[]>([]);
  const roles: Obj[] = [
    {
      id: ROLES.Admin.toString(),
      role: "Admin",
    },
    { id: ROLES.Lecturer.toString(), role: "Lecturer" },
    {
      id: ROLES.CNHP.toString(),
      role: "CNHP",
    },
  ];
  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const res = await fetchData("/lecturers");
        if (res.status >= 200 && res.status < 300) setData(res.data);
      } catch {
        console.error("Error fetching curriculums:");
      }
    };

    fetchCurriculums();
  }, []);

  const inputFields: CrudFromField[] = [
    new CrudFormClass("Lecturer Id", "text", true, true, true, data, "id"),
    new CrudFormClass("Password", "text", true),
    new CrudFormClass("Role Id", "number", true, false, true, roles, "role"),
  ];
  return <CrudForm inputFields={inputFields} url={"/userAccounts"} />;
};

export default UserAccount;
