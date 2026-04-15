export default function Loader({ text = "Loading..." }) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "20px",
                color: "#4f46e5",
                fontWeight: 600,
            }}
        >
            <div
                style={{
                    width: "18px",
                    height: "18px",
                    border: "3px solid #c7d2fe",
                    borderTop: "3px solid #4f46e5",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                }}
            />
            <span>{text}</span>

            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
}