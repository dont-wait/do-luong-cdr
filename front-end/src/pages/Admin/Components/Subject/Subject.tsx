import { CrudFormClass } from "../../../../class/CrudFormClass";
import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { useState, useEffect } from "react";
import { fetchData } from "../../../../utils/helps";

const Subject = () => {
  const [data, setData] = useState<Obj[]>([]);
  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const res = await fetchData("/curriculums");
        if (res.status >= 200 && res.status < 300) setData(res.data);
      } catch {
        console.error("Error fetching curriculums:");
      }
    };

    fetchCurriculums();
  }, []);

  const inputFields: CrudFromField[] = [
    new CrudFormClass("Subject Id", "text", true, true),
    new CrudFormClass("Subject Name", "text", true),
    new CrudFormClass("Practical Credits", "number", true),
    new CrudFormClass("Theoretical Credits", "number", true),
    new CrudFormClass(
      "Curriculum Id",
      "number",
      true,
      false,
      true,
      data,
      "Curriculum Name",
      true
    ),
  ];
  return <CrudForm inputFields={inputFields} url={"/subjects"} />;
};

export default Subject;
