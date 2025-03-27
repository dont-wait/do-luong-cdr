import { CrudFormClass } from "../../../../class/CrudFormClass";
import CrudForm from "../../../../components/CrudForm";
import { CrudFromField } from "../../../../types/types";
import { ADMIN_API } from "../../../../api/apiUrl";
import { PK } from "../../../../api/primaryKey";

const Admin = () => {
  const inputFields: CrudFromField[] = [
    CrudFormClass.create({
      key: PK.ADMIN_API,
      label: "Admin Id",
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
      key: "phone",
      label: "Phone",
      type: "phone",
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
      key: "password",
      label: "Password",
      type: "text",
      isRequired: true,
      isVisible: false,
    }),
  ];
  return <CrudForm inputFields={inputFields} url={ADMIN_API} />;
};

export default Admin;
