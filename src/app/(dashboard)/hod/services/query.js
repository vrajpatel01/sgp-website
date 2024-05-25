import { useQuery } from "@tanstack/react-query";
import { getHod } from "./api";
import { useSession } from "next-auth/react";

export const useGetHod = () => {
    const { data: session } = useSession()

    return useQuery({
        queryKey: ['hod'],
        queryFn: () => getHod(session?.user?.token),
    })
}