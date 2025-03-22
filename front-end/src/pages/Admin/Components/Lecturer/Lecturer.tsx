import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { CrudFormClass } from "../../../../class/CrudFormClass";
import { useState, useEffect } from "react";
import { fetchData } from "../../../../utils/helps";
import {
  CURRICULUM_API,
  LECTURES_API,
  DEGREE_API,
} from "../../../../api/apiUrl";

const Lecturer = () => {
  const [curriculum, setCurriculum] = useState<Obj[]>([]);
  const [degree, setDegree] = useState<Obj[]>([]);

  useEffect(() => {
    const fetchHanle = async () => {
      try {
        const curriculums = await fetchData(CURRICULUM_API);
        if (curriculums.data.statusCode === 200) {
          setCurriculum(curriculums.data.data);
        }
        const degrees = await fetchData(DEGREE_API);
        if (degrees.data.statusCode === 200) setDegree(degrees.data.data);
      } catch {
        console.error("Error fetching");
      }
    };

    fetchHanle();
  }, []);

  const inputFields: CrudFromField[] = [
    CrudFormClass.create({
      key: "lecturer_id",
      label: "Lecturer Id",
      type: "text",
      isRequired: true,
    }),
    CrudFormClass.create({
      key: "first_name",
      label: "First Name",
      type: "text",
      isRequired: true,
    }),
    CrudFormClass.create({
      key: "last_name",
      label: "Last Name",
      type: "text",
      isRequired: true,
    }),
    CrudFormClass.create({
      key: "email",
      label: "Email",
      type: "email",
      isRequired: true,
    }),
    CrudFormClass.create({
      key: "phone",
      label: "Phone",
      type: "text",
      isRequired: false,
    }),
    CrudFormClass.create({
      key: "password",
      label: "Password",
      type: "text",
      isRequired: true,
    }),
    CrudFormClass.create({
      key: "academic_id",
      label: "Curriculum Id",
      type: "text",
      isRequired: true,
      isDropBox: true,
      dataDrop: curriculum,
      dropLabel: "academic_name",
    }),
    CrudFormClass.create({
      key: "degree_id",
      label: "Degree Name",
      type: "number",
      isRequired: true,
      isDropBox: true,
      dataDrop: degree,
      dropLabel: "degree_name",
    }),
  ];
  return <CrudForm inputFields={inputFields} url={LECTURES_API} />;
};

export default Lecturer;
