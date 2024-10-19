import { useQuery } from "@tanstack/react-query"
import { getChartData } from "./api"
import queryOptions from "@/lib/queryOptions"

export const useGetChartData = ({ institute, department }) => {
    return useQuery({
        queryFn: () => getChartData({ institute, department }),
        queryKey: ['chart', 'dashboard'],
        ...queryOptions
    })
}