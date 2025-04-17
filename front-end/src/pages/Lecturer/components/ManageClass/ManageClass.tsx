import { useState, useEffect } from "react";
import { getData } from "../../../../utils/helps";
import { Lecturer, Subject, Class } from "../../../../types/types";
import { SUBJECT_API, LECTURES_API } from "../../../../api/apiUrl";
import { useToast } from "../../../../hook/useToast";
import ClassListItem from "./components/ClassListItem";
import SubjectDetails from "./components/SubjectDetails";
import Upload from "./components/Upload";
import useAuth from "../../../../hook/useAuth";
import { USER_ID } from "../../../../types/local";
import StudentResultsAnalyzer from "./components/StudentResultsAnalyzer";

interface LecturerSubject {
  lecturer_id: string;
  subject_id: string;
}

const ManageClass = () => {
  const [classId, setClassId] = useState<string>("");
  const [lecturer, setLecturer] = useState<Lecturer | null>(null);
  const [subjects, setSubjects] = useState<Record<string, Subject>>({});
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubjectsLoading, setIsSubjectsLoading] = useState(false);
  const { showToast } = useToast();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchLecturerData = async () => {
      try {
        setIsLoading(true);
        const id =
          auth?.user ?? JSON.parse(localStorage.getItem(USER_ID) ?? "");
        const response = await getData(`${LECTURES_API}/${id}`);
        setLecturer(response);

        // Fetch subjects taught by this lecturer
        if (response.LecturerSubject.length > 0) {
          setIsSubjectsLoading(true);
          await Promise.all(
            response.LecturerSubject.map(async (ls: LecturerSubject) => {
              try {
                const subjectResponse = await getData(
                  `${SUBJECT_API}/${ls.subject_id}`
                );
                setSubjects((prev) => ({
                  ...prev,
                  [subjectResponse.id]: subjectResponse,
                }));
              } catch (err) {
                showToast(
                  `Failed to fetch subject ${ls.subject_id}: ${err}`,
                  "error"
                );
              }
            })
          );
          setIsSubjectsLoading(false);
        }
        setIsLoading(false);
      } catch {
        showToast("Failed to fetch data");
        setIsLoading(false);
      }
    };

    fetchLecturerData();
  }, [showToast]);

  // Get all classes for this lecturer across all subjects
  const getLecturerClasses = () => {
    if (!lecturer) return [];

    const classes: Class[] = [];
    Object.values(subjects).forEach((subject: unknown) => {
      const lecturerClasses = (subject as Subject).class.filter(
        (c: Class) => c.lecturer_id === lecturer.id
      );
      classes.push(...lecturerClasses);
    });
    return classes;
  };

  // Get subject for a specific class
  const getSubjectForClass = (classItem: Class) => {
    return subjects[classItem.subject_id] || null;
  };

  const handleClassClick = (classItem: Class) => {
    setSelectedClass((prevSelected) =>
      prevSelected?.id === classItem.id ? null : classItem
    );
    const getStudentResult = async () => {
      try {
        if (selectedClass) {
          await getData(`/cdr/grading/${selectedClass}`);
          setClassId(selectedClass?.id);
        }
      } catch {
        setClassId("");
      }
    };
    getStudentResult();
  };

  if (isLoading) {
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  const lecturerClasses = getLecturerClasses();

  return (
    <>
      <div className='container my-4'>
        <div className='row'>
          <div className='col-lg-3'>
            <div className='card card-shadow'>
              <div className='card-header bg-primary text-white'>
                <h5 className='mb-0'>Classes</h5>
              </div>
              <div className='card-body p-0'>
                {isSubjectsLoading ? (
                  <div className='p-4 text-center'>
                    <div
                      className='spinner-border spinner-border-sm me-2'
                      role='status'></div>
                    <span>Loading subjects...</span>
                  </div>
                ) : (
                  <>
                    {lecturerClasses.length > 0 ? (
                      <ul className='list-group list-group-flush'>
                        {lecturerClasses.map((classItem) => (
                          <ClassListItem
                            key={classItem.id}
                            classItem={classItem}
                            subject={getSubjectForClass(classItem)}
                            isSelected={selectedClass?.id === classItem.id}
                            onClick={() => handleClassClick(classItem)}
                          />
                        ))}
                      </ul>
                    ) : (
                      <div className='p-4 text-center text-muted'>
                        No classes found
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className='col-md-8 col-lg-9'>
            {selectedClass ? (
              <div className='card card-shadow'>
                <div className='card-header bg-primary text-white d-flex justify-content-between align-items-center'>
                  <h5 className='mb-0'>ID: {selectedClass.id}</h5>
                </div>
                <div className='card-body'>
                  {getSubjectForClass(selectedClass) && (
                    <SubjectDetails
                      subject={getSubjectForClass(selectedClass)}
                    />
                  )}

                  <div className='bg-white rounded-lg p-4 card-shadow'>
                    <h5 className='text-lg font-semibold border-b pb-2 mb-3'>
                      Upload File
                    </h5>
                    <Upload
                      selectedClass={selectedClass}
                      setClassId={setClassId}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className='card h-100 card-shadow'>
                <div className='card-body d-flex flex-column justify-content-center align-items-center p-5'>
                  <i className='fas fa-folder-open text-muted fa-4x mb-3'></i>
                  <h5 className='text-center text-muted'>
                    Select a class to view details and upload files
                  </h5>
                </div>
              </div>
            )}
          </div>
        </div>

        {classId && (
          <div className='container mx-auto px-4 py-8'>
            <StudentResultsAnalyzer selectedClassId={classId} />
          </div>
        )}
      </div>
    </>
  );
};

export default ManageClass;
