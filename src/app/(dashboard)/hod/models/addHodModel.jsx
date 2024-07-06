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

// network
import { useGetAllInstitutes, useGetDepartments } from "../../institutes/services/query"
import { useAddHod } from "../services/mutation"

export default function AddHodModel({ data, setData }) {
    const [hod, setHod] = useState({ name: '', employeeNumber: '', email: '', phoneNumber: '', designation: '', institute: 'Select Institute', department: 'Select Department' })
    const institutes = useGetAllInstitutes()
    const departments = useGetDepartments(hod.institute, hod.institute !== '' && hod.institute !== 'Select Institute' ? true : false)
    const addHod = useAddHod()

    const handleStudentAdd = (e) => {
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

            if (hod.institute === 'Select Institute' ||
                hod.department === 'Select Department') {
                throw new CustomError('All fields are required.', 'EMPTY')
            }


            if (nameCheck && employeeNumberCheck && emailCheck && phoneCheck && designationCheck && instituteCheck && departmentCheck) {
                const data = {
                    ...hod,
                    name: hod.name.toLowerCase().trim(),
                    employeeCode: hod.employeeNumber.toLowerCase().trim(),
                    mobileNumber: hod.phoneNumber.toLowerCase().trim(),
                    designation: hod.designation.toLowerCase().trim(),
                    institute,
                    department,
                    subjectCode: 'ddfdsf',
                    subjectName: 'dfdf'
                }

                addHod.mutate(data)
            }


        } catch (error) {
            if (error.code == 'EMPTY')
                return toast.error('All fields are required.')
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (addHod.isSuccess) {
            setHod({ name: '', employeeNumber: '', email: '', phoneNumber: '', designation: '', institute: '', department: '' })
            setData(false)
        }
    }, [addHod.isSuccess, setData])
    return (
        <SideModel toggle={data} setToggle={() => setData(!data)} >
            <form onSubmit={handleStudentAdd} className="px-5 py-7 sm:p-6 overflow-x-scroll h-full flex justify-between flex-col" noValidate>
                <div>
                    <h1 className="text-title-24 mb-4">Add Hod</h1>
                    <div className="flex flex-col gap-3">
                        <InputField onChange={e => setHod({
                            ...hod,
                            name: e.target.value
                        })}
                            required
                            value={hod.name}
                            className='min-w-full'
                            title='Name' />

                        <InputField onChange={e => setHod({
                            ...hod,
                            employeeNumber: e.target.value
                        })}
                            required
                            value={hod.employeeNumber}
                            className='min-w-full'
                            title='Employee Number' />

                        <InputField onChange={e => setHod({
                            ...hod,
                            email: e.target.value
                        })}
                            required
                            value={hod.email}
                            className='min-w-full'
                            title='Email' />

                        <InputField onChange={e => setHod({
                            ...hod,
                            phoneNumber: e.target.value
                        })}
                            required
                            value={hod.phoneNumber}
                            type='tel'
                            className='min-w-full'
                            prefix={'+91'}
                            title='Phone Number' />

                        <InputField onChange={e => setHod({
                            ...hod,
                            designation: e.target.value
                        })}
                            required
                            value={hod.designation}
                            className='min-w-full'
                            title='Designation' />

                        <SelectInput
                            required
                            title='Institute'
                            onChange={e => setHod({ ...hod, institute: e.target.value })}
                            value={hod.institute}
                            className="w-full truncate">
                            <option value={null} default>Select Institute</option>
                            {institutes.isSuccess && institutes.data.institutes.map(institute => (<option key={institute._id} value={institute._id}>{institute.name}</option>))}
                        </SelectInput>

                        <SelectInput
                            required
                            disabled={hod.institute === ''}
                            title='Department'
                            onChange={e => setHod({ ...hod, department: e.target.value })}
                            value={hod.department}
                            className="w-full truncate">
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
                        label='Add Hod'
                        disabled={addHod.isPending}
                        isLoading={addHod.isPending}
                        className='min-w-full bg-primary text-white' />
                </div>
            </form>
        </SideModel>
    )
}