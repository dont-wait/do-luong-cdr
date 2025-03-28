import { getData } from "../../../../utils/helps";
import { Lecturer, Academic, Degree, Subject } from "../../../../types/types";
import { useEffect, useState, useRef } from "react";
import { useToast } from "../../../../hook/useToast";
import useAuth from "../../../../hook/useAuth";
import { USER_ID } from "../../../../types/local";
import {
  DEGREE_API,
  LECTURES_API,
  CURRICULUM_API,
  SUBJECT_API,
} from "../../../../api/apiUrl";

const Home = () => {
  const [lecturer, setLecturer] = useState<Lecturer>();
  const [academic, setAcademic] = useState<Academic>();
  const [degree, setDegree] = useState<Degree>();
  const [subjectDetails, setSubjectDetails] = useState<Record<string, Subject>>(
    {}
  );
  const [subjectManagers, setSubjectManagers] = useState<
    Record<string, Lecturer>
  >({});
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const { auth } = useAuth();
  const lecturerData = useRef<Lecturer>(null);

  useEffect(() => {
    const id = auth?.user ?? JSON.parse(localStorage.getItem(USER_ID) ?? '""');
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const lecturerInfo: Lecturer = await getData(`${LECTURES_API}/${id}`);
        lecturerData.current = lecturerInfo;
        setLecturer(lecturerInfo);

        const fetches = [];
        if (lecturerInfo?.academic_id) {
          fetches.push(
            getData(`${CURRICULUM_API}/${lecturerInfo.academic_id}`)
          );
        }
        if (lecturerInfo?.degree_id) {
          fetches.push(getData(`${DEGREE_API}/${lecturerInfo.degree_id}`));
        }

        const [academicData, degreeData] = await Promise.all(fetches);
        if (academicData) setAcademic(academicData);
        if (degreeData) setDegree(degreeData);

        // Fetch details for each subject in LecturerSubject
        if (
          lecturerInfo?.LecturerSubject &&
          lecturerInfo.LecturerSubject.length > 0
        ) {
          const subjectFetches = lecturerInfo.LecturerSubject.map((item) =>
            getData(`${SUBJECT_API}/${item.subject_id}`)
          );

          const subjectResults = await Promise.all(subjectFetches);
          const subjectDetailsMap = {};
          const managerFetches = [];
          const managerIds = new Set();

          // Process subject details and prepare manager fetching
          subjectResults.forEach((subject) => {
            if (subject) {
              subjectDetailsMap[subject.id] = subject;

              // Prepare to fetch manager data if not already in the fetch list
              if (
                subject.lecturer_subject_manager_id &&
                !managerIds.has(subject.lecturer_subject_manager_id)
              ) {
                managerIds.add(subject.lecturer_subject_manager_id);
                managerFetches.push(
                  getData(
                    `${LECTURES_API}/${subject.lecturer_subject_manager_id}`
                  )
                );
              }
            }
          });

          setSubjectDetails(subjectDetailsMap);

          // Fetch manager information for each subject
          if (managerFetches.length > 0) {
            const managerResults = await Promise.all(managerFetches);
            const managerMap = {};

            // Process manager results
            Array.from(managerIds).forEach((managerId, index) => {
              if (managerResults[index]) {
                managerMap[managerId as string] = managerResults[index];
              }
            });

            setSubjectManagers(managerMap);
          }
        }
      } catch (error) {
        console.error("Fetch error:", error);
        showToast("Fetch Data Fail!", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showToast, auth?.user]);

  if (loading)
    return (
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <div
          className='spinner-border text-primary'
          role='status'
          style={{ width: "3rem", height: "3rem" }}>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );

  return (
    <div className='container py-4'>
      <div className='card mb-4 bg-light'>
        <div className='card-body p-4'>
          <h3 className='display-5 fw-bold mb-2'>
            {lecturer?.first_name} {lecturer?.last_name}
          </h3>
          <div className='d-flex flex-wrap text-muted mb-2'>
            <span className='me-3 mb-2 d-inline-flex align-items-center'>
              <i className='bi bi-person-badge me-1'></i>
              ID: {lecturer?.id}
            </span>
            {degree && (
              <span className='me-3 mb-2 d-inline-flex align-items-center'>
                <i className='bi bi-award me-1'></i>
                {degree.degree_name}
              </span>
            )}
            {academic && (
              <span className='mb-2 d-inline-flex align-items-center'>
                <i className='bi bi-building me-1'></i>
                {academic.academic_name}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className='row g-4'>
        <div className='col-md-4'>
          {/* Personal Information Card */}
          <div className='card mb-4 bg-light'>
            <div className='card-body p-4'>
              <h2 className='card-title h4 fw-bold mb-3'>Thông tin cá nhân</h2>
              <ul className='list-unstyled'>
                <li className='d-flex align-items-center mb-3'>
                  <i className='bi bi-envelope text-primary me-2'></i>
                  <span className='fw-medium me-2'>Email:</span>
                  <a
                    href={`mailto:${lecturer?.email}`}
                    className='text-primary text-decoration-hover'>
                    {lecturer?.email}
                  </a>
                </li>
                <li className='d-flex align-items-center mb-3'>
                  <i className='bi bi-telephone text-primary me-2'></i>
                  <span className='fw-medium me-2'>Điện thoại:</span>
                  <a
                    href={`tel:${lecturer?.phone}`}
                    className='text-primary text-decoration-hover'>
                    {lecturer?.phone}
                  </a>
                </li>
                <li className='d-flex align-items-center mb-3'>
                  <i className='bi bi-person-badge text-primary me-2'></i>
                  <span className='fw-medium me-2'>ID:</span>
                  <span>{lecturer?.id}</span>
                </li>
                <li className='d-flex align-items-center mb-3'>
                  <i className='bi bi-award text-primary me-2'></i>
                  <span className='fw-medium me-2'>Học hàm:</span>
                  <span>
                    {degree
                      ? degree.degree_name
                      : `Degree ID: ${lecturer?.degree_id}`}
                  </span>
                </li>
                <li className='d-flex align-items-center'>
                  <i className='bi bi-building text-primary me-2'></i>
                  <span className='fw-medium me-2'>Khoa:</span>
                  <span>
                    {academic ? academic.academic_name : lecturer?.academic_id}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Managed Subjects Card */}
          {lecturer?.subjects &&
            lecturer.subjects.filter(
              (sub) => sub.lecturer_subject_manager_id === lecturer.id
            ).length > 0 && (
              <div className='card bg-light'>
                <div className='card-body p-4'>
                  <h3 className='card-title h4 fw-bold mb-3 d-flex align-items-center'>
                    <i className='bi bi-shield-check text-success me-2'></i>
                    Học phần chủ nhiệm
                    <span className='ms-2 badge bg-danger'>
                      {
                        lecturer.subjects.filter(
                          (sub) =>
                            sub.lecturer_subject_manager_id === lecturer.id
                        ).length
                      }
                    </span>
                  </h3>
                  <div className='d-flex flex-column gap-2'>
                    {lecturer?.subjects
                      .filter(
                        (sub) => sub.lecturer_subject_manager_id === lecturer.id
                      )
                      .map((subject) => {
                        return (
                          <div
                            key={subject.id}
                            className='p-3 rounded bg-light border'>
                            <div className='d-flex justify-content-between align-items-center'>
                              <span className='fw-medium text-primary'>
                                {subject.subject_name}
                              </span>
                              <span className='badge bg-primary'>
                                {subject.id}
                              </span>
                            </div>
                            <div className='mt-2 small'>
                              <div className='d-flex flex-wrap align-items-center gap-2'>
                                <span>
                                  Tín chỉ:{" "}
                                  {subject.practical_credits +
                                    subject.theoretical_credits}
                                </span>
                                <span>•</span>
                                <span>TH: {subject.practical_credits}</span>
                                <span>•</span>
                                <span>LT: {subject.theoretical_credits}</span>
                              </div>
                            </div>
                            {subject.description && (
                              <div className='mt-2 small'>
                                <p>{subject.description}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
        </div>

        <div className='col-md-8'>
          <div className='card bg-light '>
            <div className='card-body p-4'>
              <h2 className='card-title h4 fw-bold mb-3 d-flex align-items-center'>
                Học phần phụ trách
                <span className='ms-2 badge bg-primary'>
                  {lecturer?.LecturerSubject?.length || 0}
                </span>
              </h2>

              {!lecturer?.LecturerSubject ||
              lecturer?.LecturerSubject.length === 0 ? (
                <p className='text-muted fst-italic'>
                  Không có học phần phụ trách hiện tại
                </p>
              ) : (
                <div className='d-flex flex-column gap-4'>
                  {lecturer?.LecturerSubject.map((item) => {
                    // Get subject and manager details from our fetched data
                    const subject = subjectDetails[item.subject_id];
                    const manager = subject
                      ? subjectManagers[subject.lecturer_subject_manager_id]
                      : null;

                    return (
                      <div
                        key={item.subject_id}
                        className='p-4 rounded bg-light border'>
                        <div className='d-flex justify-content-between align-items-start'>
                          <h3 className='h5 fw-semibold mb-0 text-capitalize'>
                            {subject ? subject.subject_name : item.subject_id}
                          </h3>
                          <span className='badge bg-info'>
                            Mã học phần: {item.subject_id}
                          </span>
                        </div>

                        {subject && (
                          <>
                            <div className='row mt-3 g-2'>
                              <div className='col-md-4'>
                                <span className='d-inline-flex align-items-center badge bg-success bg-opacity-25 p-2 w-100'>
                                  <i className='bi bi-check-circle me-1'></i>
                                  Thực hành: {subject.practical_credits} tín chỉ
                                </span>
                              </div>
                              <div className='col-md-4'>
                                <span className='d-inline-flex align-items-center badge bg-warning bg-opacity-25 p-2 w-100'>
                                  <i className='bi bi-plus-circle me-1'></i>
                                  Lý thuyết: {subject.theoretical_credits} tín
                                  chỉ
                                </span>
                              </div>
                              <div className='col-md-4'>
                                <span className='d-inline-flex align-items-center badge bg-info bg-opacity-25 p-2 w-100'>
                                  <i className='bi bi-clipboard me-1'></i>
                                  Tổng:{" "}
                                  {subject.practical_credits +
                                    subject.theoretical_credits}{" "}
                                  tín chỉ
                                </span>
                              </div>
                            </div>

                            {subject.description && (
                              <div className='mt-3'>
                                <p className='text-muted small fst-italic border-start border-3 border-info ps-3 py-1'>
                                  "{subject.description}"
                                </p>
                              </div>
                            )}

                            {/* Subject Manager Information */}
                            <div className='mt-4 pt-3 border-top'>
                              <h4 className='h6 mb-3 d-flex align-items-center'>
                                <i className='bi bi-person-circle text-primary me-2'></i>
                                Chủ nhiệm học phần:
                              </h4>

                              <div className='p-3 rounded bg-white border'>
                                {manager ? (
                                  <div className='row'>
                                    <div className='col-md-7 mb-2 mb-md-0'>
                                      <div className='d-flex align-items-center'>
                                        <div
                                          className='rounded-circle d-flex align-items-center justify-content-center me-3 bg-primary bg-opacity-25 text-primary'
                                          style={{
                                            width: "48px",
                                            height: "48px",
                                          }}>
                                          <span className='fw-bold'>
                                            {manager.first_name?.charAt(0) ||
                                              ""}
                                            {manager.last_name?.charAt(0) || ""}
                                          </span>
                                        </div>
                                        <div>
                                          <p className='fw-medium mb-0'>
                                            {manager.first_name}{" "}
                                            {manager.last_name}
                                          </p>
                                          <p className='text-muted small mb-0'>
                                            ID: {manager.id}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='col-md-5 d-flex flex-column align-items-md-end justify-content-center'>
                                      <a
                                        href={`mailto:${manager.email}`}
                                        className='text-primary d-inline-flex align-items-center mb-1'>
                                        <i className='bi bi-envelope me-1'></i>
                                        {manager.email}
                                      </a>
                                      <a
                                        href={`tel:${manager.phone}`}
                                        className='text-primary d-inline-flex align-items-center'>
                                        <i className='bi bi-telephone me-1'></i>
                                        {manager.phone}
                                      </a>
                                    </div>
                                  </div>
                                ) : (
                                  <p className='text-muted mb-0'>
                                    ID Chủ nhiệm:{" "}
                                    {subject.lecturer_subject_manager_id ||
                                      "Không có thông tin"}
                                  </p>
                                )}
                              </div>
                            </div>
                          </>
                        )}

                        {/* Show special badge if lecturer is the subject manager */}
                        {subject &&
                          subject.lecturer_subject_manager_id ===
                            lecturer.id && (
                            <div className='mt-3'>
                              <span className='badge bg-danger bg-opacity-25 text-danger p-2 border border-danger border-opacity-25'>
                                <i className='bi bi-star-fill me-1'></i>
                                Bạn là giảng viên chủ nhiệm của học phần này
                              </span>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
