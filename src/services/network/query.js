import { useQuery } from "@tanstack/react-query";
import { getAllInstitutes } from "./api";

export const useGetAllInstitutes = () => {
    const query = useQuery({
        queryKey: ['institutes'],
        queryFn: getAllInstitutes
    })

    return query
}