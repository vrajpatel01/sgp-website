import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addHod, createAccountWithCSV, deleteHodAccount, deleteMultipleHodsAccount, editHodAccount } from "./api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";


export const useAddHod = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data) => addHod(data),
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.message)
        },
        onSettled: async (data, error, variables) => {
            if (data.success === false) {
                toast.error(data.message)
            }
            if (data.success === true) {
                await queryClient.invalidateQueries({ queryKey: ['hod'] })
                toast.success('Hod added successfully')
            }
        }
    })
}

export const useDeleteHodAccount = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id) => deleteHodAccount(id),
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
                await queryClient.invalidateQueries({ queryKey: ['hod'] })
            }
        }
    })
}


export const useDeleteMultipleHodAccount = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (ids) => deleteMultipleHodsAccount(ids),
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
                await queryClient.invalidateQueries({ queryKey: ['hod'] })
            }
        }
    })
}

export const useEditHodAccount = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data) => editHodAccount(data),
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
                await queryClient.invalidateQueries({ queryKey: ['hod'] })
            }
        }
    })
}

export const useCreateAccountByCSV = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => createAccountWithCSV(data),
        mutationKey: ['createAccountByCSV'],
        onSuccess: async (data) => {
            if (data.success) {
                await queryClient.invalidateQueries(['hod', 'student', 'faculty'])
            }
        }
    })
}