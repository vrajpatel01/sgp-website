import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addStudents, deleteMultipleStudentsAccount, deleteStudentAccount, editStudentAccount } from "./api";
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


export const useDeleteStudentAccount = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id) => deleteStudentAccount(id),
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
                await queryClient.invalidateQueries({ queryKey: ['students'] })
            }
        }
    })
}


export const useDeleteMultipleStudentsAccount = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (ids) => deleteMultipleStudentsAccount(ids),
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
                await queryClient.invalidateQueries({ queryKey: ['students'] })
            }
        }
    })
}

export const useEditStudentAccount = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data) => editStudentAccount(data),
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
                await queryClient.invalidateQueries({ queryKey: ['students'] })
            }
        }
    })
}

