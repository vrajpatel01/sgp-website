import { useMutation } from "@tanstack/react-query"
import { changePassword, editUserInfo, verifyEmailChange } from "./api"

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: (data) => editUserInfo(data),
        retry: 1,
        mutationKey: ['editUserInfo']
    })
}

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data) => changePassword(data),
        retry: 1,
        mutationKey: ['changePassword']
    })
}

export const useVerifyEmailChange = () => {
    return useMutation({
        mutationFn: (otp) => verifyEmailChange(otp),
        retry: 1,
        mutationKey: ['verifyEmailChange']
    })
}