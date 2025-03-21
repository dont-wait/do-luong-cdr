import { Routes, Route } from "react-router-dom";
import { Login, AdminLayout } from "./pages/pages";
import RequireAuth from "./components/RequireAuth";
import { ROLES } from "./types/roles";

const AppRoutes = () => (
  <Routes>
    {/* public router */}
    <Route path='/' element={<Login />}></Route>
    {/* protected router */}
    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
      <Route path='/admin' element={<AdminLayout />} />
    </Route>

    <Route element={<RequireAuth allowedRoles={[ROLES.Lecturer]} />}>
      <Route path='/lecturer' element={<AdminLayout />} />
    </Route>
  </Routes>
);

export default AppRoutes;
