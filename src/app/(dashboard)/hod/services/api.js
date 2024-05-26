import axiosInstance from "@/axios.config";

export const addHod = async (data, token) => {
    return (await axiosInstance.post('/admin/add-hod', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })).data
}

export const getHod = async (token) => {
    return (await axiosInstance.get('/admin/all-hods', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })).data
}

export const getHodWithPagination = async (page, row, token) => {
    return (await axiosInstance.get(`/admin/hods-page/${page}/${row}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })).data
}