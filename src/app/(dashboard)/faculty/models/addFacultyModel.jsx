import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import CustomError from "@/services/customError"

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
import { useAddFaulty } from "../services/mutation"

export default function AddFacultyModel({ data, setData }) {
    const [faculty, setFaculty] = useState({
        name: '',
        employeeNumber: '',
        email: '',
        phoneNumber: '',
        designation: '',
        institute: 'Select Institute',
        department: 'Select Department',
        subjectCode: '',
        subjectName: ''
    })

    const institutes = useGetAllInstitutes()
    const departments = useGetDepartments(faculty.institute, faculty.institute !== '' && faculty.institute !== 'Select Institute' ? true : false)
    const addFaulty = useAddFaulty()

    const handleFacultyAdd = (e) => {
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

            if (faculty.institute === 'Select Institute' ||
                faculty.department === 'Select Department') {
                throw new CustomError('All fields are required.', 'EMPTY')
            }


            if (nameCheck && employeeNumberCheck && emailCheck && phoneCheck && designationCheck && instituteCheck && departmentCheck && subjectCodeCheck && subjectNameCheck) {
                const data = {
                    ...faculty,
                    name: faculty.name.toLowerCase().trim(),
                    employeeCode: faculty.employeeNumber.toLowerCase().trim(),
                    email: faculty.email.toLowerCase().trim(),
                    mobileNumber: faculty.phoneNumber.toLowerCase().trim(),
                    designation: faculty.designation.toLowerCase().trim(),
                    subjectCode: faculty.subjectCode.toLowerCase().trim(),
                    subjectName: faculty.subjectName.toLowerCase().trim()
                }
                addFaulty.mutate(data)
            }


        } catch (error) {
            if (error.code == 'EMPTY')
                return toast.error('All fields are required.')
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (addFaulty.isSuccess) {
            setFaculty({ name: '', employeeNumber: '', email: '', phoneNumber: '', designation: '', institute: 'Select Institute', department: 'Select Department', subjectCode: '', subjectName: '' })
            setData(false)
        }
    }, [addFaulty.isSuccess, setData])
    return (
        <SideModel toggle={data} setToggle={() => setData(!data)} >
            <form onSubmit={handleFacultyAdd} className="px-5 py-7 sm:p-6 overflow-x-scroll h-full flex justify-between flex-col" noValidate>
                <div>
                    <h1 className="text-title-24 mb-4">Add Faculty</h1>
                    <div className="flex flex-col gap-5">
                        <InputField onChange={e => setFaculty({
                            ...faculty,
                            name: e.target.value
                        })}
                            required
                            value={faculty.name}
                            className='min-w-full'
                            title='Name' />

                        <InputField onChange={e => setFaculty({
                            ...faculty,
                            employeeNumber: e.target.value
                        })}
                            required
                            value={faculty.employeeNumber}
                            className='min-w-full'
                            title='Employee Number' />

                        <InputField onChange={e => setFaculty({
                            ...faculty,
                            email: e.target.value
                        })}
                            required
                            value={faculty.email}
                            className='min-w-full'
                            title='Email' />

                        <InputField onChange={e => setFaculty({
                            ...faculty,
                            phoneNumber: e.target.value
                        })}
                            required
                            value={faculty.phoneNumber}
                            className='min-w-full'
                            prefix={'+91'}
                            title='Phone Number' />

                        <InputField onChange={e => setFaculty({
                            ...faculty,
                            designation: e.target.value
                        })}
                            required
                            value={faculty.designation}
                            className='min-w-full'
                            title='Designation' />

                        <SelectInput
                            required
                            title='Institute'
                            onChange={e => setFaculty({ ...faculty, institute: e.target.value })}
                            className="w-full sm:max-w-[330px] truncate">
                            <option value={null} default>Select Institute</option>
                            {institutes.isSuccess && institutes.data.institutes.map(institute => (<option key={institute._id} value={institute._id}>{institute.name}</option>))}
                        </SelectInput>

                        <SelectInput
                            required
                            disabled={faculty.institute === ''}
                            title='Department'
                            onChange={e => setFaculty({ ...faculty, department: e.target.value })}
                            className="w-full sm:max-w-[330px] truncate">
                            <option value={null} default>Select Department</option>
                            {faculty.institute != 'undefined' && departments.isSuccess && departments.data.departments.map(department => (<option key={department._id} value={department._id}>{department.name}</option>))}
                        </SelectInput>

                        <InputField onChange={e => setFaculty({
                            ...faculty,
                            subjectCode: e.target.value
                        })}
                            required
                            value={faculty.semester}
                            className='min-w-full'
                            title='Subject Code' />

                        <InputField onChange={e => setFaculty({
                            ...faculty,
                            subjectName: e.target.value
                        })}
                            required
                            value={faculty.division}
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
                        label='Add Faculty'
                        className='min-w-full bg-primary text-white' />
                </div>
            </form>
        </SideModel>
    )
}