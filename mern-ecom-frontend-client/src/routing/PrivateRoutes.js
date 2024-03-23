import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  return user && user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
