'use client'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/shared/button";
import InputField from "@/components/shared/inputField";
import { MdModeEditOutline } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { Warper } from "./warper";
import { useChangePassword } from "../services/mutation";
import passwordValidator from "@/services/validator/password";

export default function PasswordChange() {
    const changePassword = useChangePassword();
    const [isChanged, setIsChanged] = useState(false)
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const data = {
            currentPassword: password.currentPassword,
            newPassword: password.newPassword
        }
        try {
            const validatorPassword = passwordValidator(password.newPassword);

            if (validatorPassword && (password.newPassword === password.confirmPassword)) {
                changePassword.mutate(data, {
                    onSuccess: (data) => {
                        const { message, success } = data.data;
                        if (success) {
                            toast.success(message);
                            return setPassword({
                                currentPassword: '',
                                newPassword: '',
                                confirmPassword: ''
                            })
                        }
                        return toast.error(message)
                    },
                    onError: (error) => {
                        console.log(error);
                    }
                })
            }

        } catch (error) {
            return toast.error(error.message)
        }
    }

    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
            if (password.currentPassword === password.newPassword && password.newPassword.length > 0) {
                toast.error('New password can not be the same as the current password.')
                console.log('hello')
            }
        }, 1000)
        if (password.newPassword === password.confirmPassword &&
            password.newPassword.length > 0 && password.currentPassword.length > 0 &&
            password.currentPassword !== password.newPassword) {
            setIsChanged(true)
        } else {
            setIsChanged(false)
        }

        return () => clearTimeout(delayDebounceFn)
    }, [password])
    return (
        <Warper title='Personal Information' description="You can update your personal information from here.">
            <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                <div className="py-3 flex flex-col gap-4">
                    <InputField
                        title='Current Password'
                        placeholder='•••••••••'
                        className='w-full truncate'
                        value={password.currentPassword}
                        onChange={e => setPassword({ ...password, currentPassword: e.target.value })} />
                    <InputField
                        title='New Password'
                        placeholder='•••••••••'
                        className='w-full truncate'
                        value={password.newPassword}
                        onChange={e => setPassword({ ...password, newPassword: e.target.value })} />
                    <InputField
                        title='Confirm Password'
                        placeholder='•••••••••'
                        className='w-full truncate'
                        value={password.confirmPassword}
                        onChange={e => setPassword({ ...password, confirmPassword: e.target.value })} />
                    <div className="flex justify-end items-center">
                        <Button
                            disabled={!isChanged || changePassword.isPending}
                            icon={<IoLockClosed />}
                            isLoading={changePassword.isPending}
                            label='Change'
                            className='bg-primary text-white disabled:bg-gray-600' />
                    </div>
                </div>
            </form>
        </Warper>
    )
}