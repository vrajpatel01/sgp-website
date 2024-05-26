import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFaulty } from "./api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const useAddFaulty = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => addFaulty(data),
        onError: (error) => {
            if (error instanceof AxiosError) {
                console.log(error);
                return toast.error(error.response.data.message)
            }
            return toast.error(error.message)
        },
        onSettled: async (data, error, variables) => {
            if (data.success === false) {
                toast.error(error.message)
            }
            if (data.success === true) {
                await queryClient.invalidateQueries({ queryKey: ['faulty'] })
                toast.success('Faculty added successfully')
            }
        }
    })
}