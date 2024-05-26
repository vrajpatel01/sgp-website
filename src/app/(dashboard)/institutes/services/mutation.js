import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addInstitute, deleteInstitute, addDepartment, deleteDepartment, updateInstitute } from "./api";
import toast from "react-hot-toast";
import { AxiosError } from "@/axios.config";

export const useAddInstitute = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (institute) => addInstitute(institute),
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.message)
        },
        onSettled: async (data, error, variables) => {
            if (error) {
                if (error instanceof AxiosError) {
                    return toast.error(error.response.data?.message)
                }
                return toast.error(error.message)
            }
            if (data.success === false) {
                return toast.error(data.message)
            }
            if (data.success === true) {
                await queryClient.invalidateQueries({ queryKey: ['institutes'] })
                return toast.success('Institute added successfully')
            }
        }
    })
}

export const useDeleteInstitute = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (instituteId) => deleteInstitute(instituteId),
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.response?.data?.message || error.message)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['institutes'] })
            return toast.success('Institute deleted successfully')
        },
    })
}

export const useAddDepartment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data) => addDepartment([data.department], data.instituteId),
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.message)
        },
        onSettled: async (data, error, variables) => {
            if (error) {
                if (error instanceof AxiosError) {
                    return toast.error(error.response.data?.message)
                }
                return toast.error(error.message)
            }
            if (data.success === false) {
                return toast.error(data.message)
            }
            if (data.success === true) {
                await queryClient.invalidateQueries({ queryKey: ['departments'] })
                return toast.success('Department added successfully')
            }
        }
    })
}

export const useDeleteDepartment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => deleteDepartment(data.departmentId, data.instituteId),
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.message)
        },
        onSettled: async (data, error, variables) => {
            if (error) {
                if (error instanceof AxiosError) {
                    return toast.error(error.response.data?.message)
                }
                return toast.error(error.message)
            }
            if (data.success === false) {
                return toast.error(data.message)
            }
            if (data.success === true) {
                await queryClient.invalidateQueries({ queryKey: ['departments'] })
                return toast.success('Department deleted successfully')
            }
        }
    })
}

export const useUpdateInstitute = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => updateInstitute(data.instituteId, data.name),
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            return toast.error(error.message)
        },
        onSettled: async (data, error, variables) => {
            if (error) {
                if (error instanceof AxiosError) {
                    return toast.error(error.response.data?.message)
                }
                return toast.error(error.message)
            }
            if (data.success === false) {
                return toast.error(data.message)
            }
            if (data.success === true) {
                await queryClient.invalidateQueries({ queryKey: ['institutes'] })
                return toast.success('Institute update successfully')
            }
        }
    })
}
