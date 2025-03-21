import { useState } from "react";
import { Sidebar, Content } from "../components/AdminComponent";
import "./AdminLayout.css";

const AdminLayout = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={`flex h-screen overflow-hidden`}>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setActiveSection={setActiveSection}
      />
      <Content activeSection={activeSection} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default AdminLayout;
