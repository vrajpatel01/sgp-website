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

export default function BasicInformation() {
    const [isChanged, setIsChanged] = useState(false)
    const [basicInformation, setBasicInformation] = useState({
        name: 'Vraj Patel',
        phoneNumber: '6353101020',
        employeeCode: 'VRAJ157',
        institute: '664ca80d22ef7a463549dafd',
        department: '6650c5c0afc056a44068e057'
    })
    const institutes = useGetAllInstitutes()
    const departments = useGetDepartments(basicInformation.institute, basicInformation.institute !== '' && basicInformation.institute !== 'Select Institute' ? true : false)

    const handleFormSubmit = (e) => {
        e.preventDefault()
        try {
            const { name, phoneNumber, employeeCode } = basicInformation
            const nameValidate = isEmpty(name)
            const phoneValidate = phoneValidator(phoneNumber)
            const employeeCodeValidate = isEmpty(employeeCode)

            if (nameValidate && phoneValidate && employeeCodeValidate) {
                console.log('all done');
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
        <form onSubmit={handleFormSubmit} className="bg-white rounded-md shadow-sm p-4 pt-0 divide-y-1 w-full sm:max-w-[400px]" noValidate>
            <div className="py-3">Personal information.</div>
            <div className="py-3 flex flex-col gap-4">
                <InputField
                    title='Name'
                    placeholder='John Doe'
                    className='w-full truncate'
                    value={basicInformation.name}
                    onChange={e => setBasicInformation({ ...basicInformation, name: e.target.value })} />
                <InputField
                    title='Employee Code'
                    placeholder='EMP49347'
                    className='w-full truncate'
                    value={basicInformation.employeeCode}
                    onChange={e => setBasicInformation({ ...basicInformation, employeeCode: e.target.value })} />
                <InputField
                    title='Mobile Number'
                    placeholder='1234567890'
                    className='w-full truncate'
                    type='number'
                    value={basicInformation.phoneNumber}
                    onChange={e => setBasicInformation({ ...basicInformation, phoneNumber: e.target.value })} />
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
                    {basicInformation.institute != 'undefined' && departments.isSuccess && departments.data.departments.map(department => (<option key={department._id} value={department._id}>{department.name}</option>))}
                </SelectInput>
                {
                    isChanged &&
                    <div className="flex justify-end items-center">
                        <Button
                            icon={<MdModeEditOutline />}
                            label='Change'
                            className='bg-primary text-white' />
                    </div>
                }
            </div>
        </form>
    )
}