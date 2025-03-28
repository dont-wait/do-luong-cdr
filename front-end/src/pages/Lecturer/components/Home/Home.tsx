import { getData } from "../../../../utils/helps";
import { Lecturer, Academic, Degree } from "../../../../types/types";
import { useEffect, useState, useRef } from "react";
import { useToast } from "../../../../hook/useToast";
import useAuth from "../../../../hook/useAuth";
import { USER_ID } from "../../../../types/local";
import {
  DEGREE_API,
  LECTURES_API,
  CURRICULUM_API,
} from "../../../../api/apiUrl";

const Home = () => {
  const [lecturer, setLecturer] = useState<Lecturer>();
  const [academic, setAcademic] = useState<Academic>();
  const [degree, setDegree] = useState<Degree>();
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const { auth } = useAuth();
  const lecturerData = useRef<Lecturer>(null);

  useEffect(() => {
    const id = auth?.user ?? JSON.parse(localStorage.getItem(USER_ID) ?? '""');
    if (!id) return; // Tránh gọi API nếu id không hợp lệ

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
      } catch {
        showToast("Fetch Data Fail!", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showToast, auth?.user]);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500'></div>
      </div>
    );

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='header bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700'>
        <h1 className='text-3xl font-bold text-gray-800 dark:text-white mb-2'>
          {lecturer?.first_name} {lecturer?.last_name}
        </h1>
        <div className='flex flex-wrap items-center text-gray-600 dark:text-gray-300 mb-2'>
          <span className='mr-4 mb-2'>
            <svg
              className='inline-block h-5 w-5 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2'></path>
            </svg>
            ID: {lecturer?.id}
          </span>
          {degree && (
            <span className='mr-4 mb-2'>
              <svg
                className='inline-block h-5 w-5 mr-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'></path>
              </svg>
              {degree.degree_name}
            </span>
          )}
          {academic && (
            <span className='mb-2'>
              <svg
                className='inline-block h-5 w-5 mr-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z'></path>
              </svg>
              {academic.academic_name}
            </span>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='md:col-span-1'>
          <div className='card bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6'>
            <h2 className='section-title text-xl font-semibold mb-4 text-gray-700 dark:text-white'>
              Thông tin cá nhân
            </h2>
            <ul className='space-y-3 text-gray-600 dark:text-gray-300'>
              <li className='flex items-center'>
                <svg
                  className='h-5 w-5 mr-3 text-indigo-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'></path>
                </svg>
                <span className='font-medium'>Email:</span>
                <a
                  href={`mailto:${lecturer?.email}`}
                  className='ml-2 text-indigo-600 dark:text-indigo-400 hover:underline'>
                  {lecturer?.email}
                </a>
              </li>
              <li className='flex items-center'>
                <svg
                  className='h-5 w-5 mr-3 text-indigo-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'></path>
                </svg>
                <span className='font-medium'>Điện thoại:</span>
                <a
                  href={`tel:${lecturer?.phone}`}
                  className='ml-2 text-indigo-600 dark:text-indigo-400 hover:underline'>
                  {lecturer?.phone}
                </a>
              </li>
              <li className='flex items-center'>
                <svg
                  className='h-5 w-5 mr-3 text-indigo-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2'></path>
                </svg>
                <span className='font-medium'>ID:</span>
                <span className='ml-2'>{lecturer?.id}</span>
              </li>
              <li className='flex items-center'>
                <svg
                  className='h-5 w-5 mr-3 text-indigo-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'></path>
                </svg>
                <span className='font-medium'>Học hàm:</span>
                <span className='ml-2'>
                  {degree
                    ? degree.degree_name
                    : `Degree ID: ${lecturer?.degree_id}`}
                </span>
              </li>
              <li className='flex items-center'>
                <svg
                  className='h-5 w-5 mr-3 text-indigo-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z'></path>
                </svg>
                <span className='font-medium'>Khoa:</span>
                <span className='ml-2'>
                  {academic ? academic.academic_name : lecturer?.academic_id}
                </span>
              </li>
            </ul>
          </div>

          {/* Subjects where lecturer is a manager */}
          {lecturer?.LecturerSubject && lecturer.LecturerSubject.length > 0 && (
            <div className='card bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
              <h3 className='section-title text-xl font-semibold mb-4 text-gray-700 dark:text-white flex items-center'>
                <svg
                  className='h-6 w-6 mr-2 text-indigo-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'></path>
                </svg>
                Học phần chủ nhiệm
                <span className='ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'>
                  {lecturer.LecturerSubject.length}
                </span>
              </h3>
              <div className='space-y-2'>
                {lecturer?.LecturerSubject.map((item) => {
                  // Find the subject details from the subjects array
                  const subjectDetail = (lecturer?.subjects ?? []).find(
                    (s) => s.id === item.subject_id
                  );

                  return (
                    <div
                      key={item.subject_id}
                      className='p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-800'>
                      <div className='flex justify-between items-center'>
                        <span className='font-medium text-indigo-800 dark:text-indigo-300'>
                          {subjectDetail
                            ? subjectDetail.subject_name
                            : item.subject_id}
                        </span>
                        <span className='bg-indigo-200 text-indigo-800 text-xs font-medium px-2 py-1 rounded dark:bg-indigo-800 dark:text-indigo-200'>
                          {item.subject_id}
                        </span>
                      </div>
                      {subjectDetail && (
                        <div className='mt-2 text-sm text-indigo-700 dark:text-indigo-300'>
                          <div className='flex items-center gap-2'>
                            <span>
                              Tín chỉ:{" "}
                              {subjectDetail.practical_credits +
                                subjectDetail.theoretical_credits}
                            </span>
                            <span>•</span>
                            <span>TH: {subjectDetail.practical_credits}</span>
                            <span>•</span>
                            <span>LT: {subjectDetail.theoretical_credits}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className='md:col-span-2'>
          <div className='card bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
            <h2 className='section-title text-xl font-semibold mb-4 text-gray-700 dark:text-white'>
              Các môn học phụ trách
              <span className='ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300'>
                {lecturer?.subjects.length}
              </span>
            </h2>

            {lecturer?.subjects.length === 0 ? (
              <p className='text-gray-500 dark:text-gray-400 italic'>
                Không có môn học hiện tại
              </p>
            ) : (
              <div className='space-y-4'>
                {lecturer?.subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className='subject-card bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-100 dark:border-gray-600'>
                    <div className='flex justify-between items-start'>
                      <h3 className='font-medium text-gray-800 dark:text-white text-lg capitalize'>
                        {subject.subject_name}
                      </h3>
                      <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                        {subject.id}
                      </span>
                    </div>
                    <div className='mt-2 flex flex-wrap gap-2'>
                      <span className='inline-flex items-center text-sm bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-300'>
                        <svg
                          className='w-4 h-4 mr-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                        </svg>
                        Thực hành: {subject.practical_credits} tín chỉ
                      </span>
                      <span className='inline-flex items-center text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded dark:bg-yellow-900 dark:text-yellow-300'>
                        <svg
                          className='w-4 h-4 mr-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M12 6v6m0 0v6m0-6h6m-6 0H6'></path>
                        </svg>
                        Lý thuyết: {subject.theoretical_credits} tín chỉ
                      </span>
                      <span className='inline-flex items-center text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded dark:bg-purple-900 dark:text-purple-300'>
                        <svg
                          className='w-4 h-4 mr-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'></path>
                        </svg>
                        Tổng:{" "}
                        {subject.practical_credits +
                          subject.theoretical_credits}{" "}
                        tín chỉ
                      </span>
                    </div>
                    {subject.description && (
                      <p className='mt-2 text-gray-600 dark:text-gray-300 text-sm'>
                        {subject.description}
                      </p>
                    )}

                    {/* Show special badge if lecturer is the subject manager */}
                    {lecturer.LecturerSubject.some(
                      (item) => item.subject_id === subject.id
                    ) && (
                      <div className='mt-3'>
                        <span className='inline-flex items-center text-sm bg-red-50 text-red-700 px-2 py-1 rounded border border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800'>
                          <svg
                            className='w-4 h-4 mr-1'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'></path>
                          </svg>
                          Giảng viên chủ nhiệm
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
