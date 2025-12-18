import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  
  if (isLoggedIn === "true") {
    return children;
  }
  return <Navigate to={"/login"} replace></Navigate>;
};

export default ProtectedRoute;