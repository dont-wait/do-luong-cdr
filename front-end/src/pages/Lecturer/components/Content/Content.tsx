import { JSX } from "react";
import { Navbar, Dashboard, Upload, Home, Clo } from "../index";
import ErrorBoundary from "../../../../components/ErrorBoundary";
import { CNHP } from "../../../../types/local";

interface ContentProps {
  activeSection: string;
}

const Content = ({ activeSection }: ContentProps) => {
  const isCnhp = JSON.parse(localStorage.getItem(CNHP) ?? '""');
  const sections: { [key: string]: JSX.Element } = {
    dashboard: <Dashboard />,
    home: <Home />,
    upload: <Upload />,
  };

  if (isCnhp) {
    sections["clo"] = <Clo />;
  }

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
      <Navbar activeSection={activeSection} />
      <main className='h-[calc(100vh-80px)] overflow-y-auto'>
        <ErrorBoundary>{renderSection()}</ErrorBoundary>
      </main>
    </div>
  );
};

export default Content;
