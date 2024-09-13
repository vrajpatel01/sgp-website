import { useQuery } from "@tanstack/react-query";
import { getAllFaculty, getAllFacultyWithPagination } from "./api";
import queryOptions from "@/lib/queryOptions";

export const useGetFaulty = () => {
    return useQuery({
        queryKey: ['faculty'],
        queryFn: () => getAllFaculty(),
        ...queryOptions
    })
}

export const useGetFaultyWithPagination = (page, row) => {
    return useQuery({
        queryKey: ['faculty', page],
        queryFn: () => getAllFacultyWithPagination(page, row),
        ...queryOptions
    })
}