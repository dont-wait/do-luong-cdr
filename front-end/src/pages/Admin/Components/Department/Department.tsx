import CrudForm from "../../../../components/CrudForm";
import { CrudFromField } from "../../../../types/types";
import { CrudFormClass } from "../../../../class/CrudFormClass";
import { DEPARTMENT_API } from "../../../../api/apiUrl";

const Departments: React.FC = () => {
  const inputFields: CrudFromField[] = [
    CrudFormClass.create({
      key: "department_id",
      label: "Department ID",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
    CrudFormClass.create({
      key: "department_name",
      label: "Department Name",
      type: "text",
      isRequired: true,
      isVisible: true,
    }),
  ];
  return <CrudForm inputFields={inputFields} url={DEPARTMENT_API} />;
};

export default Departments;
