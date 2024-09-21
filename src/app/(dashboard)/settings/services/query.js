import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "./api";
import queryOptions from "@/lib/queryOptions";

export function useGetMyInfo() {
    return useQuery({
        queryKey: ['myInfo'],
        queryFn: () => getMyInfo(),
        ...queryOptions
    })
}