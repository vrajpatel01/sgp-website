import { useQuery } from "@tanstack/react-query";
import { getAllInstitutes, getDepartment } from "./api";
import queryOptions from "@/lib/queryOptions";

export const useGetAllInstitutes = () => {
    return useQuery({
        queryKey: ['institutes'],
        queryFn: getAllInstitutes,
        ...queryOptions
    })
}

export const useGetDepartments = (instituteId, fetch) => {
    return useQuery({
        queryKey: ['departments', instituteId],
        queryFn: () => getDepartment(instituteId),
        ...queryOptions
    })
}