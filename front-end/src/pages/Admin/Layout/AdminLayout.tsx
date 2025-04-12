import { useState } from "react";
import Cookies from "js-cookie";
import useAuth from "../../../hook/useAuth";
import { Sidebar, Content } from "../Components";
import "./AdminLayout.css";

const AdminLayout = () => {
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { auth } = useAuth();
  if (auth?.accessToken) {
    Cookies.set("access_token", auth?.accessToken, {
      path: "/admin",
      sameSite: "strict",
      secure: false,
      expires: 1,
    });
  }

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setActiveSection={setActiveSection}
      />
      <Content activeSection={activeSection} />
    </div>
  );
};

export default AdminLayout;
