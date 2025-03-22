import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { CrudFormClass } from "../../../../class/CrudFormClass";
import { useState, useEffect } from "react";
import { fetchData } from "../../../../utils/helps";

const CNHP = () => {
  const [lecturer, setLecturer] = useState<Obj[]>([]);
  const [subject, setSubject] = useState<Obj[]>([]);

  useEffect(() => {
    const fetchHanle = async () => {
      try {
        const lecturer = await fetchData("/lecturers");
        if (lecturer.status >= 200 && lecturer.status < 300)
          setLecturer(lecturer.data);

        const subject = await fetchData("/subjects");
        if (subject.status >= 200 && subject.status < 300)
          setSubject(subject.data);
      } catch {
        console.error("Error fetching");
      }
    };

    fetchHanle();
  }, []);

  const inputFields: CrudFromField[] = [
    new CrudFormClass("ID", "text", true, true, true, lecturer, "id"),
    new CrudFormClass(
      "Subject",
      "text",
      true,
      false,
      true,
      subject,
      "Subject Name"
    ),
  ];
  return <CrudForm inputFields={inputFields} url={"/CNHPs"} />;
};

export default CNHP;
