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


export const deleteStudentAccount = async (id) => {
    const session = await getSession()
    return (await axiosInstance.delete(`/admin/delete-student/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const deleteMultipleStudentsAccount = async (ids) => {
    const session = await getSession()
    return (await axiosInstance.delete('/admin/delete-students', {
        data: {
            ids
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const editStudentAccount = async (data) => {
    const session = await getSession()

    return (await axiosInstance.patch(`/admin/edit-student/${data.id}`, {
        name: data.name,
        employeeCode: data.employeeCode,
        email: data.email,
        mobileNumber: data.mobileNumber,
        designation: data.designation,
        institute: data.institute,
        department: data.department,
        semester: data.semester
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}