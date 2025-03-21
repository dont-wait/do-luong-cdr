import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { CrudFormClass } from "../../../../class/CrudFormClass";
import { useState, useEffect } from "react";
import { fetchData } from "../../../../utils/helps";

const Curriculum = () => {
  const [data, setData] = useState<Obj[]>([]);
  const levels: Obj[] = [
    {
      id: "1",
      level: "Higher Education",
    },
    {
      id: "2",
      level: "Postgraduate Education",
    },
  ];
  const types: Obj[] = [
    {
      id: "1",
      type: "Formal Curriculum",
    },
    {
      id: "2",
      type: "Informal Curriculum",
    },
  ];

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const res = await fetchData("/departments");
        if (res.status >= 200 && res.status < 300) setData(res.data);
      } catch {
        console.error("Error fetching curriculums:");
      }
    };

    fetchCurriculums();
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
      data,
      "Department"
    ),
  ];
  return <CrudForm inputFields={inputFields} url='/curriculums' />;
};

export default Curriculum;
