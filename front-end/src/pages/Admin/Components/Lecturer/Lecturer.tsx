import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { CrudFormClass } from "../../../../class/CrudFormClass";
import { useState, useEffect } from "react";
import { getData } from "../../../../utils/helps";
import {
  CURRICULUM_API,
  LECTURES_API,
  DEGREE_API,
} from "../../../../api/apiUrl";
import { PK } from "../../../../api/primaryKey";
import { useToast } from "../../../../hook/useToast";

const Lecturer = () => {
  const [curriculum, setCurriculum] = useState<Obj[]>([]);
  const [degree, setDegree] = useState<Obj[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchHanle = async () => {
      try {
        const curriculums = await getData(CURRICULUM_API);
        setCurriculum(curriculums);
        const degrees = await getData(DEGREE_API);
        setDegree(degrees);
      } catch {
        showToast("Error fetching", "error");
      }
    };

    fetchHanle();
  }, [showToast]);

  const inputFields: CrudFromField[] = [
    CrudFormClass.create({
      key: PK.LECTURES_API,
      label: "Lecturer ID",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "first_name",
      label: "First Name",
      type: "text",
      isRequired: true,
      isVisible: false,
    }),
    CrudFormClass.create({
      key: "last_name",
      label: "Last Name",
      type: "text",
      isRequired: true,
      isVisible: false,
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
      isVisible: false,
    }),
    CrudFormClass.create({
      key: "password",
      label: "Password",
      type: "text",
      isRequired: true,
    }),
    CrudFormClass.create({
      key: PK.ACADEMIC_API,
      label: "Curriculum ID",
      type: "text",
      isRequired: true,
      isDropBox: true,
      dataDrop: curriculum,
      dropLabel: "academic_name",
      isVisible: true,
    }),
    CrudFormClass.create({
      key: PK.DEGREE_API,
      label: "Degree Name",
      type: "number",
      isRequired: true,
      isDropBox: true,
      dataDrop: degree,
      dropLabel: "degree_name",
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "subject_manage_id",
      label: "SubJect Manage ID",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
  ];
  return (
    <CrudForm inputFields={inputFields} url={LECTURES_API} isFilter={true} />
  );
};

export default Lecturer;
