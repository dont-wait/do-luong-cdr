import { CNHP } from "../../../../types/local";

interface HeaderProps {
  activeSection: string;
}

const Navbar: React.FC<HeaderProps> = ({ activeSection }) => {
  const isCnhp = JSON.parse(localStorage.getItem(CNHP) ?? '""');
  const sectionTitles: { [key: string]: string } = {
    dashboard: "Dashboard",
    home: "Home",
    managementclass: "Management Class",
    // Add more mappings
  };

  if (isCnhp) {
    sectionTitles["clo"] = "Clo";
  }

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
