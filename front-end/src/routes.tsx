import { Routes, Route } from "react-router-dom";
import { Login, AdminLayout, LecturerLayout } from "./pages/pages";
import RequireAuth from "./components/RequireAuth";
import { ROLES } from "./types/roles";

const AppRoutes = () => (
  <Routes>
    {/* public router */}
    <Route path='/' element={<Login />}></Route>
    {/* protected router */}
    <Route element={<RequireAuth allowedRole={ROLES.Admin} />}>
      <Route path='/admin' element={<AdminLayout />} />
    </Route>

    <Route element={<RequireAuth allowedRole={ROLES.Lecturer} />}>
      <Route path='/lecturer' element={<LecturerLayout />} />
    </Route>
  </Routes>
);

export default AppRoutes;
