'use client';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import InputField from "@/components/shared/inputField";
import emailValidator from "@/services/validator/email";
import CustomError from "@/services/customError";
import Button from "@/components/shared/button";
import { MdAlternateEmail, MdModeEditOutline } from "react-icons/md";
import EmailOtpConfirmationModel from "../models/emailOtpConfirmationModel";
import { Warper } from "./warper";
import { useUpdateProfile } from "../services/mutation";

export default function ChangeEmail() {
    const changeEmail = useUpdateProfile();
    const [email, setEmail] = useState('')
    const [isChanged, setIsChanged] = useState(false)
    const [confirmOtpModel, setConfirmOtpModel] = useState(false)

    const handleFormSubmit = (e) => {
        e.preventDefault()

        try {
            const emailValidate = emailValidator(email)
            if (emailValidate) {
                changeEmail.mutate({ email }, {
                    onSuccess: (data) => {
                        console.log(data);
                        setConfirmOtpModel(true)
                    },
                    onError: (error) => {
                        console.log(error);
                    }
                })
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
        <div>
            <Warper title='Personal Information' description="You can update your personal information from here.">
                <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
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
                    <div className="flex justify-end items-center">
                        <Button
                            disabled={!isChanged || changeEmail.isPending}
                            icon={<MdAlternateEmail />}
                            label='Change'
                            isLoading={changeEmail.isPending}
                            className='bg-primary text-white disabled:bg-gray-600' />
                    </div>
                </form>
            </Warper>
            <EmailOtpConfirmationModel data={confirmOtpModel} setData={setConfirmOtpModel} />
        </div>
    )
}