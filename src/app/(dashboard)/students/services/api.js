import axiosInstance from "@/axios.config";

export const addStudents = async (data, token) => {
    return (await axiosInstance.post('/admin/add-student', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })).data
}

export const getStudents = async (token) => {
    return (await axiosInstance.get('/admin/all-students', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })).data
}