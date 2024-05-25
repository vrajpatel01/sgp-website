import axiosInstance from "@/axios.config";

export const addFaulty = async (data, token) => {
    return (await axiosInstance.post('/admin/add-faculty', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })).data
}

export const getAllFaculty = async (token) => {
    return (await axiosInstance.get('/admin/all-faculties', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })).data
}