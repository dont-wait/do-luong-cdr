import { useState, useEffect } from "react";
import CrudForm from "../../../../components/CrudForm";
import DataTable from "../../../../components/DataTable";
import { FormType, Field } from "../../../../types/types";
import { getData } from "../../../../utils/helps";
import {
  SUBJECT_API,
  CURRICULUM_API,
  LECTURES_API,
} from "../../../../api/apiUrl";
import { PK } from "../../../../api/primaryKey";
import { useToast } from "../../../../hook/useToast";

const Columns = [
  { key: "id", label: "ID" },
  { key: "subject_name", label: "Name" },
  { key: "practical_credits", label: "Practical Credits" },
  { key: "theoretical_credits", label: "Theoretical Credits" },
  { key: "lecturer_subject_manager_id", label: "Manager ID" },
];

const Subject = () => {
  const [data, setData] = useState<object[]>([]);
  const [existingData, setExistingData] = useState<object[][]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const { showToast } = useToast();

  const handleApiResponse = (responseData: object[]) => {
    setData((prevData) => [...prevData, ...responseData]);
  };

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        let curriculums = await getData(CURRICULUM_API);
        curriculums = curriculums.map(
          (curriculum: { id: string; academic_name: string }) => ({
            id: curriculum.id,
            name: curriculum.academic_name,
          })
        );
        let lectuers = await getData(LECTURES_API);
        lectuers = lectuers.map(
          (lecturer: {
            id: string;
            first_name: string;
            last_name: string;
          }) => ({
            id: lecturer.id,
            name: `${lecturer.first_name} ${lecturer.last_name}`,
          })
        );
        setExistingData([curriculums, lectuers]);
        setFields([
          {
            name: PK.SUBJECT_API,
            label: "Subject ID",
            type: "text",
            required: true,
          },
          {
            name: "subject_name",
            label: "Subject Name",
            type: "text",
            required: true,
          },
          {
            name: "practical_credits",
            label: "Practical Credits",
            type: "number",
            defaultValue: 0,
          },
          {
            name: "theoretical_credits",
            label: "Theoretical Credits",
            type: "number",
            defaultValue: 0,
          },
          {
            name: "description",
            label: "Description",
            type: "textarea",
          },
          {
            name: "lecturer_subject_manager_id",
            label: "Manager ID",
            type: "select",
            required: true,
            options: lectuers.map((lecturer: { id: string; name: string }) => ({
              value: lecturer.id,
              label: lecturer.name,
            })),
          },
        ]);
      } catch {
        showToast("Error fetching!", "error");
      }
    };
    fetchCurriculums();
  }, [showToast]);

  return (
    <>
      <DataTable
        data={data}
        setData={setData}
        title='Subject Data'
        columns={Columns}
        apiEndpoint={SUBJECT_API}
      />

      <CrudForm
        formType={FormType.COMPOSITE}
        title='Add New Subject'
        fields={fields}
        onSubmit={handleApiResponse}
        apiEndpoint={SUBJECT_API}
        listData={existingData}
        listLabels={["academic_id", "lecturer_id"]}
        listDisplayField='name'
        listSearchFields={["name", "id"]}
      />
    </>
  );
};

export default Subject;
