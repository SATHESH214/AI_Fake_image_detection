import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../../utils/storage";

export default function ProtectedRoute({ children }) {
    const location = useLocation();
    const token = getToken();

    if (!token) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return children;
}