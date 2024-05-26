import { useState, useEffect } from "react"
import toast from "react-hot-toast"

// components
import InputField from "@/components/shared/inputField"
import Button from "@/components/shared/button"
import SideModel from "@/components/models/sideModel"


// validator
import phoneValidator from "@/services/validator/phone"
import isEmpty from "@/services/validator/isEmpty"
import emailValidator from "@/services/validator/email"
import numberValidator from "@/services/validator/number"
import SelectInput from "@/components/shared/selectInput"
import { useGetAllInstitutes, useGetDepartments } from "../../institutes/services/query"
import CustomError from "@/services/customError"
import { useAddStudent } from "../services/mutation"

export default function AddStudentModel({ data, setData }) {
    const [student, setStudent] = useState({ name: '', rollNumber: '', email: '', phoneNumber: '', institute: '', department: '', semester: '', division: '' })

    const institutes = useGetAllInstitutes()
    const departments = useGetDepartments(student.institute, student.institute !== '' && student.institute !== 'Select Institute' ? true : false)
    const addStudent = useAddStudent()

    const handleStudentAdd = (e) => {
        e.preventDefault()
        try {
            const name = isEmpty(student.name)
            const rollNum = isEmpty(student.rollNumber)
            const email = emailValidator(student.email)
            const phone = phoneValidator(student.phoneNumber)
            const institute = isEmpty(student.institute)
            const department = isEmpty(student.department)
            const semester = numberValidator(student.semester, 'semester')
            const division = isEmpty(student.division)

            if (student.institute === 'Select Institute' ||
                student.department === 'Select Department' ||
                student.semester === 'Select Semester') {
                throw new CustomError('All fields are required.', 'EMPTY')
            }

            if (name && rollNum && email && phone && institute && department && semester && division) {
                const data = {
                    ...student,
                    division: student.division.toLowerCase(),
                    semester: parseInt(student.semester),
                    name: student.name.toLowerCase().trim(),
                    rollNumber: student.rollNumber.toLowerCase().trim()
                }

                addStudent.mutate(data)
            }
        } catch (error) {
            if (error.code == 'EMPTY')
                return toast.error('All fields are required.')
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (addStudent.isSuccess) {
            setStudent({ name: '', rollNumber: '', email: '', phoneNumber: '', institute: '', department: '', semester: '', division: '' })
            setData(false)
        }
    }, [addStudent.isSuccess, setData]);
    return (
        <SideModel toggle={data} setToggle={() => setData(!data)} >
            <form onSubmit={handleStudentAdd} className="px-5 py-7 sm:p-6 overflow-x-scroll h-full flex justify-between flex-col" noValidate>
                <div>
                    <h1 className="text-title-24 mb-4">Add Student</h1>
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
                            prefix={'+91'}
                            title='Phone Number' />

                        <SelectInput
                            required
                            title='Institute'
                            onChange={e => setStudent({ ...student, institute: e.target.value })}
                            className="w-full sm:max-w-[330px] truncate">
                            <option value={null} default>Select Institute</option>
                            {institutes.isSuccess && institutes.data.institutes.map(institute => (<option key={institute._id} value={institute._id}>{institute.name}</option>))}
                        </SelectInput>

                        <SelectInput
                            required
                            disabled={student.institute === ''}
                            title='Department'
                            onChange={e => setStudent({ ...student, department: e.target.value })}
                            className="w-full sm:max-w-[330px] truncate">
                            <option value={null} default>Select Department</option>
                            {student.institute != 'undefined' && departments.isSuccess && departments.data.departments.map(department => (<option key={department._id} value={department._id}>{department.name}</option>))}
                        </SelectInput>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <SelectInput
                                required
                                title='Semester'
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
        </SideModel >
    )
}