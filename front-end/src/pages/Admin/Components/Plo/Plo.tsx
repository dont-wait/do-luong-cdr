import { useState, useEffect } from "react";
import CrudForm from "../../../../components/CrudForm";
import DataTable from "../../../../components/DataTable";
import { FormType } from "../../../../types/types";
import { getData } from "../../../../utils/helps";
import {
  PLO_API,
  CURRICULUM_API,
  PLO_DETAIL_API,
} from "../../../../api/apiUrl";
import { useToast } from "../../../../hook/useToast";

const fields = [
  {
    name: "plo_name",
    label: "Plo Name",
    type: "text",
    required: true,
  },
  {
    name: "plo_content",
    label: "Plo Content",
    type: "text",
    required: true,
  },
];

const subFields = [
  {
    name: "id",
    label: "ID",
    type: "text",
    required: true,
  },
  {
    name: "plo_detail_name",
    label: "Plo Name",
    type: "text",
    required: true,
  },
  {
    name: "plo_detail_content",
    label: "Plo Content",
    type: "text",
    required: true,
  },
];

const Columns = [
  { key: "plo_name", label: "Name" },
  { key: "plo_content", label: "Content" },
  { key: "academic_id", label: "Curriculum ID" },
];

const SubColumns = [
  { key: "id", label: "ID" },
  { key: "plo_detail_name", label: "Name" },
  { key: "plo_detail_content", label: "Content" },
  { key: "plo_id", label: "Plo" },
];

const Plo = () => {
  const [data, setData] = useState<object[]>([]);
  const [subData, setSubData] = useState<object[]>([]);
  const [curriculums, setCurrculums] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const curriculums = await getData(CURRICULUM_API);
        setCurrculums(curriculums);
      } catch {
        showToast("Error fetching!", "error");
      }
    };
    fetchCurriculums();
  }, [showToast]);

  const handleApiResponse = (responseData: object[]) => {
    setData((prevData) => [...prevData, ...responseData]);
  };

  const handleSubApiResponse = (responseData: object[]) => {
    setSubData((prevData) => [...prevData, ...responseData]);
  };

  return (
    <>
      <DataTable
        data={data}
        setData={setData}
        title='Curriculum Table'
        columns={Columns}
        apiEndpoint={PLO_API}
      />
      <CrudForm
        formType={FormType.HIERARCHICAL}
        title='Plo Data'
        fields={fields}
        onSubmit={handleApiResponse}
        apiEndpoint={PLO_API}
        parentData={curriculums}
        parentDisplayField='academic_name'
        childRelationField='academic_id'
      />

      {data?.length !== 0 && (
        <>
          <DataTable
            data={subData}
            setData={setSubData}
            title='Plo Table'
            columns={SubColumns}
            apiEndpoint={PLO_DETAIL_API}
          />
          <CrudForm
            formType={FormType.HIERARCHICAL}
            title='Sub Plo Data'
            fields={subFields}
            onSubmit={handleSubApiResponse}
            apiEndpoint={PLO_DETAIL_API}
            parentData={data}
            parentDisplayField='plo_name'
            childRelationField='plo_id'
          />
        </>
      )}
    </>
  );
};

export default Plo;
