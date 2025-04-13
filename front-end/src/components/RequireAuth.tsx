import { useLocation, Navigate, Outlet } from "react-router-dom";
import { USER_ROLE, USER_ID } from "../types/local";
import { ROLES } from "../types/roles";
import { Login, AdminLayout, LecturerLayout } from "../pages/pages";
import useAuth from "../hook/useAuth";
import { apiClient } from "../api/axios";

const RequireAuth = ({ allowedRole }: { allowedRole: number }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth?.accessToken) {
    const access_token = sessionStorage.getItem("access_token");
    apiClient.defaults.headers.Authorization = `Bearer ${access_token}`;
  }

  if (localStorage.getItem(USER_ID)) {
    const role = JSON.parse(localStorage.getItem(USER_ROLE) ?? "2000");
    switch (role) {
      case 2000:
        return <Login />;
      case ROLES.Admin:
        return <AdminLayout />;
      case ROLES.Lecturer:
        return <LecturerLayout />;
      default:
        return <div>Not found Page</div>;
    }
  }

  return auth?.role === allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
};

export default RequireAuth;
