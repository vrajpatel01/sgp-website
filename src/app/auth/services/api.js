import axiosInstance from "@/axios.config";

export const forgotPassword = async (email) => {
    return (await axiosInstance.patch('/admin/auth/forgot-password', { email })).data
}

export const otpValidation = async (email, otp) => {
    return (await axiosInstance.post('/admin/auth/forgot-password/verify', { email, otp })).data
}