import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const PrivateInstructorRouter = ({ children }) => {
  const { users, loading } = useContext(AuthContext);
  const [role, isLoading] = useRole();

  const location = useLocation();

  if (role?.role === "instructor") {
    return children;
  }
  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  } else {
    {
      return (users && role?.role === "admin") || role?.role === "student" ? (
        <Navigate to="/" state={{ from: location }} replace />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      );
    }
  }
};

export default PrivateInstructorRouter;
