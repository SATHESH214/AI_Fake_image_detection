import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const authApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const registerUser = async (data) => {
    return authApi.post("/api/auth/register", data);
};

export const loginUser = async (data) => {
    return authApi.post("/api/auth/login", data);
};