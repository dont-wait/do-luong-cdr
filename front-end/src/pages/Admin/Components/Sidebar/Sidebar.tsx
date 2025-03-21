import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBuilding,
  faGraduationCap,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  setActiveSection,
}) => {
  const navItems = [
    { section: "dashboard", icon: faTachometerAlt, label: "Dashboard" },
    { section: "departments", icon: faBuilding, label: "Departments" },
    { section: "programs", icon: faGraduationCap, label: "Training Programs" },
    // Add more items here
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-20 md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
      <div className='flex items-center justify-between p-4 border-b dark:border-gray-700'>
        <span className='text-2xl font-bold text-gray-800 dark:text-white'>
          EduManage
        </span>
        <button
          className='p-2.5 rounded-lg bg-gray-200 dark:bg-gray-700 md:hidden'
          onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className='py-4 overflow-y-auto h-full'>
        <div className='space-y-1 px-2'>
          {navItems.map((item) => (
            <button
              key={item.section}
              onClick={() => {
                setActiveSection(item.section);
                if (window.innerWidth < 768) toggleSidebar();
              }}
              className='nav-btn flex items-center w-full px-4 py-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700'>
              <FontAwesomeIcon
                icon={item.icon}
                className='w-5 text-center mr-3 text-gray-500 dark:text-gray-400'
              />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
