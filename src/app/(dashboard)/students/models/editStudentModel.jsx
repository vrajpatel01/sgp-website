import { useEffect, useState } from "react"
import toast from "react-hot-toast"

// components
import InputField from "@/components/shared/inputField"
import Button from "@/components/shared/button"
import SideModel from "@/components/models/sideModel"


// validator
import phoneValidator from "@/services/validator/phone"
import isEmpty from "@/services/validator/isEmpty"
import emailValidator from "@/services/validator/email"
import SelectInput from "@/components/shared/selectInput"
import { useGetAllInstitutes, useGetDepartments } from "../../institutes/services/query"
import { useEditFacultyAccount, useEditStudentAccount } from "../services/mutation"
import { MdDelete } from "react-icons/md"

export default function EditStudentModel({ data, setData, currentUserData, setStudentDeleteModel }) {
    const [isChanged, setIsChanged] = useState(false)
    const [student, setStudent] = useState({ name: '', rollNumber: '', email: '', phoneNumber: '', institute: '', department: '', semester: '', division: '' })

    const institutes = useGetAllInstitutes()
    const departments = useGetDepartments(student.institute, student.institute !== undefined && student.institute !== 'Select Institute' ? true : false)
    const editAccount = useEditStudentAccount()

    useEffect(() => {
        setStudent({
            name: currentUserData?.name,
            rollNumber: currentUserData?.rollNumber,
            email: currentUserData?.email,
            phoneNumber: currentUserData?.phoneNumber,
            institute: currentUserData?.institute?._id,
            department: currentUserData?.department?._id,
            semester: currentUserData?.semester,
            division: currentUserData?.division
        })
    }, [currentUserData])

    useEffect(() => {
        if (student.name !== currentUserData?.name ||
            student.rollNumber !== currentUserData?.rollNumber ||
            student.email !== currentUserData?.email ||
            student.phoneNumber !== currentUserData?.phoneNumber ||
            student.institute !== currentUserData?.institute?._id ||
            student.department !== currentUserData?.department?._id ||
            student.semester !== currentUserData?.semester ||
            student.division !== currentUserData?.division) {
            setIsChanged(true)
        } else {
            setIsChanged(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [student])


    const handleFormSubmit = e => {
        e.preventDefault()

        try {
            const { name, rollNumber, email, phoneNumber, designation, institute, department, division, semester } = student
            const nameCheck = isEmpty(name)
            const rollNumberCheck = isEmpty(rollNumber)
            const emailCheck = emailValidator(email)
            const phoneCheck = phoneValidator(phoneNumber)
            const instituteCheck = isEmpty(institute)
            const departmentCheck = isEmpty(department)
            const divisionCheck = isEmpty(division)
            const semesterCheck = isEmpty(semester)

            if (nameCheck && rollNumberCheck && emailCheck && phoneCheck && instituteCheck && departmentCheck && divisionCheck && semesterCheck) {
                const data = {
                    name: name.trim(),
                    rollNumber: rollNumber.trim(),
                    email,
                    phoneNumber: phoneNumber,
                    institute,
                    department,
                    semester,
                    division,
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
                        <h1 className="text-title-24 mb-4">Edit Student</h1>
                        <div onClick={() => {
                            setData(false)
                            setStudentDeleteModel(true)
                        }} className="p-2 cursor-pointer hover:bg-opacity-10 hover:bg-secondary rounded-md transition-all duration-150">
                            <MdDelete className="text-2xl !text-secondary" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <InputField onChange={e => setStudent({
                            ...student,
                            name: e.target.value
                        })}
                            required
                            value={student.name}
                            className='min-w-full'
                            title='Name' />

                        <InputField onChange={e => setStudent({
                            ...student,
                            rollNumber: e.target.value
                        })}
                            required
                            value={student.rollNumber}
                            className='min-w-full'
                            title='Roll Number' />

                        <InputField onChange={e => setStudent({
                            ...student,
                            email: e.target.value
                        })}
                            required
                            value={student.email}
                            className='min-w-full'
                            title='Email' />

                        <InputField onChange={e => setStudent({
                            ...student,
                            phoneNumber: e.target.value
                        })}
                            required
                            value={student.phoneNumber}
                            className='min-w-full'
                            type='tel'
                            prefix={'+91'}
                            title='Phone Number' />

                        <SelectInput
                            required
                            title='Institute'
                            value={student.institute}
                            onChange={e => setStudent({ ...student, institute: e.target.value })}
                            className="w-full sm:max-w-[330px] truncate">
                            <option value={null} default>Select Institute</option>
                            {institutes.isSuccess && institutes.data.institutes.map(institute => (<option key={institute._id} value={institute._id}>{institute.name}</option>))}
                        </SelectInput>

                        <SelectInput
                            required
                            disabled={student.institute === ''}
                            title='Department'
                            value={student.department}
                            onChange={e => setStudent({ ...student, department: e.target.value })}
                            className="w-full sm:max-w-[330px] truncate">
                            <option value={null} default>Select Department</option>
                            {student.institute != 'undefined' && departments.isSuccess && departments.data.departments.map(department => (<option key={department._id} value={department._id}>{department.name}</option>))}
                        </SelectInput>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <SelectInput
                                required
                                title='Semester'
                                value={student.semester}
                                onChange={e => setStudent({ ...student, semester: e.target.value })}
                                className="truncate min-w-full sm:max-w-[150px]">
                                <option value={undefined} default>Select Semester</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                            </SelectInput>

                            <InputField onChange={e => setStudent({
                                ...student,
                                division: e.target.value
                            })}
                                required
                                maxLength={1}
                                value={student.division}
                                className='min-w-full sm:max-w-[150px]'
                                title='Division' />
                        </div>
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-5 mt-5">
                    <Button
                        type="button"
                        label='Cancel'
                        className='min-w-full'
                        onClick={() => setData(false)} />

                    <Button
                        label='Add Student'
                        className='min-w-full bg-primary text-white' />
                </div>
            </form>
        </SideModel>
    )
}