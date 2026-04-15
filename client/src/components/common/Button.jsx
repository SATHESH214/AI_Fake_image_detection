export default function Button({
    children,
    type = "button",
    variant = "primary",
    onClick,
    disabled = false,
    fullWidth = false,
    style = {},
}) {
    const variantStyles = {
        primary: {
            background: "#4f46e5",
            color: "#ffffff",
            border: "none",
        },
        secondary: {
            background: "#ffffff",
            color: "#4f46e5",
            border: "1px solid #dbeafe",
        },
        danger: {
            background: "#dc2626",
            color: "#ffffff",
            border: "none",
        },
        ghost: {
            background: "transparent",
            color: "#4f46e5",
            border: "1px solid transparent",
        },
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={{
                padding: "12px 16px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "14px",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.7 : 1,
                width: fullWidth ? "100%" : "auto",
                transition: "0.2s ease",
                ...variantStyles[variant],
                ...style,
            }}
        >
            {children}
        </button>
    );
}