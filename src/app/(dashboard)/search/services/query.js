import { useQuery } from "@tanstack/react-query"
import { search } from "./api"
import queryOptions from "@/lib/queryOptions"

export const useSearchUser = (data) => {
    return useQuery({
        queryFn: () => search(data),
        queryKey: ['search', data.name, data.email, data.role],
        ...queryOptions
    })
}