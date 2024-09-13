import { useQuery } from "@tanstack/react-query";
import { getHod, getHodWithPagination } from "./api";
import queryOptions from "@/lib/queryOptions";

export const useGetHod = () => {
    return useQuery({
        queryKey: ['hod'],
        queryFn: () => getHod(),
        ...queryOptions
    })
}

export const useGetHodWithPagination = (page, row) => {
    return useQuery({
        queryKey: ['hod', page],
        queryFn: () => getHodWithPagination(page, row),
        ...queryOptions
    })
}