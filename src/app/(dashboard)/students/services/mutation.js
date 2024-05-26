import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addStudents } from "./api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";


export const useAddStudent = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => addStudents(data),
        onError: (error) => {
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