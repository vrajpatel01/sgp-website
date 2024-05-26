import { useQuery } from "@tanstack/react-query";
import { getAllInstitutes, getDepartment } from "./api";

export const useGetAllInstitutes = () => {
    return useQuery({
        queryKey: ['institutes'],
        queryFn: getAllInstitutes
    })
}

export const useGetDepartments = (instituteId, fetch) => {
    return useQuery({
        queryKey: ['departments', instituteId],
        queryFn: () => getDepartment(instituteId),
        enabled: fetch
    })
}