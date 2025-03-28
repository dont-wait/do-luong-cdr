import {
  FaBusinessTime,
  FaCloudUploadAlt,
  FaHome,
  FaClone,
} from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { CNHP } from "../../../../types/local";
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
  const isCnhp = JSON.parse(localStorage.getItem(CNHP) ?? '""');
  const navItems = [
    {
      section: "dashboard",
      icon: <MdOutlineDashboard className='sidebar-item' />,
      label: "Dashboard",
    },
    {
      section: "home",
      icon: <FaHome className='sidebar-item' />,
      label: "Home",
    },
    {
      section: "upload",
      icon: <FaCloudUploadAlt className='sidebar-item' />,
      label: "Upload",
    },
  ];

  if (isCnhp) {
    navItems.push({
      section: "clo",
      icon: <FaClone className='sidebar-item' />,
      label: "Clo",
    });
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-20 md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
      <div className='flex items-center justify-between p-4 border-b'>
        <span className='text-2xl font-bold text-gray-800'>EduManage</span>
        <button
          className='p-2.5 rounded-lg bg-gray-200 md:hidden'
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
