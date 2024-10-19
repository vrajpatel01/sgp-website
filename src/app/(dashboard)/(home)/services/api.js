import axiosInstance from "@/axios.config"
import { getSession } from "next-auth/react"

export const getChartData = async ({ institute, department }) => {
    const session = await getSession();
    let url = `/admin/dashboard?instituteId=${institute}`

    if (department) {
        url = url + `&departmentId=${department}`
    }
    return (await axiosInstance.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}