import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "../components/common/ProtectedRoute";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ResultPage from "../pages/ResultPage";
import HistoryPage from "../pages/HistoryPage";

import { getToken } from "../utils/storage";

function PublicRoute({ children }) {
    const token = getToken();

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

function NotFoundPage() {
    return (
        <div style={styles.notFoundPage}>
            <div style={styles.notFoundCard}>
                <div style={styles.notFoundBadge}>404</div>
                <h1 style={styles.notFoundTitle}>Page not found</h1>
                <p style={styles.notFoundText}>
                    The page you are looking for does not exist or may have been moved.
                </p>

                <div style={styles.notFoundActions}>
                    <Link to="/" style={styles.primaryLink}>
                        Go Home
                    </Link>
                    <Link to="/dashboard" style={styles.secondaryLink}>
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <RegisterPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/result"
                    element={
                        <ProtectedRoute>
                            <ResultPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <HistoryPage />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

const styles = {
    notFoundPage: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
        padding: "20px",
    },
    notFoundCard: {
        width: "100%",
        maxWidth: "460px",
        background: "#ffffff",
        borderRadius: "20px",
        padding: "36px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    },
    notFoundBadge: {
        display: "inline-block",
        padding: "8px 14px",
        borderRadius: "999px",
        background: "#eef2ff",
        color: "#4338ca",
        fontWeight: 800,
        fontSize: "13px",
        letterSpacing: "1px",
        marginBottom: "16px",
    },
    notFoundTitle: {
        margin: "0 0 12px",
        color: "#111827",
        fontSize: "32px",
    },
    notFoundText: {
        margin: "0 0 22px",
        color: "#6b7280",
        lineHeight: 1.7,
        fontSize: "15px",
    },
    notFoundActions: {
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        flexWrap: "wrap",
    },
    primaryLink: {
        display: "inline-block",
        padding: "12px 18px",
        borderRadius: "10px",
        textDecoration: "none",
        background: "#4f46e5",
        color: "#ffffff",
        fontWeight: 700,
    },
    secondaryLink: {
        display: "inline-block",
        padding: "12px 18px",
        borderRadius: "10px",
        textDecoration: "none",
        background: "#ffffff",
        color: "#4f46e5",
        fontWeight: 700,
        border: "1px solid #dbeafe",
    },
};