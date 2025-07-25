// components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router";
import { useUser } from "../../context/userContext.jsx";

const ProtectedUserRoute = ({ children }) => {
  const { isAuthenticated } = useUser();

  const location = useLocation();

  // If not authenticated, redirect to login with return URL
  if (isAuthenticated) {
    return children;
  }

  // If authenticated, render the protected component
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedUserRoute;
