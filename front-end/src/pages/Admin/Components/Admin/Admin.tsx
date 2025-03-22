import { CrudFormClass } from "../../../../class/CrudFormClass";
import CrudForm from "../../../../components/CrudForm";
import { CrudFromField } from "../../../../types/types";

const Admin = () => {
  const inputFields: CrudFromField[] = [
    new CrudFormClass("Admin Id", "text", true, true),
    new CrudFormClass("First Name", "text", true),
    new CrudFormClass("Last Name", "text", true),
    new CrudFormClass("Phone", "phone", true),
    new CrudFormClass("Email", "email", true),
  ];
  return <CrudForm inputFields={inputFields} url={"/admins"} />;
};

export default Admin;
