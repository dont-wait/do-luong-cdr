import { useState, useEffect } from "react";
import CrudForm from "../../../../components/CrudForm";
import DataTable from "../../../../components/DataTable";
import { Field, FormType, Class as IClass } from "../../../../types/types";
import { getData } from "../../../../utils/helps";
import { SUBJECT_API, CLASS_API, LECTURES_API } from "../../../../api/apiUrl";
import { useToast } from "../../../../hook/useToast";

const Columns = [
  { key: "id", label: "ID" },
  { key: "subject_id", label: "Subject ID" },
  { key: "lecturer_id", label: "Lecturer ID" },
];

interface LecturerSubject {
  lecturer_id: string;
  subject_id: string;
}

const Class = () => {
  const [subjects, setSubjects] = useState<object[]>([]);
  const [data, setData] = useState<object[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const { showToast } = useToast();

  const handleValidate = async (formData: unknown): Promise<boolean> => {
    const classInfo = formData as IClass;
    const lecturer_id = classInfo.lecturer_id;
    const subject_id = classInfo.subject_id;

    try {
      const res = await getData(`${SUBJECT_API}/${subject_id}`);
      const lecturerTeachingSubjectList = (
        res as {
          LecturerSubject: LecturerSubject[];
        }
      ).LecturerSubject;
      const isValid = lecturerTeachingSubjectList.some(
        (info) => info.lecturer_id === lecturer_id
      );
      if (!isValid) {
        showToast(
          `Lecturer ${lecturer_id} doesn't teach subject: ${subject_id}`,
          "error"
        );
      }
      return isValid;
    } catch (error) {
      showToast(`${error}`, "error");
      return false;
    }
  };

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const subjects = await getData(SUBJECT_API);
        setSubjects(subjects);
        const lecturers = await getData(LECTURES_API);
        setFields([
          {
            name: "id",
            label: "Class ID",
            type: "text",
            required: true,
          },
          {
            name: "lecturer_id",
            label: "Lecturer ID",
            type: "select",
            required: true,
            options: lecturers.map(
              (lecturer: {
                id: string;
                first_name: string;
                last_name: string;
              }) => ({
                value: lecturer.id,
                label: `${lecturer.first_name} ${lecturer.last_name}`,
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
        title='Class Table'
        columns={Columns}
        apiEndpoint={CLASS_API}
      />
      <CrudForm
        formType={FormType.HIERARCHICAL}
        title='Subjects'
        fields={fields}
        onSubmit={handleApiResponse}
        apiEndpoint={CLASS_API}
        parentData={subjects}
        parentDisplayField='subject_name'
        childRelationField='subject_id'
        rule={{
          errMsg: "The lecturer is not assigned to teach this course.",
          handle: handleValidate,
        }}
      />
    </>
  );
};

export default Class;
