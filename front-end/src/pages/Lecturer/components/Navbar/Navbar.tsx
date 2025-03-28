interface HeaderProps {
  activeSection: string;
}

const Navbar: React.FC<HeaderProps> = ({ activeSection }) => {
  const sectionTitles: { [key: string]: string } = {
    dashboard: "Dashboard",
    upload: "Upload",
    // Add more mappings
  };

  return (
    <header className='bg-white shadow-md mb-1.5'>
      <div className='flex items-center justify-between px-4 py-[19.5px]'>
        <div className='flex items-center'>
          <h3 className='font-semibold'>{sectionTitles[activeSection]}</h3>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
