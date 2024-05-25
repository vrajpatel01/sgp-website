"use client";
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react";
import toast from "react-hot-toast"

// components
import InputField from "@/components/shared/inputField"
import Button from "@/components/shared/button"

// models
import PopUpModel from "@/components/models/popUpModel"

// validator
import isEmpty from "@/services/validator/isEmpty";

// network
import { useAddInstitute } from "../../services/mutation";

export default function AddInstituteModel({ data, setData }) {
    const [institute, setInstitute] = useState('')
    const { data: session, loading } = useSession()

    const addInstitute = useAddInstitute()

    useEffect(() => {
        if (addInstitute.isSuccess) {
            setData(false);
            setInstitute('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addInstitute.isSuccess]);

    const handleStudentAdd = (e) => {
        e.preventDefault()
        try {
            const instituteCheck = isEmpty(institute)

            if (instituteCheck) {
                addInstitute.mutate(institute)
            }
        } catch (error) {
            if (error.code == 'EMPTY')
                return toast.error('Institute name is required')
            toast.error(error.message)
        }
    }

    if (loading) return null

    return (
        <PopUpModel toggle={data} setToggle={() => setData(!data)}>
            <form onSubmit={handleStudentAdd} className="flex flex-col gap-4" noValidate>
                <h1 className="text-title-24">Add Institute</h1>
                <InputField
                    value={institute}
                    onChange={e => setInstitute(e.target.value)}
                    label='Name'
                    disabled={addInstitute.isPending}
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
                        disabled={addInstitute.isPending}
                        type="button"
                        className='!rounded-full w-full sm:min-w-[130px]'
                    />
                    <Button
                        label='Add Institute'
                        disabled={addInstitute.isPending}
                        isLoading={addInstitute.isPending}
                        className='bg-primary text-white !rounded-full whitespace-nowrap w-full sm:min-w-[130px] disabled:bg-opacity-90'
                    />
                </div>
            </form>
        </PopUpModel>
    )
}