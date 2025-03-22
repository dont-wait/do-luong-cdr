import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { CrudFormClass } from "../../../../class/CrudFormClass";
import { useState, useEffect } from "react";
import { fetchData } from "../../../../utils/helps";

const Curriculum = () => {
  const [department, setDepartment] = useState<Obj[]>([]);
  const [levels, setLevels] = useState<Obj[]>([]);
  const [types, setTypes] = useState<Obj[]>([]);

  useEffect(() => {
    const fetchHanle = async () => {
      try {
        const department = await fetchData("/academics");
        if (department.status >= 200 && department.status < 300)
          setDepartment(department.data);
        const levels = await fetchData("/levels");

        if (levels.status >= 200 && levels.status < 300) setLevels(levels.data);
        const types = await fetchData("/types");

        if (types.status >= 200 && types.status < 300) setTypes(types.data);
      } catch {
        console.error("Error fetching curriculums:");
      }
    };

    fetchHanle();
  }, []);

  const inputFields: CrudFromField[] = [
    new CrudFormClass("Curriculum Id", "text", true, true),
    new CrudFormClass("Curriculum Name", "text", true),
    new CrudFormClass(
      "Curriculum Type",
      "number",
      true,
      false,
      true,
      types,
      "type"
    ),
    new CrudFormClass(
      "Curriculum Level",
      "number",
      true,
      false,
      true,
      levels,
      "level"
    ),
    new CrudFormClass(
      "Department Id",
      "text",
      true,
      false,
      true,
      department,
      "Department"
    ),
  ];
  return <CrudForm inputFields={inputFields} url='/curriculums' />;
};

export default Curriculum;
