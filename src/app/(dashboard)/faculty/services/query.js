import { useQuery } from "@tanstack/react-query";
import { getAllFaculty } from "./api";
import { useSession } from "next-auth/react";

export const useGetFaulty = () => {
    const { data: session } = useSession()
    return useQuery({
        queryKey: ['faulty'],
        queryFn: () => getAllFaculty(session?.user?.token)
    })
}