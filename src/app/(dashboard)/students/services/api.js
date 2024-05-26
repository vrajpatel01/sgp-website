import axiosInstance from "@/axios.config";
import { getSession } from "next-auth/react";

export const addStudents = async (data) => {
    const session = await getSession()
    return (await axiosInstance.post('/admin/add-student', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}

export const getStudents = async () => {
    const session = await getSession()
    return (await axiosInstance.get('/admin/all-students', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}

export const getStudentsWithPagination = async (page, row) => {
    const session = await getSession()
    return (await axiosInstance.get(`/admin/students-page/${page}/${row}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`
        }
    })).data
}