import { useQuery } from "@tanstack/react-query";
import { getStudents, getStudentsWithPagination } from "./api";

export const useGetStudents = () => {
    return useQuery({
        queryKey: ['students'],
        queryFn: () => getStudents(),
    })
}

export const useGetStudentWithPagination = (page, row) => {
    return useQuery({
        queryKey: ['students', page],
        queryFn: () => getStudentsWithPagination(page, row),
        keepPreviousData: true,
        staleTime: 5000,
    })
}