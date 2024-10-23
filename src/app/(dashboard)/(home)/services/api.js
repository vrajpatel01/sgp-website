import axiosInstance from "@/axios.config"
import { getSession } from "next-auth/react"

export const getProjectSubmissionInfo = async ({ institute, department }) => {
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

export const getTechnologyInfo = async ({ institute, department }) => {
    const session = await getSession();
    let url = `/admin/technology-distribution?instituteId=${institute}`
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

export const getCategoryInfo = async ({ institute, department }) => {
    const session = await getSession();
    let url = `/admin/project-category-distribution?instituteId=${institute}`
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