import { CrudFormClass } from "../../../../class/CrudFormClass";
import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { useState, useEffect } from "react";
import { fetchData } from "../../../../utils/helps";

const UserAccount = () => {
  const [lecturer, setLecturer] = useState<Obj[]>([]);
  const [roles, setRoles] = useState<Obj[]>([]);

  useEffect(() => {
    const fetchHanle = async () => {
      try {
        const lecturer = await fetchData("/lecturers");
        if (lecturer.status >= 200 && lecturer.status < 300)
          setLecturer(lecturer.data);
        const roles = await fetchData("/roles");
        if (roles.status >= 200 && roles.status < 300) setRoles(roles.data);
      } catch {
        console.error("Error fetching curriculums:");
      }
    };

    fetchHanle();
  }, []);

  const inputFields: CrudFromField[] = [
    new CrudFormClass("User Id", "text", true, true, true, lecturer, "id"),
    new CrudFormClass("Password", "text", true),
    new CrudFormClass("Role Id", "number", true, false, true, roles, "role"),
  ];
  return <CrudForm inputFields={inputFields} url={"/userAccounts"} />;
};

export default UserAccount;
