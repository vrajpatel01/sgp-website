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

export const deleteHodAccount = async (id) => {
    const session = await getSession()
    return (await axiosInstance.delete(`/admin/delete-hod/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const deleteMultipleHodsAccount = async (ids) => {
    const session = await getSession()
    return (await axiosInstance.delete('/admin/delete-hods', {
        data: {
            ids
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const editHodAccount = async (data) => {
    const session = await getSession()
    return (await axiosInstance.patch(`/admin/edit-hod/${data.id}`, data.payload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}

export const createAccountWithCSV = async (data) => {
    const session = await getSession();
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('role', data.role);
    formData.append('department', data.department);
    formData.append('institute', data.institute);

    return (await axiosInstance.post(`/admin/upload-csv`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data;
}