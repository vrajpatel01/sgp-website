import axiosInstance from "@/axios.config";

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

export const getDepartment = async (instituteId, token) => {
    return (await axiosInstance.get(`/public/departments/${instituteId}`)).data
}

export const addDepartment = async (departments, instituteId, token) => {
    return (await axiosInstance.patch(`/admin/add-departments/${instituteId}`, {
        departments: [departments.toString()]
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })).data
}

export const updateInstitute = async (instituteId, name, token) => {
    return (await axiosInstance.patch(`/admin/update-institute/${instituteId}`, {
        name
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