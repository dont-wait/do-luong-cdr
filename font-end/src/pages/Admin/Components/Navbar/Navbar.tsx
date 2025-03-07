import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faCog } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  toggleSidebar: () => void;
  activeSection: string;
}

const Navbar: React.FC<HeaderProps> = ({ toggleSidebar, activeSection }) => {
  const sectionTitles: { [key: string]: string } = {
    dashboard: "Dashboard",
    departments: "Departments",
    programs: "Training Programs",
    // Add more mappings
  };

  return (
    <header className='bg-white dark:bg-gray-800 shadow-md'>
      <div className='flex items-center justify-between px-4 py-3'>
        <div className='flex items-center'>
          <button
            className='p-2.5 rounded-lg bg-gray-200 dark:bg-gray-700 md:hidden'
            onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <h1 className='ml-4 text-xl font-semibold'>
            {sectionTitles[activeSection]}
          </h1>
        </div>
        <div className='flex items-center space-x-4'>
          <button className='relative p-2.5 rounded-lg bg-gray-200 dark:bg-gray-700'>
            <FontAwesomeIcon icon={faBell} />
            <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
              3
            </span>
          </button>
          <button className='p-2.5 rounded-lg bg-gray-200 dark:bg-gray-700'>
            <FontAwesomeIcon icon={faCog} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
