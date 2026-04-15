import axios from "axios";
import { getToken } from "../utils/storage";

const BASE_URL = "http://127.0.0.1:8000";

export const predictionApi = axios.create({
    baseURL: BASE_URL,
});

const getAuthHeaders = () => {
    const token = getToken();

    return {
        Authorization: `Bearer ${token}`,
    };
};

export const predictImage = async (formData) => {
    return predictionApi.post("/api/predict", formData, {
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getPredictionHistory = async () => {
    return predictionApi.get("/api/history/", {
        headers: {
            ...getAuthHeaders(),
        },
    });
};

export const deletePredictionHistoryItem = async (predictionId) => {
    return predictionApi.delete(`/api/history/${predictionId}`, {
        headers: {
            ...getAuthHeaders(),
        },
    });
};