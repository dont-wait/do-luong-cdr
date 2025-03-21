import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { CrudFormClass } from "../../../../class/CrudFormClass";
import { useState, useEffect } from "react";
import { fetchData } from "../../../../utils/helps";

const Lecturer = () => {
  const [data, setData] = useState<Obj[]>([]);

  const degrees: Obj[] = [
    {
      id: "1",
      degree: "Doctoral Degree",
    },
    {
      id: "2",
      degree: "Master Degree",
    },
    {
      id: "3",
      degree: "Pre-professional Degree",
    },
    {
      id: "4",
      degree: "Professional Degree",
    },
  ];

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const res = await fetchData("/curriculums");
        if (res.status >= 200 && res.status < 300) setData(res.data);
      } catch {
        console.error("Error fetching");
      }
    };

    fetchCurriculums();
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
      data,
      "Curriculum Name"
    ),
    new CrudFormClass("Degree", "text", true, false, true, degrees, "degree"),
  ];
  return <CrudForm inputFields={inputFields} url={"/lecturers"} />;
};

export default Lecturer;
