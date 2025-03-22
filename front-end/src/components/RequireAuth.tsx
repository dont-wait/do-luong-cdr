import { useLocation, Navigate, Outlet } from "react-router-dom";
import { USER_ID } from "../types/local";
import useAuth from "../hook/useAuth";

const RequireAuth = ({ allowedRole }: { allowedRole: number }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (localStorage.getItem(USER_ID)) return <Outlet />;

  return auth?.role === allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
};

export default RequireAuth;
