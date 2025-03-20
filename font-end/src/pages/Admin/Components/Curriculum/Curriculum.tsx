import CrudForm from "../../../../components/CrudForm";
import { CrudFromField } from "../../../../types/types";
import { CrudFormClass } from "../../../../class/CrudFormClass";
import { useState, useEffect } from "react";
import { Obj } from "../../../../types/types";
import { fetchData } from "../../../../utils/helps";

const Curriculum = () => {
  const [data, setData] = useState<Obj[]>([]);

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
    new CrudFormClass("Curriculum Type", "number", true),
    new CrudFormClass("Curriculum Level", "number", true),
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
