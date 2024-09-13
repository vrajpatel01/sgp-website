import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFaulty, deleteFacultyAccount, deleteMultipleFacultiesAccount, editFacultyAccount } from "./api";
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
                await queryClient.invalidateQueries({ queryKey: ['faculty'] })
                toast.success('Faculty added successfully')
            }
        }
    })
}


export const useDeleteFacultyAccount = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id) => deleteFacultyAccount(id),
        onError: (error) => {
            console.log('error: ', error);
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.message)
        },
        onSettled: async (data, error, variables) => {
            toast.success(data.message)
            if (data.success === true) {
                await queryClient.invalidateQueries({ queryKey: ['faculty'] })
            }
        }
    })
}


export const useDeleteMultipleFacultyAccount = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (ids) => deleteMultipleFacultiesAccount(ids),
        onError: (error) => {
            console.log('error: ', error.response);
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.message)
        },
        onSettled: async (data, error, variables) => {
            toast.success(data.message)
            if (data.success === true) {
                await queryClient.invalidateQueries({ queryKey: ['faculty'] })
            }
        }
    })
}

export const useEditFacultyAccount = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data) => editFacultyAccount(data),
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.message)
        },
        onSettled: async (data, error, variables) => {
            toast.success(data.message)
            if (data.success === true) {
                await queryClient.invalidateQueries({ queryKey: ['faculty'] })
            }
        }
    })
}

