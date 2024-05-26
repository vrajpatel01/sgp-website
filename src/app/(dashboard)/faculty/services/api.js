import axiosInstance from "@/axios.config";
import { getSession } from "next-auth/react";

export const addFaulty = async (data) => {
    const session = await getSession()
    return (await axiosInstance.post('/admin/add-faculty', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getAllFaculty = async () => {
    const session = await getSession()
    return (await axiosInstance.get('/admin/all-faculties', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}

export const getAllFacultyWithPagination = async (page, row) => {
    const session = await getSession()
    return (await axiosInstance.get(`/admin/faculties-page/${page}/${row}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`
        }
    })).data
}