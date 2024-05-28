import { useQuery } from "@tanstack/react-query";
import { getAllFaculty, getAllFacultyWithPagination } from "./api";

export const useGetFaulty = () => {
    return useQuery({
        queryKey: ['faculty'],
        queryFn: () => getAllFaculty()
    })
}

export const useGetFaultyWithPagination = (page, row) => {
    return useQuery({
        queryKey: ['faculty', page],
        queryFn: () => getAllFacultyWithPagination(page, row),
        keepPreviousData: true,
        staleTime: 5000,
    })
}