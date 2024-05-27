'use client'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/shared/button";
import InputField from "@/components/shared/inputField";
import { MdModeEditOutline } from "react-icons/md";

export default function PasswordChange() {
    const [isChanged, setIsChanged] = useState(false)
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()
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
        <form onSubmit={handleFormSubmit} className="bg-white rounded-md shadow-sm p-4 pt-0 divide-y-1 w-full sm:max-w-[400px]" noValidate>
            <div className="py-3">Change Password.</div>
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
    )
}