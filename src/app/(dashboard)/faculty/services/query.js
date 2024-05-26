import { useQuery } from "@tanstack/react-query";
import { getAllFaculty, getAllFacultyWithPagination } from "./api";
import { useSession } from "next-auth/react";

export const useGetFaulty = () => {
    const { data: session } = useSession()
    return useQuery({
        queryKey: ['faulty'],
        queryFn: () => getAllFaculty(session?.user?.token)
    })
}

export const useGetFaultyWithPagination = (page, row) => {
    const { data: session } = useSession()
    return useQuery({
        queryKey: ['faulty', page],
        queryFn: () => getAllFacultyWithPagination(page, row, session?.user?.token),
        keepPreviousData: true,
        staleTime: 5000,
    })
}