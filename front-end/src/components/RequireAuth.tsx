import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hook/useAuth";

const RequireAuth = ({ allowedRole }: { allowedRole: number }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.role === allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
};

export default RequireAuth;
