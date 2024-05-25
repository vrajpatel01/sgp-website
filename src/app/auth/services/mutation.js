import { useMutation } from "@tanstack/react-query";
import { forgotPassword, otpValidation } from "./api";

import toast from "react-hot-toast";
import { AxiosError } from "@/axios.config";


export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (email) => forgotPassword(email),
        onSuccess: () => {
            toast.success('OTP sent successfully. Check your email.');
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            toast.error('Failed to send OTP. Please try again.');
        }
    })
}

export const useOtpValidation = () => {
    return useMutation({
        mutationFn: (data) => otpValidation(data.email, data.otp),
        onSuccess: (e) => {
            return toast.success('Password is Send to your email. Please check your email.')
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            toast.error('Failed to verify OTP. Please try again.');
        }
    })
}