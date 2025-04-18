import React, { useState, useEffect } from "react";
import { FormType, Field } from "../../../../types/types";
import CrudForm from "../../../../components/CrudForm";
import DataTable from "../../../../components/DataTable";
import { getData } from "../../../../utils/helps";
import { CLO_API, SUBJECT_API, PLO_API } from "../../../../api/apiUrl";
import { useToast } from "../../../../hook/useToast";
import { ColumnDefinition } from "../../../../types/types";

// Define type for CLO record
interface CloRecord {
  id: string;
  clo_name: string;
  clo_content: string;
  clo_parent_id: string | null;
  subject_id: string;
}

// Define columns with visibility
const Columns: ColumnDefinition[] = [
  { key: "clo_name", label: "Name", visible: true },
  { key: "clo_content", label: "Content", visible: true },
  { key: "clo_parent_id", label: "Clo Parent ID", visible: false },
  { key: "subject_id", label: "Subject ID", visible: false },
];

const Clo: React.FC = () => {
  const [data, setData] = useState<CloRecord[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [plos, setPlos] = useState<{ id: string; name: string }[]>([]);
  const { showToast } = useToast();

  // Fetch subjects and PLOs for form options
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const subjects: { id: string; subject_name: string }[] = await getData(
          SUBJECT_API
        );
        const ploData: { id: string; plo_name: string }[] = await getData(
          PLO_API
        );
        const mappedPlos = ploData.map((plo) => ({
          id: plo.id,
          name: plo.plo_name,
        }));
        setPlos(mappedPlos);

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
            label: "Subject",
            type: "select",
            required: true,
            options: subjects.map((subj) => ({
              value: subj.id,
              label: subj.subject_name,
            })),
          },
        ]);
      } catch {
        showToast("Error fetching resources!", "error");
      }
    };

    fetchResources();
  }, [showToast]);

  // Handle API response from CrudForm (object[] to CloRecord[])
  const handleApiResponse = (responseData: object[]) => {
    const newRecords = responseData as CloRecord[];
    setData((prev) => [...prev, ...newRecords]);
  };

  return (
    <>
      <DataTable<CloRecord>
        data={data}
        setData={setData}
        title='CLO Data'
        columns={Columns}
        apiEndpoint={CLO_API}
      />

      <CrudForm
        formType={FormType.COMPOSITE}
        title='Add New CLO'
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
