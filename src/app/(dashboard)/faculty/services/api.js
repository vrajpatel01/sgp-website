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


export const deleteFacultyAccount = async (id) => {
    const session = await getSession()
    return (await axiosInstance.delete(`/admin/delete-faculty/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const deleteMultipleFacultiesAccount = async (ids) => {
    const session = await getSession()
    return (await axiosInstance.delete('/admin/delete-faculties', {
        data: {
            ids
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const editFacultyAccount = async (data) => {
    const session = await getSession()

    return (await axiosInstance.patch(`/admin/edit-faculty/${data.id}`, {
        name: data.name,
        employeeCode: data.employeeCode,
        email: data.email,
        mobileNumber: data.mobileNumber,
        designation: data.designation,
        institute: data.institute,
        department: data.department
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}