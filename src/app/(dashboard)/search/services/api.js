import axiosInstance from "@/axios.config"
import { getSession } from "next-auth/react"

export const search = async ({ role, name, email }) => {
    console.log(name);

    const session = await getSession();
    let url = `/admin/search-users?role=${role}`
    if (name) {
        url = `/admin/search-users?role=${role}&name=${name}`
    }

    if (email) {
        url = `/admin/search-users?role=${role}&email=${email}`
    }

    if (name && email) {
        url = `/admin/search-users?role=${role}&name=${name}&email=${email}`
    }
    return (await axiosInstance.get(url, {
        headers: {
            'Authorization': `Bearer ${session?.user?.token}`
        }
    })).data
}