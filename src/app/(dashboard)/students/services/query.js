import { useQuery } from "@tanstack/react-query";
import { getStudents } from "./api";
import { useSession } from "next-auth/react";

export const useGetStudents = () => {
    const { data: session } = useSession()

    return useQuery({
        queryKey: ['students'],
        queryFn: () => getStudents(session?.user?.token),
    })
}