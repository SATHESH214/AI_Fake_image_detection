import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

export default function DashboardLayout({ title = "Dashboard", children }) {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
            }}
        >
            <Navbar title={title} />

            <div
                style={{
                    display: "flex",
                    alignItems: "stretch",
                }}
            >
                <div className="dashboard-sidebar">
                    <Sidebar />
                </div>

                <main
                    style={{
                        flex: 1,
                        padding: "24px 20px",
                        minWidth: 0,
                    }}
                >
                    <div
                        style={{
                            maxWidth: "1200px",
                            margin: "0 auto",
                        }}
                    >
                        {children}
                    </div>
                </main>
            </div>

            <style>
                {`
          @media (max-width: 900px) {
            .dashboard-sidebar {
              display: none;
            }
          }
        `}
            </style>
        </div>
    );
}