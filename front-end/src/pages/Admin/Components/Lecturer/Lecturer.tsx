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
import { useToast } from "../../../../hook/useToast";

const Lecturer = () => {
  const [curriculum, setCurriculum] = useState<Obj[]>([]);
  const [degree, setDegree] = useState<Obj[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchHanle = async () => {
      try {
        const curriculums = await fetchData(CURRICULUM_API);
        setCurriculum(curriculums.data.data);
        const degrees = await fetchData(DEGREE_API);
        setDegree(degrees.data.data);
      } catch {
        showToast("Error fetching", "error");
      }
    };

    fetchHanle();
  }, [showToast]);

  const inputFields: CrudFromField[] = [
    CrudFormClass.create({
      key: "lecturer_id",
      label: "Lecturer Id",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "first_name",
      label: "First Name",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "last_name",
      label: "Last Name",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "email",
      label: "Email",
      type: "email",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "phone",
      label: "Phone",
      type: "text",
      isRequired: false,
      isVisible: true,
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
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "degree_id",
      label: "Degree Name",
      type: "number",
      isRequired: true,
      isDropBox: true,
      dataDrop: degree,
      dropLabel: "degree_name",
      isVisible: true,
    }),
  ];
  return (
    <CrudForm inputFields={inputFields} url={LECTURES_API} isFilter={true} />
  );
};

export default Lecturer;
