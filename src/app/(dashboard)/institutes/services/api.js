import axiosInstance from "@/axios.config";
import { getSession } from "next-auth/react";

export const getAllInstitutes = async () => {
    return (await axiosInstance.get('/public/institutes')).data
}

export const addInstitute = async (institute) => {
    const session = await getSession()
    return (await axiosInstance.post('/admin/add-institute', {
        name: institute
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`,
        }
    })).data
}

export const deleteInstitute = async (id) => {
    const session = await getSession()
    return (await axiosInstance.delete(`/admin/remove-institute/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`,
        }
    })).data
}

export const getDepartment = async (instituteId) => {
    return (await axiosInstance.get(`/public/departments/${instituteId}`)).data
}

export const addDepartment = async (departments, instituteId) => {
    const session = await getSession()
    return (await axiosInstance.patch(`/admin/add-departments/${instituteId}`, {
        departments: [departments.toString()]
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`,
        }
    })).data
}

export const updateInstitute = async (instituteId, name) => {
    const session = await getSession()
    return (await axiosInstance.patch(`/admin/update-institute/${instituteId}`, {
        name
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`,
        }
    })).data
}

export const updateDepartment = async (departmentId, instituteId, departmentName) => {
    const session = await getSession()
    return (await axiosInstance.patch(`/admin/edit-department/${instituteId}/${departmentId}`, {
        "newName": departmentName
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`,
        }
    })).data
}

export const deleteDepartment = async (departmentId, instituteId) => {
    const session = await getSession()
    return (await axiosInstance.delete(`/admin/remove-department/${instituteId}/${departmentId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`,
        }
    })).data
}