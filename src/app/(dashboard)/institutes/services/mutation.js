import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { addInstitute, deleteInstitute, addDepartment, deleteDepartment, updateInstitute } from "./api";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { AxiosError } from "@/axios.config";

export const useAddInstitute = () => {
    const { data: session } = useSession()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (institute) => addInstitute(institute, session?.user?.token),
        onSettled: async (data, error, variables) => {
            if (error) {
                if (error.message.includes('token')) {
                    toast.error('Session expired, please login again')
                    signOut()
                }
                if (error instanceof AxiosError) {
                    return toast.error(error.response.data?.message)
                }
                return toast.error(error.message)
            } else {
                await queryClient.invalidateQueries({ queryKey: ['institutes'] })
                toast.success('Institute added successfully')
            }
        }
    })
}

export const useDeleteInstitute = () => {
    const queryClient = useQueryClient()
    const { data: session } = useSession()

    return useMutation({
        mutationFn: (instituteId) => deleteInstitute(instituteId, session?.user?.token),
        onError: (error) => {
            if (error.message.includes('token')) {
                toast.error('Session expired, please login again')
                signOut()
            }
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.response?.data?.message || error.message)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['institutes'] })
            return toast.success('Institute deleted successfully')
        }
    })
}

export const useAddDepartment = () => {
    const { data: session } = useSession()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data) => addDepartment([data.department], data.instituteId, session?.user?.token),
        onError: (error) => {
            if (error.message.includes('token')) {
                toast.error('Session expired, please login again')
                return signOut()
            }
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.message)
        },
        onSettled: (data, error, variables) => {
            if (data.success === false) {
                return toast.error(data.message)
            }

            if (data.success == true) {
                const instituteId = variables.instituteId
                queryClient.invalidateQueries({ queryKey: ['departments', { instituteId }] })
                return toast.success('Department added successfully')
            }
        }
    })
}

export const useDeleteDepartment = () => {
    const queryClient = useQueryClient()
    const { data: session } = useSession()
    return useMutation({
        mutationFn: (data) => deleteDepartment(data.departmentId, data.instituteId, session?.user?.token),
        onError: (error) => {
            if (error.message.includes('token')) {
                toast.error('Session expired, please login again')
                signOut()
            }
            return toast.error(error.response?.data?.message || error.message)
        },
        onSettled: (data, error, variables) => {
            if (data.success == true) {
                const instituteId = variables.instituteId
                queryClient.invalidateQueries({ queryKey: ['departments', { instituteId }] })
                return toast.success('Department deleted successfully')
            }
        }
    })
}

export const useUpdateInstitute = () => {
    const queryClient = useQueryClient()
    const { data: session } = useSession()
    return useMutation({
        mutationFn: (data) => updateInstitute(data.instituteId, data.name, session?.user?.token),
        onError: (error) => {
            if (error.message.includes('token')) {
                toast.error('Session expired, please login again')
                signOut()
            }
            return toast.error(error.response?.data?.message || error.message)
        },
        onSettled: (data, error, variables) => {
            if (data.success === false) {
                return toast.error(data.message)
            }
            if (data.success == true) {
                queryClient.invalidateQueries({ queryKey: ['institutes'] })
                return toast.success('Institute updated successfully')
            }
        }
    })
}
