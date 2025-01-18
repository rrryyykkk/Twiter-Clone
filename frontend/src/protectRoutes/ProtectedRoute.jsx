import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const authUser = useAuth();

  console.log("authUser:", authUser);

  if (!authUser) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default ProtectedRoute;
