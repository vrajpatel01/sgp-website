import { useQuery } from "@tanstack/react-query";
import { getStudents, getStudentsWithPagination } from "./api";
import { useSession } from "next-auth/react";

export const useGetStudents = () => {
    const { data: session } = useSession()

    return useQuery({
        queryKey: ['students'],
        queryFn: () => getStudents(session?.user?.token),
    })
}

export const useGetStudentWithPagination = (page, row) => {
    const { data: session } = useSession()

    return useQuery({
        queryKey: ['students', page],
        queryFn: () => getStudentsWithPagination(page, row, session?.user?.token),
        keepPreviousData: true,
        staleTime: 5000,
    })
}