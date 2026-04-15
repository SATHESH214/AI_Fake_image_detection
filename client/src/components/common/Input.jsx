export default function Input({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
    required = false,
    error = "",
    style = {},
    inputStyle = {},
}) {
    return (
        <div style={{ marginBottom: "16px", ...style }}>
            {label ? (
                <label
                    htmlFor={name}
                    style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#374151",
                    }}
                >
                    {label}
                </label>
            ) : null}

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                style={{
                    width: "100%",
                    padding: "13px 14px",
                    borderRadius: "12px",
                    border: error ? "1px solid #dc2626" : "1px solid #d1d5db",
                    outline: "none",
                    fontSize: "14px",
                    background: "#ffffff",
                    ...inputStyle,
                }}
            />

            {error ? (
                <p
                    style={{
                        margin: "8px 0 0",
                        fontSize: "12px",
                        color: "#dc2626",
                    }}
                >
                    {error}
                </p>
            ) : null}
        </div>
    );
}