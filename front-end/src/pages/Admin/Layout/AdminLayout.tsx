import { useState, useEffect } from "react";
import { Sidebar, Content } from "../Components";
import "./AdminLayout.css";

const AdminLayout = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  useEffect(() => {
    console.log("admin");
  }, []);

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
