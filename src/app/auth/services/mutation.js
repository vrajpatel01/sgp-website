import { useMutation } from "@tanstack/react-query";
import { forgotPassword, otpValidation } from "./api";

import toast from "react-hot-toast";
import { AxiosError } from "@/axios.config";


export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (email) => forgotPassword(email),
        // onSuccess: () => {
        //     toast.success('OTP sent successfully. Check your email.');
        // },
    })
}

export const useOtpValidation = () => {
    return useMutation({
        mutationFn: (data) => otpValidation(data.email, data.otp)
    })
}