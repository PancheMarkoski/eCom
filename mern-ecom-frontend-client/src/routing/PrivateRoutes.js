import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoutes = ({ children }) => {
  const user = useSelector((state) => state.user);

  return user.user ? children : <Navigate to="/login" replace={true} />;
};
