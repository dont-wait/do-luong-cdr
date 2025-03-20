import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { FaBuilding, FaGraduationCap, FaBook } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";

const Dashboard: React.FC = () => {
  const departmentChartRef = useRef<HTMLCanvasElement | null>(null);
  const programChartRef = useRef<HTMLCanvasElement | null>(null);
  const departmentChartInstance = useRef<Chart | null>(null);
  const programChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Cleanup previous chart instances to prevent duplicates
    if (departmentChartInstance.current) {
      departmentChartInstance.current.destroy();
    }
    if (programChartInstance.current) {
      programChartInstance.current.destroy();
    }

    // Initialize Department Chart
    if (departmentChartRef.current) {
      departmentChartInstance.current = new Chart(departmentChartRef.current, {
        type: "bar",
        data: {
          labels: [
            "Computer Science",
            "Business Admin",
            "Engineering",
            "Mathematics",
            "Psychology",
          ],
          datasets: [
            {
              label: "Performance Score",
              data: [85, 78, 92, 88, 76],
              backgroundColor: "#5D5CDE",
              borderColor: "#5D5CDE",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, max: 100 },
          },
        },
      });
    }

    // Initialize Program Chart
    if (programChartRef.current) {
      programChartInstance.current = new Chart(programChartRef.current, {
        type: "doughnut",
        data: {
          labels: ["Undergraduate", "Graduate", "PhD", "Certificate"],
          datasets: [
            {
              label: "Programs",
              data: [28, 12, 5, 3],
              backgroundColor: ["#4BC0C0", "#FF9F40", "#36A2EB", "#9966FF"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    // Cleanup on unmount
    return () => {
      if (departmentChartInstance.current) {
        departmentChartInstance.current.destroy();
      }
      if (programChartInstance.current) {
        programChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <section id='dashboard-section' className='m-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-blue-100 '>
              <FaBuilding className='text-blue-500' />
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-500 '>Departments</p>
              <p className='text-lg font-semibold'>12</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-green-100'>
              <FaGraduationCap className='text-green-500' />
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-500'>
                Training Programs
              </p>
              <p className='text-lg font-semibold'>48</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-yellow-100 '>
              <FaBook className='text-yellow-500' />
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-500'>Courses</p>
              <p className='text-lg font-semibold'>157</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-purple-100'>
              <FaUserGraduate className='text-purple-500' />
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-500'>Lecturers</p>
              <p className='text-lg font-semibold'>64</p>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='bg-white p-4 rounded-lg shadow-md lg:col-span-2'>
          <h2 className='text-lg font-semibold'>Department Performance</h2>
          <div className='h-64'>
            <canvas ref={departmentChartRef}></canvas>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold'>Program Distribution</h2>
          <div className='h-64'>
            <canvas ref={programChartRef}></canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
