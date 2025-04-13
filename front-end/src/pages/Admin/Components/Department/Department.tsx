import { useState } from "react";
import CrudForm from "../../../../components/CrudForm";
import DataTable from "../../../../components/DataTable";
import { FormType } from "../../../../types/types";
import { DEPARTMENT_API } from "../../../../api/apiUrl";
import { PK } from "../../../../api/primaryKey";

const fields = [
  {
    name: PK.DEPARTMENT_API,
    label: "Department ID",
    type: "text",
    required: true,
    validation: {
      required: "Department is required",
      // minLength: {
      //   value: 3,
      //   message: "Name must be at least 3 characters",
      // },
    },
  },
  {
    name: "department_name",
    label: "Department Name",
    type: "text",
    required: true,
    validation: {
      required: "Course Name is required",
    },
  },
];

const Columns = [
  { key: "id", label: "ID" },
  { key: "department_name", label: "Department Name" },
];

const Departments: React.FC = () => {
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
        apiEndpoint={DEPARTMENT_API}
        refreshTrigger={dataRefreshTrigger}
      />

      <CrudForm
        formType={FormType.BASIC}
        title='Manage Courses'
        fields={fields}
        onSubmit={handleApiResponse}
        apiEndpoint={DEPARTMENT_API}
      />
    </>
  );
};

export default Departments;
