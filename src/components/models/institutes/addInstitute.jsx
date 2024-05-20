import { useState } from "react"
import toast from "react-hot-toast"

// components
import InputField from "@/components/shared/inputField"
import Button from "@/components/shared/button"
import PopUpModel from "../popUpModel"

// validator
import isEmpty from "@/lib/validator/isEmpty"

export default function AddInstitute({ data, setData }) {
    const [institute, setInstitute] = useState('')

    const handleStudentAdd = (e) => {
        e.preventDefault()
        try {
            const instituteCheck = isEmpty(institute)

            if (instituteCheck) {
                console.log('done');
            }

        } catch (error) {
            if (error.code == 'EMPTY')
                return toast.error('All fields are required.')
            toast.error(error.message)
        }
    }
    return (
        <PopUpModel toggle={data} setToggle={() => setData(!data)}>
            <form onSubmit={handleStudentAdd} className="flex flex-col gap-4" noValidate>
                <h1 className="text-title-24">Add Institute</h1>
                <InputField
                    value={institute}
                    onChange={e => setInstitute(e.target.value)}
                    label='Name'
                    placeholder='Institute Name'
                    className='min-w-full sm:min-w-[300px]'
                />
                <div className="flex justify-end gap-2">
                    <Button
                        label='Cancel'
                        onClick={() => {
                            setInstitute('')
                            setData(false)
                        }}
                        type="button"
                        className='!rounded-full'
                    />
                    <Button
                        label='Add Institute'
                        onClick={() => { }}
                        className='bg-primary text-white !rounded-full whitespace-nowrap'
                    />
                </div>
            </form>
        </PopUpModel>
    )
}