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