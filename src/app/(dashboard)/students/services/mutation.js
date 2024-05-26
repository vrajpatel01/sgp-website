import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { addStudents } from "./api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export const useAddStudent = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (data) => addStudents(data),
        onError: (error) => {
            if (error.message.includes('token')) {
                toast.error('Session expired, please login again')
                signOut()
                return router.replace('/auth/login')
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
                await queryClient.invalidateQueries({ queryKey: ['students'] })
                toast.success('Student added successfully')
            }
        }
    })
}