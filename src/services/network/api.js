import axiosInstance from "@/axios.config";

export const forgotPassword = async (email) => {
    return (await axiosInstance.patch('/admin/auth/forgot-password', { email })).data
}

export const otpValidation = async (email, otp) => {
    return (await axiosInstance.post('/admin/auth/forgot-password/verify', { email, otp })).data
}

export const getAllInstitutes = async () => {
    return (await axiosInstance.get('/public/institutes')).data
}

export const addInstitute = async (institute, token) => {
    return (await axiosInstance.post('/admin/add-institute', {
        name: institute
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })).data
}

export const deleteInstitute = async (id, token) => {
    return (await axiosInstance.delete(`/admin/remove-institute/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })).data
}

export const addDepartment = async (departments, instituteId, token) => {
    return (await axiosInstance.patch(`/admin/add-departments/${instituteId}`, {
        departments: [departments]
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })).data
}

export const deleteDepartment = async (departmentId, instituteId, token) => {
    return (await axiosInstance.delete(`/admin/remove-department/${instituteId}/${departmentId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })).data
}