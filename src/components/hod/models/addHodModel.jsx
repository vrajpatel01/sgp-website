import { useState } from "react"
import toast from "react-hot-toast"

// components
import InputField from "@/components/shared/inputField"
import Button from "@/components/shared/button"
import SideModel from "@/components/models/sideModel"

import phoneValidator from "@/lib/validator/phone"
import isEmpty from "@/lib/validator/isEmpty"
import emailValidator from "@/lib/validator/email"
import numberValidator from "@/lib/validator/number"

export default function AddHodModel({ data, setData }) {
    const [hod, setHod] = useState({
        name: '',
        employeeNumber: '',
        email: '',
        phoneNumber: '',
        designation: '',
        institute: '',
        department: '',
        subjectCode: '',
        subjectName: ''
    })

    const handleStudentAdd = (e) => {
        e.preventDefault()
        try {
            const { name, employeeNumber, email, phoneNumber, designation, institute, department, subjectCode, subjectName } = hod
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
                console.log('all done');
            }


        } catch (error) {
            if (error.code == 'EMPTY')
                return toast.error('All fields are required.')
            toast.error(error.message)
        }
    }
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
                            className='min-w-full sm:min-w-[300px]'
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

                        <InputField onChange={e => setHod({
                            ...hod,
                            institute: e.target.value
                        })}
                            required
                            value={hod.institute}
                            className='min-w-full'
                            title='Institute' />

                        <InputField onChange={e => setHod({
                            ...hod,
                            department: e.target.value
                        })}
                            required
                            value={hod.department}
                            className='min-w-full'
                            title='Department' />

                        <InputField onChange={e => setHod({
                            ...hod,
                            subjectCode: e.target.value
                        })}
                            required
                            value={hod.semester}
                            className='min-w-full'
                            title='Subject Code' />

                        <InputField onChange={e => setHod({
                            ...hod,
                            subjectName: e.target.value
                        })}
                            required
                            value={hod.division}
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
                        label='Add Hod'
                        className='min-w-full bg-primary text-white' />
                </div>
            </form>
        </SideModel>
    )
}