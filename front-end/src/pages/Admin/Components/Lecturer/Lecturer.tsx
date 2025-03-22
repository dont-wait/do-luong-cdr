import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { CrudFormClass } from "../../../../class/CrudFormClass";
import { useState, useEffect } from "react";
import { fetchData } from "../../../../utils/helps";

const Lecturer = () => {
  const [curriculum, setCurriculum] = useState<Obj[]>([]);
  const [degrees, setDegrees] = useState<Obj[]>([]);

  useEffect(() => {
    const fetchHanle = async () => {
      try {
        const curriculum = await fetchData("/curriculums");
        if (curriculum.status >= 200 && curriculum.status < 300)
          setCurriculum(curriculum.data);

        const degrees = await fetchData("/degrees");
        if (degrees.status >= 200 && degrees.status < 300)
          setDegrees(degrees.data);
      } catch {
        console.error("Error fetching");
      }
    };

    fetchHanle();
  }, []);

  const inputFields: CrudFromField[] = [
    new CrudFormClass("Lecturer Id", "text", true, true),
    new CrudFormClass("First Name", "text", true),
    new CrudFormClass("Last Name", "text", true),
    new CrudFormClass("Email", "email", false),
    new CrudFormClass("Phone", "text", false),
    new CrudFormClass(
      "Curriculum Id",
      "text",
      true,
      false,
      true,
      curriculum,
      "Curriculum Name"
    ),
    new CrudFormClass("Degree", "text", true, false, true, degrees, "degree"),
  ];
  return <CrudForm inputFields={inputFields} url={"/lecturers"} />;
};

export default Lecturer;
