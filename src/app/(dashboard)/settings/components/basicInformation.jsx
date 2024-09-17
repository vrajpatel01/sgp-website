'use client';
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// components
import InputField from "@/components/shared/inputField";
import SelectInput from "@/components/shared/selectInput";

// network
import { useGetAllInstitutes, useGetDepartments } from "../../institutes/services/query";
import Button from "@/components/shared/button";
import { MdModeEditOutline } from "react-icons/md";
import isEmpty from "@/services/validator/isEmpty";
import phoneValidator from "@/services/validator/phone";
import { Warper } from "./warper";
import { IoMdPerson } from "react-icons/io";
import { useUpdateProfile } from "../services/mutation";

export default function BasicInformation() {
    const updateProfile = useUpdateProfile();
    const [isChanged, setIsChanged] = useState(false)
    const [basicInformation, setBasicInformation] = useState({
        name: 'Vraj Patel',
        phoneNumber: '6353101020',
        employeeCode: 'VRAJ157',
        institute: '664ca80d22ef7a463549dafd',
        department: '6650c5c0afc056a44068e057'
    })
    const institutes = useGetAllInstitutes()
    const departments = useGetDepartments(basicInformation?.institute, basicInformation?.institute !== '' && basicInformation?.institute !== 'Select Institute' ? true : false)

    const handleFormSubmit = (e) => {
        e.preventDefault()
        try {
            const { name, phoneNumber, employeeCode } = basicInformation
            const nameValidate = isEmpty(name)
            const phoneValidate = phoneValidator(phoneNumber)
            const employeeCodeValidate = isEmpty(employeeCode)

            if (nameValidate && phoneValidate && employeeCodeValidate) {
                const data = {
                    name: basicInformation.name,
                    employeeCode: basicInformation.employeeCode,
                    mobileNumber: basicInformation.phoneNumber,
                    institute: basicInformation.institute,
                    department: basicInformation.department,
                }
                updateProfile.mutate(data, {
                    onSuccess: (data) => {
                        console.log(data);
                    },
                    onError: (error) => {
                        console.log(error);
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
        if (basicInformation.name !== 'Vraj Patel' ||
            basicInformation.phoneNumber !== '6353101020' ||
            basicInformation.employeeCode !== 'VRAJ157' ||
            basicInformation.institute !== '664ca80d22ef7a463549dafd' ||
            basicInformation.department !== '6650c5c0afc056a44068e057') {
            setIsChanged(true)
        } else {
            setIsChanged(false)
        }
    }, [basicInformation])
    return (
        <Warper title='Personal Information' description="You can update your personal information from here.">
            <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
                <InputField
                    value={basicInformation.name}
                    onChange={e => setBasicInformation({ ...basicInformation, name: e.target.value })}
                    className='text-sm w-full' title='Name' />
                <InputField
                    value={basicInformation.employeeCode}
                    onChange={e => setBasicInformation({ ...basicInformation, employeeCode: e.target.value })}
                    className='text-sm w-full' title='Employee Code' />
                <InputField
                    value={basicInformation.phoneNumber}
                    onChange={e => setBasicInformation({ ...basicInformation, phoneNumber: e.target.value })}
                    className='text-sm w-full' title='Mobile Number' />
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