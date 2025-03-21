import CrudForm from "../../../../components/CrudForm";
import { CrudFromField } from "../../../../types/types";
import { CrudFormClass } from "../../../../class/CrudFormClass";

const Departments: React.FC = () => {
  const inputFields: CrudFromField[] = [
    new CrudFormClass("Department Id", "text", true, true),
    new CrudFormClass("Department", "text", true),
  ];
  return <CrudForm inputFields={inputFields} url='/departments' />;
};

export default Departments;
