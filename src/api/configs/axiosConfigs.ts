import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

const errorHandler = (error: AxiosError) => {
    const statusCode = error.response?.status;
    const navigate = useNavigate();

    if(statusCode && statusCode === 401 ) {
        navigate("/login");
    }
    else {
        return Promise.reject(error);
    }
}

api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error);
})

export default api;
