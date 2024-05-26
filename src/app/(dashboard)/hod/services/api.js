import axiosInstance from "@/axios.config";
import { getSession } from "next-auth/react";

export const addHod = async (data) => {
    const session = await getSession()
    return (await axiosInstance.post('/admin/add-hod', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getHod = async () => {
    const session = await getSession()
    return (await axiosInstance.get('/admin/all-hods', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getHodWithPagination = async (page, row) => {
    const session = await getSession()
    return (await axiosInstance.get(`/admin/hods-page/${page}/${row}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}