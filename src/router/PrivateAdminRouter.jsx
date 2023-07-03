import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";

const PrivateAdminRouter = ({ children }) => {
  const [role, isLoading] = useRole();

  const location = useLocation();

  if (role?.role === "admin") {
    return children;
  }
  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateAdminRouter;
