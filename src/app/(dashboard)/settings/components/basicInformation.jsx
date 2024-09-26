'use client';
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// network
import { useGetAllInstitutes, useGetDepartments } from "../../institutes/services/query";
import { Button } from "@/components/ui/button";
import isEmpty from "@/services/validator/isEmpty";
import { Warper } from "./warper";
import { IoMdPerson } from "react-icons/io";
import { useUpdateProfile } from "../services/mutation";

import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
                <div>
                    <Label htmlFor="name">name</Label>
                    <Input
                        value={basicInformation.name}
                        placeholder='name'
                        id="name"
                        onChange={e => setBasicInformation({ ...basicInformation, name: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="institute">institute</Label>
                    <Select id="institute" value={basicInformation.institute} onValueChange={(value) => setBasicInformation({ ...basicInformation, institute: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder="select institute" />
                        </SelectTrigger>
                        <SelectContent>
                            {institutes.isSuccess && institutes.data.institutes.map(institute => <SelectItem key={institute._id} value={institute._id} >{institute.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="department">department</Label>
                    <Select id="department" value={basicInformation.department} onValueChange={(value) => setBasicInformation({ ...basicInformation, department: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder="select department" />
                        </SelectTrigger>
                        <SelectContent>
                            {basicInformation?.institute != 'undefined' && departments?.isSuccess && departments?.data?.departments?.map(department => <SelectItem key={department._id} value={department._id} >{department.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end items-center">
                    <Button
                        disabled={!isChanged || updateProfile.isPending}
                        isLoading={updateProfile.isPending} >
                        <IoMdPerson />
                        Change
                    </Button>
                </div>
            </form>
        </Warper>
    )
}