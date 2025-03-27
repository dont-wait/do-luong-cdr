import { useState, useEffect } from "react";
import { CrudFormClass } from "../../../../class/CrudFormClass";
import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { getData } from "../../../../utils/helps";
import { PLO_API, CURRICULUM_API } from "../../../../api/apiUrl";
import { PK } from "../../../../api/primaryKey";
import { useToast } from "../../../../hook/useToast";

const Plo = () => {
  const [curriculum, setCurriculum] = useState<Obj[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const curriculums = await getData(CURRICULUM_API);
        setCurriculum(curriculums);
      } catch {
        showToast("Error fetching!", "error");
      }
    };
    fetchCurriculums();
  }, [showToast]);

  const inputFields: CrudFromField[] = [
    CrudFormClass.create({
      key: PK.PLO_API,
      label: "Plo ID",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "plo_name",
      label: "Plo Name",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "plo_content",
      label: "Plo Content",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "academic_id",
      label: "Curriculum ID",
      type: "text",
      isRequired: true,
      isVisible: false,
      isDropBox: true,
      dataDrop: curriculum,
      dropLabel: "academic_name",
    }),
  ];
  return <CrudForm inputFields={inputFields} url={PLO_API} isFilter={true} />;
};

export default Plo;
