import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login-signup" replace />;
    }

    if (allowedRole && currentUser.role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;