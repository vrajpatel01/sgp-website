import axiosInstance from "@/axios.config"
import { getSession } from "next-auth/react"

export const editUserInfo = async (data) => {
    const session = await getSession();
    return (await axiosInstance.patch('/admin/edit-admin', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${session?.user?.token}`,
        }
    })).data
}

export const changePassword = async (data) => {
    const session = await getSession();
    console.log(session);

    return (await axiosInstance.patch('/admin/change-password', data, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${session?.user?.token}`,
        }
    }))
}

export const verifyEmailChange = async (otp) => {
    const session = await getSession();
    return (await axiosInstance.post('/admin/verify-email-change', { otp }, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${session?.user?.token}`,
        }
    }))
}