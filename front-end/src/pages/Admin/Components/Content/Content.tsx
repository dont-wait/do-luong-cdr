import { JSX } from "react";
import {
  Navbar,
  Dashboard,
  Department,
  Curriculum,
  Subject,
  Lecturer,
  UserAccount,
  Admin,
} from "../index";
import ErrorBoundary from "../../../../components/ErrorBoundary";

interface ContentProps {
  activeSection: string;
}

const Content = ({ activeSection }: ContentProps) => {
  const sections: { [key: string]: JSX.Element } = {
    dashboard: <Dashboard />,
    department: <Department />,
    curriculum: <Curriculum />,
    subject: <Subject />,
    lecturer: <Lecturer />,
    admin: <Admin />,
    userAccount: <UserAccount />,
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
      <Navbar activeSection={activeSection} />
      <main className='h-[calc(100vh-80px)] overflow-y-auto'>
        <ErrorBoundary>{renderSection()}</ErrorBoundary>
      </main>
    </div>
  );
};

export default Content;
