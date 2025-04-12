import CrudForm from "../../../../components/CrudForm";
import DataTable from "../../../../components/DataTable";
import { FormType, Field } from "../../../../types/types";
import { useState, useEffect } from "react";
import { getData } from "../../../../utils/helps";
import {
  CURRICULUM_API,
  LECTURES_API,
  DEGREE_API,
} from "../../../../api/apiUrl";
import { PK } from "../../../../api/primaryKey";
import { useToast } from "../../../../hook/useToast";

const Columns = [
  { key: "id", label: "ID" },
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "academic_id", label: "Curriculum ID" },
  { key: "degree_id", label: "Degree ID" },
];

const Lecturer = () => {
  const [data, setData] = useState<object[]>([]);
  const [curriculum, setCurriculum] = useState<object[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchHanle = async () => {
      try {
        const curriculums = await getData(CURRICULUM_API);
        setCurriculum(curriculums);
        const degrees = await getData(DEGREE_API);
        const fields: Field[] = [
          {
            name: PK.LECTURES_API,
            label: "Lecturer ID",
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
          {
            name: "phone",
            label: "Phone",
            type: "phone",
            required: true,
          },
          {
            name: "degree_id",
            label: "Degree",
            type: "select",
            required: true,
            options: degrees.map(
              (degree: { id: number; degree_name: string }) => ({
                value: degree.id,
                label: degree.degree_name,
              })
            ),
            isNumber: true,
          },
        ];
        setFields(fields);
      } catch {
        showToast("Error fetching!", "error");
      }
    };

    fetchHanle();
  }, [showToast]);

  const handleApiResponse = (responseData: object[]) => {
    console.log(responseData);
    setData((prevData) => [...prevData, ...responseData]);
  };

  return (
    <>
      <DataTable
        data={data}
        setData={setData}
        title='Cirriculum Data'
        columns={Columns}
        apiEndpoint={LECTURES_API}
        refreshTrigger={dataRefreshTrigger}
      />
      <CrudForm
        formType={FormType.HIERARCHICAL}
        title='Cirriculum Data'
        fields={fields}
        onSubmit={handleApiResponse}
        apiEndpoint={LECTURES_API}
        parentData={curriculum}
        parentDisplayField='academic_name'
        childRelationField='academic_id'
      />
    </>
  );
};

export default Lecturer;
