'use client';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import InputField from "@/components/shared/inputField";
import emailValidator from "@/services/validator/email";
import CustomError from "@/services/customError";
import Button from "@/components/shared/button";
import { MdModeEditOutline } from "react-icons/md";
import EmailOtpConfirmationModel from "../models/emailOtpConfirmationModel";

export default function ChangeEmail() {
    const [email, setEmail] = useState('')
    const [isChanged, setIsChanged] = useState(false)
    const [confirmOtpModel, setConfirmOtpModel] = useState(false)

    const handleFormSubmit = (e) => {
        e.preventDefault()

        try {
            const emailValidate = emailValidator(email)
            if (emailValidate) {
                console.log('all done');
                setConfirmOtpModel(true)
            }
        } catch (error) {
            if (error.code === 'EMPTY')
                return toast.error('Empty fields are not allowed')
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (email === 'd23dcs157@charusat.edu.in' || email === '') {
            setIsChanged(false)
        } else {
            setIsChanged(true)
        }
    }, [email])
    return (
        <>
            <form onSubmit={handleFormSubmit} className="bg-white rounded-md shadow-sm p-4 pt-0 divide-y-1 w-full sm:max-w-[400px]" noValidate>
                <div className="py-3">Email Address.</div>
                <div className="py-3 flex flex-col gap-4 w-full">
                    <InputField
                        title='Current Email'
                        placeholder='example@example.com'
                        className='w-full truncate'
                        type='email'
                        disabled
                        value='d23dcs157@charusat.edu.in'
                        onChange={e => setEmail(e.target.value)} />
                    <InputField
                        title='New Email'
                        placeholder='example@example.com'
                        className='w-full truncate'
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    {
                        isChanged &&
                        <div className="flex justify-end items-center">
                            <Button
                                icon={<MdModeEditOutline />}
                                label='Change'
                                className='bg-primary text-white' />
                        </div>
                    }
                </div>
            </form>
            <EmailOtpConfirmationModel data={confirmOtpModel} setData={setConfirmOtpModel} />
        </>
    )
}