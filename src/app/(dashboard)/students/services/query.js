import { useQuery } from "@tanstack/react-query";
import { getStudents, getStudentsWithPagination } from "./api";
import queryOptions from "@/lib/queryOptions";

export const useGetStudents = () => {
    return useQuery({
        queryKey: ['students'],
        queryFn: () => getStudents(),
        ...queryOptions
    })
}

export const useGetStudentWithPagination = (page, row) => {
    return useQuery({
        queryKey: ['students', page],
        queryFn: () => getStudentsWithPagination(page, row),
        ...queryOptions
    })
}