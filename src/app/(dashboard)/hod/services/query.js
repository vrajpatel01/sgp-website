import { useQuery } from "@tanstack/react-query";
import { getHod, getHodWithPagination } from "./api";
import { useSession } from "next-auth/react";

export const useGetHod = () => {
    const { data: session } = useSession()

    return useQuery({
        queryKey: ['hod'],
        queryFn: () => getHod(session?.user?.token),
    })
}

export const useGetHodWithPagination = (page, row) => {
    const { data: session } = useSession()

    return useQuery({
        queryKey: ['hod', page],
        queryFn: () => getHodWithPagination(page, row, session?.user?.token),
        keepPreviousData: true,
        staleTime: 5000,
    })
}