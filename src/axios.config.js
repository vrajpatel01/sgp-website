import axios from "axios";
import { AxiosError } from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export default axiosInstance
export { AxiosError }