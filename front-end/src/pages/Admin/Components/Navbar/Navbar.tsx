interface HeaderProps {
  activeSection: string;
}

const Navbar: React.FC<HeaderProps> = ({ activeSection }) => {
  const sectionTitles: { [key: string]: string } = {
    dashboard: "Dashboard",
    department: "Department",
    curriculum: "Curriculum",
    lecturer: "Lecturer",
    subject: "Subject",
    admin: "Admin",
    plo: "Plo",
    ploDetail: "PloDetail",
    // Add more mappings
  };

  return (
    <header className='bg-white dark:bg-gray-800 shadow-md'>
      <div className='flex items-center justify-between px-4 py-[19.5px]'>
        <div className='flex items-center'>
          <h3 className='font-semibold'>{sectionTitles[activeSection]}</h3>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
