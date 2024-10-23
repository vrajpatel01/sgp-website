import { useQuery } from "@tanstack/react-query"
import { getCategoryInfo, getProjectSubmissionInfo, getTechnologyInfo } from "./api"
import queryOptions from "@/lib/queryOptions"

export const useGetProjectSubmissionInfo = ({ institute, department }) => {
    return useQuery({
        queryFn: () => getProjectSubmissionInfo({ institute, department }),
        queryKey: ['chart', 'dashboard', 'projectSubmissionChart'],
        ...queryOptions
    })
}

export const useGetTechnologyInfo = ({ institute, department }) => {
    return useQuery({
        queryFn: () => getTechnologyInfo({ institute, department }),
        queryKey: ['chart', 'dashboard', 'technologyChart'],
        ...queryOptions
    })
}

export const useGetCategoryInfo = ({ institute, department }) => {
    return useQuery({
        queryFn: () => getCategoryInfo({ institute, department }),
        queryKey: ['chart', 'dashboard', 'categoryChart'],
        ...queryOptions
    })
}