import { useQuery } from "@tanstack/react-query";
import { getHod, getHodWithPagination } from "./api";

export const useGetHod = () => {
    return useQuery({
        queryKey: ['hod'],
        queryFn: () => getHod(),
    })
}

export const useGetHodWithPagination = (page, row) => {
    return useQuery({
        queryKey: ['hod', page],
        queryFn: () => getHodWithPagination(page, row),
        keepPreviousData: true,
        staleTime: 5000,
    })
}