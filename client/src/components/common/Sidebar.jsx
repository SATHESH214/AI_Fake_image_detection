import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();

    const items = [
        { label: "Dashboard", path: "/dashboard", icon: "🏠" },
        { label: "Result", path: "/result", icon: "📊" },
        { label: "History", path: "/history", icon: "🕘" },
    ];

    return (
        <aside
            style={{
                width: "240px",
                minHeight: "calc(100vh - 80px)",
                background: "#ffffff",
                borderRight: "1px solid #e5e7eb",
                padding: "20px 14px",
            }}
        >
            <div style={{ display: "grid", gap: "10px" }}>
                {items.map((item) => {
                    const active = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "12px 14px",
                                borderRadius: "12px",
                                background: active ? "#eef2ff" : "transparent",
                                color: active ? "#4338ca" : "#374151",
                                fontWeight: 700,
                                fontSize: "14px",
                            }}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}