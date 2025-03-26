import CrudForm from "../../../../components/CrudForm";
import { CrudFromField, Obj } from "../../../../types/types";
import { CrudFormClass } from "../../../../class/CrudFormClass";
import { useState, useEffect } from "react";
import { getData } from "../../../../utils/helps";
import { useToast } from "../../../../hook/useToast";
import { DEPARTMENT_API, CURRICULUM_API } from "../../../../api/apiUrl";
import { PK } from "../../../../api/primaryKey";

const levels = [
  {
    id: 1,
    academic_level: "Higher Education",
  },
  {
    id: 2,
    academic_level: "Postgraduate Education",
  },
];

const types = [
  {
    id: 1,
    academic_type: "Formal Curriculum",
  },
  {
    id: 2,
    academic_type: "Informal Curriculum",
  },
];

const Curriculum = () => {
  const [department, setDepartment] = useState<Obj[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchHanle = async () => {
      try {
        const department = await getData(DEPARTMENT_API);
        setDepartment(department);
      } catch {
        showToast("Error fetching!", "error");
      }
    };

    fetchHanle();
  }, [showToast]);

  const inputFields: CrudFromField[] = [
    CrudFormClass.create({
      key: PK.ACADEMIC_API,
      label: "Curriculum Id",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "academic_name",
      label: "Curriculum Name",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "academic_level",
      label: "Curriculum Level",
      type: "number",
      isRequired: true,
      isVisible: true,
      isDropBox: true,
      dataDrop: levels,
      dropLabel: "academic_level",
    }),
    CrudFormClass.create({
      key: "academic_type",
      label: "Curriculum Type",
      type: "number",
      isRequired: true,
      isVisible: true,
      isDropBox: true,
      dataDrop: types,
      dropLabel: "academic_type",
    }),
    CrudFormClass.create({
      key: "department_id",
      label: "Department Id",
      type: "text",
      isRequired: true,
      isVisible: true,
      isDropBox: true,
      dataDrop: department,
      dropLabel: "department_name",
    }),
  ];
  return (
    <CrudForm inputFields={inputFields} url={CURRICULUM_API} isFilter={true} />
  );
};

export default Curriculum;
