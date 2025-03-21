import { JSX, useState } from "react";
import { Navbar, Dashboard, Department, Modal } from "../AdminComponent";
import ErrorBoundary from "../ErrorBoundary";
import "./Content.css";

interface ContentProps {
  activeSection: string;
  toggleSidebar: () => void;
}

const Content = ({ activeSection, toggleSidebar }: ContentProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const sections: { [key: string]: JSX.Element } = {
    dashboard: <Dashboard />,
    departments: <Department openModal={() => setIsModalOpen(true)} />,
  };

  const renderSection = () => {
    return (
      sections[activeSection] || (
        <div className='p-4 text-center text-gray-500'>
          Section "{activeSection}" not found.
        </div>
      )
    );
  };

  return (
    <div className='flex-1 md:ml-64 relative'>
      <Navbar toggleSidebar={toggleSidebar} activeSection={activeSection} />
      <main className='p-4 md:p-6 h-[calc(100vh-64px)] overflow-y-auto'>
        <ErrorBoundary>{renderSection()}</ErrorBoundary>
      </main>

      {isModalOpen && (
        <Modal
          title='Add Department'
          onClose={() => setIsModalOpen(false)}
          onSave={() => {
            console.log("Department saved");
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Content;
