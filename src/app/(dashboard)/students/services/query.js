import { useQuery } from "@tanstack/react-query";
import { getStudents, getStudentsWithPagination } from "./api";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useGetStudents = () => {
    return useQuery({
        queryKey: ['students'],
        queryFn: () => getStudents(),
    })
}

export const useGetStudentWithPagination = (page, row) => {
    const router = useRouter();
    return useQuery({
        queryKey: ['students', page],
        queryFn: () => getStudentsWithPagination(page, row),
        keepPreviousData: true,
        staleTime: 5000,
    })
}