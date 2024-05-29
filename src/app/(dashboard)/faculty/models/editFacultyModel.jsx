import { useEffect, useState } from "react"
import toast from "react-hot-toast"

// icons
import { MdDelete } from "react-icons/md"

// components
import InputField from "@/components/shared/inputField"
import Button from "@/components/shared/button"
import SideModel from "@/components/models/sideModel"
import SelectInput from "@/components/shared/selectInput"


// validator
import phoneValidator from "@/services/validator/phone"
import isEmpty from "@/services/validator/isEmpty"
import emailValidator from "@/services/validator/email"

// network
import { useEditFacultyAccount } from "../services/mutation"
import { useGetAllInstitutes, useGetDepartments } from "../../institutes/services/query"

export default function EditFacultyModel({ data, setData, currentUserData, setFacultyDeleteModel }) {
    const [isChanged, setIsChanged] = useState(false)
    const [faculty, setFaculty] = useState({ name: '', employeeNumber: '', email: '', phoneNumber: '', designation: '', institute: 'Select Institute', department: 'Select Department', subjectCode: '', subjectName: '' })
    const institutes = useGetAllInstitutes()
    const departments = useGetDepartments(faculty.institute, faculty.institute !== undefined && faculty.institute !== 'Select Institute' ? true : false)
    const editAccount = useEditFacultyAccount()

    useEffect(() => {
        setFaculty({
            name: currentUserData?.name,
            employeeNumber: currentUserData?.employeeCode,
            email: currentUserData?.email,
            phoneNumber: currentUserData?.mobileNumber,
            designation: currentUserData?.designation,
            institute: currentUserData?.institute?._id,
            department: currentUserData?.department?._id,
            subjectCode: currentUserData?.subjectCode,
            subjectName: currentUserData?.subjectName
        })
    }, [currentUserData])

    useEffect(() => {
        if (faculty.name !== currentUserData?.name ||
            faculty.employeeNumber !== currentUserData?.employeeCode ||
            faculty.email !== currentUserData?.email ||
            faculty.phoneNumber !== currentUserData?.mobileNumber ||
            faculty.designation !== currentUserData?.designation ||
            faculty.institute !== currentUserData?.institute?._id ||
            faculty.department !== currentUserData?.department?._id ||
            faculty.subjectCode !== currentUserData?.subjectCode ||
            faculty.subjectName !== currentUserData?.subjectName) {
            setIsChanged(true)
        } else {
            setIsChanged(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [faculty])


    const handleFormSubmit = e => {
        e.preventDefault()

        try {
            const { name, employeeNumber, email, phoneNumber, designation, institute, department, subjectCode, subjectName } = faculty
            const nameCheck = isEmpty(name)
            const employeeNumberCheck = isEmpty(employeeNumber)
            const emailCheck = emailValidator(email)
            const phoneCheck = phoneValidator(phoneNumber)
            const designationCheck = isEmpty(designation)
            const instituteCheck = isEmpty(institute)
            const departmentCheck = isEmpty(department)
            const subjectCodeCheck = isEmpty(subjectCode)
            const subjectNameCheck = isEmpty(subjectName)

            if (nameCheck && employeeNumberCheck && emailCheck && phoneCheck && designationCheck && instituteCheck && departmentCheck && subjectCodeCheck && subjectNameCheck) {
                const data = {
                    payload: {
                        ...(currentUserData.name !== name && { name: name.trim() }),
                        ...(currentUserData.employeeCode !== employeeNumber && { employeeCode: employeeNumber.trim() }),
                        ...(currentUserData.email !== email && { email }),
                        ...(currentUserData.mobileNumber !== phoneNumber && { mobileNumber: phoneNumber }),
                        ...(currentUserData.designation !== designation && { designation: designation.trim() }),
                        ...(currentUserData.institute._id !== institute && { institute }),
                        ...(currentUserData.department._id !== department) && { department },
                        ...(currentUserData.subjectCode !== subjectCode && { subjectCode: subjectCode.trim() }),
                        ...(currentUserData.subjectName !== subjectName && { subjectName: subjectName.trim() })
                    },
                    id: currentUserData._id
                }
                editAccount.mutate(data, {
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
                        <h1 className="text-title-24 mb-4">Edit Faculty</h1>
                        <div onClick={() => {
                            setData(false)
                            setFacultyDeleteModel(true)
                        }} className="p-2 cursor-pointer hover:bg-opacity-10 hover:bg-secondary rounded-md transition-all duration-150">
                            <MdDelete className="text-2xl !text-secondary" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <InputField onChange={e => setFaculty({
                            ...faculty,
                            name: e.target.value
                        })}
                            value={faculty.name}
                            className='min-w-full'
                            title='Name' />

                        <InputField onChange={e => setFaculty({
                            ...faculty,
                            employeeNumber: e.target.value
                        })}
                            value={faculty.employeeNumber}
                            className='min-w-full'
                            title='Employee Number' />

                        <InputField onChange={e => setFaculty({
                            ...faculty,
                            email: e.target.value
                        })}
                            value={faculty.email}
                            className='min-w-full'
                            title='Email' />

                        <InputField onChange={e => setFaculty({
                            ...faculty,
                            phoneNumber: e.target.value
                        })}
                            value={faculty.phoneNumber}
                            type='tel'
                            className='min-w-full'
                            prefix={'+91'}
                            title='Phone Number' />

                        <InputField onChange={e => setFaculty({
                            ...faculty,
                            designation: e.target.value
                        })}
                            value={faculty.designation}
                            className='min-w-full'
                            title='Designation' />

                        <SelectInput
                            title='Institute'
                            value={faculty.institute}
                            onChange={e => setFaculty({ ...faculty, institute: e.target.value })}
                            className="w-full sm:max-w-[330px] truncate">
                            <option value={null} default>Select Institute</option>
                            {institutes.isSuccess && institutes.data.institutes.map(institute => (<option key={institute._id} value={institute._id}>{institute.name}</option>))}
                        </SelectInput>

                        <SelectInput
                            disabled={faculty.institute === ''}
                            title='Department'
                            value={faculty.department}
                            onChange={e => setFaculty({ ...faculty, department: e.target.value })}
                            className="w-full sm:max-w-[330px] truncate">
                            <option value={null} default>Select Department</option>
                            {faculty.institute != 'undefined' && departments.isSuccess && departments.data.departments.map(department => (<option key={department._id} value={department._id}>{department.name}</option>))}
                        </SelectInput>

                        <InputField onChange={e => setFaculty({
                            ...faculty,
                            subjectCode: e.target.value
                        })}
                            value={faculty.subjectCode}
                            className='min-w-full'
                            title='Subject Code' />

                        <InputField onChange={e => setFaculty({
                            ...faculty,
                            subjectName: e.target.value
                        })}
                            value={faculty.subjectName}
                            className='min-w-full'
                            title='Subject Name' />
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
                        disabled={editAccount.isPending || !isChanged}
                        isLoading={editAccount.isPending}
                        className='min-w-full bg-primary text-white' />
                </div>
            </form>
        </SideModel>
    )
}