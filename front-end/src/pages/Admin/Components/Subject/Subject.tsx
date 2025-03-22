import { CrudFormClass } from "../../../../class/CrudFormClass";
import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { useState, useEffect } from "react";
import { fetchData } from "../../../../utils/helps";
import { SUBJECT_API, CURRICULUM_API } from "../../../../api/apiUrl";
import { useToast } from "../../../../hook/useToast";

const Subject = () => {
  const [curriculum, setCurriculum] = useState<Obj[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const curriculums = await fetchData(CURRICULUM_API);
        setCurriculum(curriculums.data.data);
      } catch {
        showToast("Error fetching!", "error");
      }
    };
    fetchCurriculums();
  }, [showToast]);

  const inputFields: CrudFromField[] = [
    CrudFormClass.create({
      key: "subject_id",
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
      key: "academic_id",
      label: "Curriculum ID",
      type: "number",
      isRequired: true,
      isVisible: true,
      isDropBox: true,
      dataDrop: curriculum,
      dropLabel: "academic_name",
    }),
  ];
  return <CrudForm inputFields={inputFields} url={SUBJECT_API} />;
};

export default Subject;
