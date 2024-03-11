import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
  const { user } = useSelector((state) => state.user);
  return user && user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
export default AdminRoutes;
