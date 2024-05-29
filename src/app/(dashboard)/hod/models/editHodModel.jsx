import { useEffect, useState } from "react"
import toast from "react-hot-toast"

// icons
import { MdDelete } from "react-icons/md"

// components
import InputField from "@/components/shared/inputField"
import Button from "@/components/shared/button"
import SideModel from "@/components/models/sideModel"

// validator
import phoneValidator from "@/services/validator/phone"
import isEmpty from "@/services/validator/isEmpty"
import emailValidator from "@/services/validator/email"
import SelectInput from "@/components/shared/selectInput"

// network
import { useGetAllInstitutes, useGetDepartments } from "../../institutes/services/query"
import { useEditHodAccount } from "../services/mutation"

export default function EditHodModel({ data, setData, currentUserData, setHodDeleteModel }) {
    const [isChanged, setIsChanged] = useState(false)
    const [hod, setHod] = useState({ name: '', employeeNumber: '', email: '', phoneNumber: '', designation: '', institute: 'Select Institute', department: 'Select Department' })
    const institutes = useGetAllInstitutes()
    const departments = useGetDepartments(hod.institute, hod.institute !== undefined && hod.institute !== 'Select Institute' ? true : false)
    const editHodAccount = useEditHodAccount()

    useEffect(() => {
        setHod({
            name: currentUserData?.name,
            employeeNumber: currentUserData?.employeeCode,
            email: currentUserData?.email,
            phoneNumber: currentUserData?.mobileNumber,
            designation: currentUserData?.designation,
            institute: currentUserData?.institute?._id,
            department: currentUserData?.department?._id
        })
    }, [currentUserData])

    useEffect(() => {
        if (hod.name != currentUserData?.name ||
            hod.employeeNumber != currentUserData?.employeeCode ||
            hod.email != currentUserData?.email ||
            hod.phoneNumber != currentUserData?.mobileNumber ||
            hod.designation != currentUserData?.designation ||
            hod.institute != currentUserData?.institute?._id ||
            hod.department != currentUserData?.department?._id) {
            setIsChanged(true)
        } else {
            setIsChanged(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hod])


    const handleFormSubmit = e => {
        e.preventDefault()

        try {
            const { name, employeeNumber, email, phoneNumber, designation, institute, department } = hod
            const nameCheck = isEmpty(name)
            const employeeNumberCheck = isEmpty(employeeNumber)
            const emailCheck = emailValidator(email)
            const phoneCheck = phoneValidator(phoneNumber)
            const designationCheck = isEmpty(designation)
            const instituteCheck = isEmpty(institute)
            const departmentCheck = isEmpty(department)

            if (nameCheck && employeeNumberCheck && emailCheck && phoneCheck && designationCheck && instituteCheck && departmentCheck) {
                const data = {
                    payload: {
                        ...(currentUserData.name !== name && { name: name.trim() }),
                        ...(currentUserData.employeeCode !== employeeNumber && { employeeCode: employeeNumber }),
                        ...(currentUserData.email !== email && { email }),
                        ...(currentUserData.mobileNumber !== phoneNumber && { mobileNumber: phoneNumber }),
                        ...(currentUserData.designation !== designation && { designation }),
                        ...(currentUserData.institute._id !== institute && { institute }),
                        ...(currentUserData.department._id !== department) && { department }
                    },
                    id: currentUserData._id
                }
                editHodAccount.mutate(data, {
                    onSuccess: () => {
                        setData(false)
                    }
                })
            }

        } catch (error) {
            if (error.code === 'EMPTY')
                return toast.error('All fields are required')
            return toast.error(error.message)
        }
    }

    return (
        <SideModel toggle={data} setToggle={() => setData(!data)} >
            <form onSubmit={handleFormSubmit} className="px-5 py-7 sm:p-6 overflow-x-scroll h-full flex justify-between flex-col" noValidate>
                <div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-title-24 mb-4">Edit Hod</h1>
                        <div onClick={() => {
                            setData(false)
                            setHodDeleteModel(true)
                        }} className="p-2 cursor-pointer hover:bg-opacity-10 hover:bg-secondary rounded-md transition-all duration-150">
                            <MdDelete className="text-2xl !text-secondary" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <InputField onChange={e => setHod({
                            ...hod,
                            name: e.target.value
                        })}
                            value={hod.name}
                            className='min-w-full'
                            title='Name' />

                        <InputField onChange={e => setHod({
                            ...hod,
                            employeeNumber: e.target.value
                        })}
                            value={hod.employeeNumber}
                            className='min-w-full'
                            title='Employee Number' />

                        <InputField onChange={e => setHod({
                            ...hod,
                            email: e.target.value
                        })}
                            value={hod.email}
                            className='min-w-full'
                            title='Email' />

                        <InputField onChange={e => setHod({
                            ...hod,
                            phoneNumber: e.target.value
                        })}
                            value={hod.phoneNumber}
                            type='tel'
                            className='min-w-full'
                            prefix={'+91'}
                            title='Phone Number' />

                        <InputField onChange={e => setHod({
                            ...hod,
                            designation: e.target.value
                        })}
                            value={hod.designation}
                            className='min-w-full'
                            title='Designation' />

                        <SelectInput
                            title='Institute'
                            value={hod.institute}
                            onChange={e => setHod({ ...hod, institute: e.target.value })}
                            className="w-full sm:max-w-[330px] truncate">
                            <option value={null} default>Select Institute</option>
                            {institutes.isSuccess && institutes.data.institutes.map(institute => (<option key={institute._id} value={institute._id}>{institute.name}</option>))}
                        </SelectInput>

                        <SelectInput
                            disabled={hod.institute === ''}
                            title='Department'
                            value={hod.department}
                            onChange={e => setHod({ ...hod, department: e.target.value })}
                            className="w-full sm:max-w-[330px] truncate">
                            <option value={null} default>Select Department</option>
                            {hod.institute != 'undefined' && departments.isSuccess && departments.data.departments.map(department => (<option key={department._id} value={department._id}>{department.name}</option>))}
                        </SelectInput>
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-5 mt-5">
                    <Button
                        type="button"
                        label='Cancel'
                        className='min-w-full'
                        onClick={() => setData(false)} />

                    <Button
                        label='Edit'
                        disabled={!isChanged || editHodAccount.isPending}
                        isLoading={editHodAccount.isPending}
                        className='min-w-full bg-primary text-white' />
                </div>
            </form>
        </SideModel>
    )
}