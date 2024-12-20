'use client';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import InputField from "@/components/shared/inputField";
import emailValidator from "@/services/validator/email";
import CustomError from "@/services/customError";
import { Button } from "@/components/ui/button";
import { MdAlternateEmail, MdModeEditOutline } from "react-icons/md";
import EmailOtpConfirmationModel from "../models/emailOtpConfirmationModel";
import { Warper } from "./warper";
import { useUpdateProfile } from "../services/mutation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog } from "@/components/ui/dialog";

export default function ChangeEmail({ currentEmail }) {
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
                        setConfirmOtpModel(true)
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
        if (email === currentEmail || email === '') {
            setIsChanged(false)
        } else {
            setIsChanged(true)
        }
    }, [currentEmail, email])
    return (
        <div>
            <Warper title='Personal Information' description="You can update your personal information from here.">
                <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                    <div>
                        <Label htmlFor="currentEmail">curren email</Label>
                        <Input
                            placeholder='example@example.com'
                            id="currentEmail"
                            type='email'
                            disabled
                            value={currentEmail}
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="newEmail">new email</Label>
                        <Input
                            placeholder='example@example.com'
                            id="newEmail"
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="flex justify-end items-center">
                        <Button
                            disabled={!isChanged || changeEmail.isPending}
                            isLoading={changeEmail.isPending} >
                            Change
                        </Button>
                    </div>
                </form>
            </Warper>
            <Dialog open={confirmOtpModel} onOpenChange={setConfirmOtpModel}>
                <EmailOtpConfirmationModel data={confirmOtpModel} setData={setConfirmOtpModel} />
            </Dialog>
        </div>
    )
}