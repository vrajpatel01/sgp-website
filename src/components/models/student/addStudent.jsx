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

export default function AddStudentModel({ addStudentModel, setAddStudentModel }) {
    const [student, setStudent] = useState({ name: '', rollNumber: '', email: '', phoneNumber: '', institute: '', department: '', semester: '', division: '' })

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

            if (name && rollNum && email && phone && institute && department && semester && division) {
                console.log('all done');
            }
        } catch (error) {
            if (error.code == 'EMPTY')
                return toast.error('All fields are required.')
            toast.error(error.message)
        }
    }
    return (
        <SideModel toggle={addStudentModel} setToggle={() => setAddStudentModel(!addStudentModel)} >
            <div className="flex flex-col h-full">
                <h1 className="text-title-24 mb-4">Add Student</h1>
                <form onSubmit={handleStudentAdd} className="flex flex-col justify-between h-full" noValidate>
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

                        <InputField onChange={e => setStudent({
                            ...student,
                            institute: e.target.value
                        })}
                            required
                            value={student.institute}
                            className='min-w-full'
                            title='Institute' />

                        <InputField onChange={e => setStudent({
                            ...student,
                            department: e.target.value
                        })}
                            required
                            value={student.department}
                            className='min-w-full'
                            title='Department' />

                        <div className="flex justify-center items-center gap-5">
                            <InputField onChange={e => setStudent({
                                ...student,
                                semester: e.target.value
                            })}
                                required
                                value={student.semester}
                                className='max-w-[150px]'
                                title='Semester' />

                            <InputField onChange={e => setStudent({
                                ...student,
                                division: e.target.value
                            })}
                                required
                                value={student.division}
                                className='max-w-[150px]'
                                title='Division' />
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-5">
                        <Button
                            type="button"
                            label='Cancel'
                            className='min-w-full'
                            onClick={() => setAddStudentModel(false)} />

                        <Button
                            label='Add Student'
                            className='min-w-full bg-primary text-white' />
                    </div>
                </form>
            </div>
        </SideModel>
    )
}