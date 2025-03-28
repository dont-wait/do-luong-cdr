import { useState, useEffect } from "react";
import { CrudFormClass } from "../../../../class/CrudFormClass";
import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { getData } from "../../../../utils/helps";
import { CLO_API, SUBJECT_API } from "../../../../api/apiUrl";
import { PK } from "../../../../api/primaryKey";
import { useToast } from "../../../../hook/useToast";

const Clo = () => {
  const [subject, setSubject] = useState<Obj[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const subjects = await getData(SUBJECT_API);
        setSubject(subjects);
      } catch {
        showToast("Error fetching!", "error");
      }
    };
    fetchCurriculums();
  }, [showToast]);

  const inputFields: CrudFromField[] = [
    CrudFormClass.create({
      key: PK.CLO_API,
      label: "CLO ID",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "clo_name",
      label: "CLO Name",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "clo_content",
      label: "CLO Content",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "clo_parent_id",
      label: "CLO Parent Content",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "subject_id",
      label: "Subject ID",
      type: "text",
      isRequired: true,
      isVisible: true,
      isDropBox: true,
      dataDrop: subject,
      dropLabel: "subject_name",
    }),
  ];
  return <CrudForm inputFields={inputFields} url={CLO_API} isFilter={true} />;
};

export default Clo;
