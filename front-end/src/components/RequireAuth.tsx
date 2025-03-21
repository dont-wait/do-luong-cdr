import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hook/useAuth";

const RequireAuth = ({ allowedRoles }: { allowedRoles: number[] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
};

export default RequireAuth;
