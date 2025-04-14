import { useState, useEffect } from "react";
import { FormType, Field } from "../../../../types/types";
import CrudForm from "../../../../components/CrudForm";
import DataTable from "../../../../components/DataTable";
import { getData } from "../../../../utils/helps";
import { CLO_API, SUBJECT_API, PLO_API } from "../../../../api/apiUrl";
import { useToast } from "../../../../hook/useToast";

const Columns = [
  { key: "clo_name", label: "Name" },
  { key: "clo_content", label: "Content" },
];

interface plo {
  id: string;
  plo_name: string;
}

const Clo = () => {
  const [data, setData] = useState<object[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [plos, setPlos] = useState<{ id: string; name: string }[]>([]);
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const subjects = await getData(SUBJECT_API);
        let plos = await getData(PLO_API);
        plos = plos.map((plo: plo) => ({
          id: plo.id,
          name: plo.plo_name,
        }));
        setPlos(plos);
        setFields([
          {
            name: "clo_name",
            label: "Clo Name",
            type: "text",
            required: true,
          },
          {
            name: "clo_content",
            label: "Clo Content",
            type: "text",
            required: true,
          },
          {
            name: "clo_parent_id",
            label: "Clo Parent ID",
            type: "text",
            defaultValue: "null",
          },
          {
            name: "subject_id",
            label: "Subject ID",
            type: "select",
            required: true,
            options: subjects.map(
              (subject: { id: string; subject_name: string }) => ({
                value: subject.id,
                label: subject.subject_name,
              })
            ),
          },
        ]);
      } catch {
        showToast("Error fetching!", "error");
      }
    };
    fetchCurriculums();
  }, [showToast]);

  const handleApiResponse = (responseData: object[]) => {
    setData((prevData) => [...prevData, ...responseData]);
  };

  return (
    <>
      <DataTable
        data={data}
        setData={setData}
        title='Clo Data'
        columns={Columns}
        apiEndpoint={CLO_API}
        refreshTrigger={dataRefreshTrigger}
      />

      <CrudForm
        formType={FormType.COMPOSITE}
        title='Add New Clo'
        fields={fields}
        onSubmit={handleApiResponse}
        apiEndpoint={CLO_API}
        listData={[plos]}
        listLabels={["ploIds"]}
        listDisplayField='name'
        listSearchFields={["name"]}
      />
    </>
  );
};

export default Clo;
