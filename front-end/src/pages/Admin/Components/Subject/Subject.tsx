import { useState, useEffect } from "react";
import { CrudFormClass } from "../../../../class/CrudFormClass";
import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { getData } from "../../../../utils/helps";
import {
  SUBJECT_API,
  CURRICULUM_API,
  LECTURES_API,
} from "../../../../api/apiUrl";
import { PK } from "../../../../api/primaryKey";
import { useToast } from "../../../../hook/useToast";

const Subject = () => {
  const [curriculum, setCurriculum] = useState<Obj[]>([]);
  const [lecturer, setLecturer] = useState<Obj[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const curriculums = await getData(CURRICULUM_API);
        setCurriculum(curriculums);

        const lectuers = await getData(LECTURES_API);
        setLecturer(lectuers);
      } catch {
        showToast("Error fetching!", "error");
      }
    };
    fetchCurriculums();
  }, [showToast]);

  const inputFields: CrudFromField[] = [
    CrudFormClass.create({
      key: PK.SUBJECT_API,
      label: "Subject ID",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "subject_name",
      label: "Subject Name",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "practical_credits",
      label: "Practical Credits",
      type: "number",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "theoretical_credits",
      label: "Theoretical Credits",
      type: "number",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "Description",
      label: "description",
      type: "text",
      isRequired: false,
      isVisible: false,
    }),
    CrudFormClass.create({
      key: PK.LECTURES_API,
      label: "Lecturer ID",
      type: "text",
      isRequired: true,
      isVisible: true,
      isDropBox: true,
      dataDrop: lecturer,
      dropLabel: "email",
    }),
    CrudFormClass.create({
      key: PK.ACADEMIC_API,
      label: "Curriculum ID",
      type: "text",
      isRequired: true,
      isVisible: true,
      isDropBox: true,
      dataDrop: curriculum,
      dropLabel: "academic_name",
      isMultiple: true,
    }),
  ];
  return (
    <CrudForm inputFields={inputFields} url={SUBJECT_API} isFilter={true} />
  );
};

export default Subject;
