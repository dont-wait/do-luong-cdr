import { FaBuilding, FaGraduationCap, FaBusinessTime } from "react-icons/fa";
import {
  MdOutlineDashboard,
  MdClass,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa6";
import { GrTarget } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";
import { TbLogout2 } from "react-icons/tb";
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  setActiveSection: (section: string) => void;
}
import useAuth from "../../../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { logoutHandle } from "../../../../services/auth";

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  setActiveSection,
}) => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const navItems = [
    {
      section: "dashboard",
      icon: <MdOutlineDashboard className='sidebar-item' />,
      label: "Dashboard",
    },
    {
      section: "department",
      icon: <FaBuilding className='sidebar-item' />,
      label: "Department",
    },
    {
      section: "curriculum",
      icon: <FaGraduationCap className='sidebar-item' />,
      label: "Curriculum",
    },
    {
      section: "lecturer",
      icon: <FaUserGraduate className='sidebar-item' />,
      label: "Lecturer",
    },
    {
      section: "subject",
      icon: <MdClass className='sidebar-item' />,
      label: "Subject",
    },
    {
      section: "admin",
      icon: <MdOutlineAdminPanelSettings className='sidebar-item' />,
      label: "Admin",
    },
    {
      section: "plo",
      icon: <GrTarget className='sidebar-item' />,
      label: "Plo",
    },
    {
      section: "class",
      icon: <SiGoogleclassroom className='sidebar-item' />,
      label: "Class",
    },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-20 md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
      <div className='flex items-center justify-between p-4 border-b dark:border-gray-700'>
        <span className='text-2xl font-bold text-gray-800'>EduManage</span>
        <button
          className='p-2.5 rounded-lg bg-gray-200 dark:bg-gray-700 md:hidden'
          onClick={toggleSidebar}>
          <FaBusinessTime />
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
              className='nav-btn flex items-center w-full px-4 py-3 text-left rounded-lg hover:bg-gray-100 '>
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <button
            onClick={() => {
              setAuth(logoutHandle());
              navigate("/", { replace: true });
            }}
            className='nav-btn flex items-center w-full px-4 py-3 text-left rounded-lg hover:bg-gray-100 '>
            <TbLogout2 className='sidebar-item' />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
