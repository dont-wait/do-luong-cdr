import CrudForm from "../../../../components/CrudForm";
import DataTable from "../../../../components/DataTable";
import { useState, useEffect } from "react";
import { getData } from "../../../../utils/helps";
import { useToast } from "../../../../hook/useToast";
import { DEPARTMENT_API, CURRICULUM_API } from "../../../../api/apiUrl";
import { FormType } from "../../../../types/types";
import { PK } from "../../../../api/primaryKey";

const levels = [
  {
    id: 1,
    academic_level: "Đại Học",
  },
  {
    id: 2,
    academic_level: "Sau Đại Học",
  },
];

const types = [
  {
    id: 1,
    academic_type: "Chính Quy",
  },
  {
    id: 2,
    academic_type: "Chất Lượng Cao",
  },
];

const fields = [
  {
    name: PK.ACADEMIC_API,
    label: "Cirriculum ID",
    type: "text",
    required: true,
  },
  {
    name: "academic_name",
    label: "Curriculum Name",
    type: "text",
    required: true,
  },
  {
    name: "academic_type",
    label: "Type",
    type: "select",
    required: true,
    options: types.map((type) => ({
      value: type.id,
      label: type.academic_type,
    })),
    isNumber: true,
  },
  {
    name: "academic_level",
    label: "Level",
    type: "select",
    required: true,
    options: levels.map((levels) => ({
      value: levels.id,
      label: levels.academic_level,
    })),
    isNumber: true,
  },
];

const Columns = [
  { key: "id", label: "ID" },
  { key: "academic_name", label: "Curriculum Name" },
  { key: "academic_type", label: "Type" },
  { key: "academic_level", label: "Level" },
  { key: "department_id", label: "Department ID" },
];

const Curriculum = () => {
  const [data, setData] = useState<object[]>([]);
  const [department, setDepartment] = useState<object[]>([]);
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0);
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

  const handleApiResponse = (responseData: object[]) => {
    setData((prevData) => [...prevData, ...responseData]);
  };

  return (
    <>
      <DataTable
        data={data}
        setData={setData}
        title='Cirriculum Data'
        columns={Columns}
        apiEndpoint={CURRICULUM_API}
        refreshTrigger={dataRefreshTrigger}
      />
      <CrudForm
        formType={FormType.HIERARCHICAL}
        title='Cirriculum Data'
        fields={fields}
        onSubmit={handleApiResponse}
        apiEndpoint={CURRICULUM_API}
        parentData={department}
        parentDisplayField='department_name'
        childRelationField='department_id'
      />
    </>
  );
};

export default Curriculum;
