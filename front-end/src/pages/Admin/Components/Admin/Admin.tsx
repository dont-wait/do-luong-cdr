import { useState } from "react";
import CrudForm from "../../../../components/CrudForm";
import DataTable from "../../../../components/DataTable";
import { FormType } from "../../../../types/types";
import { ADMIN_API } from "../../../../api/apiUrl";
import { PK } from "../../../../api/primaryKey";

const fields = [
  {
    name: PK.ADMIN_API,
    label: "Admin Id",
    type: "text",
    required: true,
  },
  {
    name: "first_name",
    label: "First Name",
    type: "text",
    required: true,
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "text",
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "phone",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
  },
];

const Columns = [
  { key: "id", label: "ID" },
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
];

const Admin = () => {
  const [data, setData] = useState<object[]>([]);
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0);

  const handleApiResponse = (responseData: object[]) => {
    setData((prevData) => [...prevData, ...responseData]);
  };

  return (
    <>
      <DataTable
        data={data}
        setData={setData}
        title='Department Data'
        columns={Columns}
        apiEndpoint={ADMIN_API}
        refreshTrigger={dataRefreshTrigger}
      />

      <CrudForm
        formType={FormType.BASIC}
        title='Manage Courses'
        fields={fields}
        onSubmit={handleApiResponse}
        apiEndpoint={ADMIN_API}
      />
    </>
  );
};

export default Admin;
