'use client';
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// components
import InputField from "@/components/shared/inputField";
import SelectInput from "@/components/shared/selectInput";

// network
import { useGetAllInstitutes, useGetDepartments } from "../../institutes/services/query";
import Button from "@/components/shared/button";
import isEmpty from "@/services/validator/isEmpty";
import { Warper } from "./warper";
import { IoMdPerson } from "react-icons/io";
import { useUpdateProfile } from "../services/mutation";

import { useQueryClient } from "@tanstack/react-query";

export default function BasicInformation({ data }) {
    const queryClient = useQueryClient();
    const updateProfile = useUpdateProfile();
    const [isChanged, setIsChanged] = useState(false)
    const [basicInformation, setBasicInformation] = useState({
        name: data.name,
        institute: data?.institute?._id,
        department: data?.department?._id
    })
    const institutes = useGetAllInstitutes()
    const departments = useGetDepartments(basicInformation?.institute, basicInformation?.institute !== '' && basicInformation?.institute !== 'Select Institute' ? true : false)

    const handleFormSubmit = (e) => {
        e.preventDefault()
        try {
            const { name } = basicInformation
            const nameValidate = isEmpty(name)

            if (nameValidate) {
                const data = {
                    name: basicInformation.name,
                    institute: basicInformation.institute,
                    department: basicInformation.department,
                }
                updateProfile.mutate(data, {
                    onSuccess: async (data) => {
                        if (data.success) {
                            await queryClient.invalidateQueries(['myInfo'])
                            return toast.success(data.message)
                        }
                    },
                    onError: (error) => {
                        console.log(error);
                        return toast.error(error?.message || 'Having some issue to update profile');
                    }
                })
            }

        } catch (error) {
            if (error.code === 'EMPTY')
                return toast.error('Empty fields are not allowed')
            return toast.error(error.message)
        }
    }

    useEffect(() => {
        if (basicInformation.name !== data.name ||
            basicInformation.institute !== data?.institute?._id ||
            basicInformation.department !== data?.department?._id) {
            setIsChanged(true)
        } else {
            setIsChanged(false)
        }
    }, [basicInformation, data?.department?._id, data?.institute?._id, data.name])
    return (
        <Warper title='Personal Information' description="You can update your personal information from here.">
            <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
                <InputField
                    value={basicInformation.name}
                    onChange={e => setBasicInformation({ ...basicInformation, name: e.target.value })}
                    className='text-sm w-full' title='Name' />
                <SelectInput
                    title='Institute'
                    onChange={e => setBasicInformation({ ...basicInformation, institute: e.target.value })}
                    value={basicInformation.institute}
                    className="w-full truncate">
                    <option value={null} default>Select Institute</option>
                    {institutes.isSuccess && institutes.data.institutes.map(institute => (<option key={institute._id} value={institute._id}>{institute.name}</option>))}
                </SelectInput>
                <SelectInput
                    title='Department'
                    onChange={e => setBasicInformation({ ...basicInformation, department: e.target.value })}
                    value={basicInformation.department}
                    className="w-full truncate">
                    <option value={null} default>Select Department</option>
                    {basicInformation?.institute != 'undefined' && departments?.isSuccess && departments?.data?.departments?.map(department => (<option key={department._id} value={department._id}>{department.name}</option>))}
                </SelectInput>
                <div className="flex justify-end items-center">
                    <Button
                        disabled={!isChanged || updateProfile.isPending}
                        isLoading={updateProfile.isPending}
                        icon={<IoMdPerson />}
                        label='Change'
                        className='bg-primary text-white disabled:bg-gray-600' />
                </div>
            </form>
        </Warper>
    )
}