import React, { JSX, Ref, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { FaBuilding, FaGraduationCap, FaBook } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { getData } from "../../../utils/helps";
import {
  DEPARTMENT_API,
  CURRICULUM_API,
  LECTURES_API,
  SUBJECT_API,
} from "../../../api/apiUrl";

const Dashboard: React.FC = () => {
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const departmentChartRef = useRef<HTMLCanvasElement | null>(null);
  const programChartRef = useRef<HTMLCanvasElement | null>(null);
  const departmentChartInstance = useRef<Chart | null>(null);
  const programChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptRes, progRes, lecRes, subRes] = await Promise.all([
          getData(DEPARTMENT_API),
          getData(CURRICULUM_API),
          getData(LECTURES_API),
          getData(SUBJECT_API),
        ]);

        setDepartments(deptRes);
        setPrograms(progRes);
        setLecturers(lecRes);
        setSubjects(subRes);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (departmentChartInstance.current)
      departmentChartInstance.current.destroy();
    if (programChartInstance.current) programChartInstance.current.destroy();

    if (departmentChartRef.current) {
      departmentChartInstance.current = new Chart(departmentChartRef.current, {
        type: "bar",
        data: {
          labels: (departments ?? []).map(
            (dept: object) =>
              (dept as { department_name: string }).department_name
          ),
          datasets: [
            {
              label: "Departments",
              data: (departments ?? []).map(() =>
                Math.floor(Math.random() * 100)
              ),
              backgroundColor: "#5D5CDE",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true } },
        },
      });
    }

    if (programChartRef.current) {
      programChartInstance.current = new Chart(programChartRef.current, {
        type: "doughnut",
        data: {
          labels: ["Undergraduate", "Graduate", "PhD", "Certificate"],
          datasets: [
            {
              data: [28, 12, 5, 3],
              backgroundColor: ["#4BC0C0", "#FF9F40", "#36A2EB", "#9966FF"],
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }
  }, [departments]);

  return (
    <section className='m-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        <DashboardCard
          title='Departments'
          count={departments?.length ?? 0}
          icon={<FaBuilding className='text-blue-500' />}
        />
        <DashboardCard
          title='Training Programs'
          count={programs?.length ?? 0}
          icon={<FaGraduationCap className='text-green-500' />}
        />
        <DashboardCard
          title='Courses'
          count={subjects?.length ?? 0}
          icon={<FaBook className='text-yellow-500' />}
        />
        <DashboardCard
          title='Lecturers'
          count={lecturers?.length ?? 0}
          icon={<FaUserGraduate className='text-purple-500' />}
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-1 gap-4'>
        <DashboardChart
          title='Department Performance'
          refChart={departmentChartRef}
        />
        <DashboardChart
          title='Program Distribution'
          refChart={programChartRef}
        />
      </div>
    </section>
  );
};

const DashboardCard = ({
  title,
  count,
  icon,
}: {
  title: string;
  count: number;
  icon: JSX.Element;
}) => (
  <div className='bg-white p-4 rounded-lg shadow-md'>
    <div className='flex items-center'>
      <div className='p-3 rounded-full bg-blue-100'>{icon}</div>
      <div className='ml-4'>
        <p className='text-sm font-medium text-gray-500'>{title}</p>
        <p className='text-lg font-semibold'>{count}</p>
      </div>
    </div>
  </div>
);

const DashboardChart = ({
  title,
  refChart,
}: {
  title: string;
  refChart: Ref<HTMLCanvasElement>;
}) => (
  <div className='bg-white p-4 rounded-lg shadow-md'>
    <h2 className='text-lg font-semibold'>{title}</h2>
    <div className='h-64'>
      <canvas ref={refChart}></canvas>
    </div>
  </div>
);

export default Dashboard;
