import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFaulty } from "./api";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";

export const useAddFaulty = () => {
    const { data: session } = useSession()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => addFaulty(data, session?.user?.token),
        onError: (error) => {
            if (error.message.includes('token')) {
                toast.error('Session expired, please login again')
                signOut()
                return router.push('/auth/login')
            }
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.response?.data?.message || error.message)
        },
        onSettled: async (data, error, variables) => {
            if (data.success === false) {
                toast.error(data.message)
            }
            if (data.success === true) {
                await queryClient.invalidateQueries({ queryKey: ['faulty'] })
                toast.success('Faculty added successfully')
            }
        }
    })
}