"use client";
import { useState } from "react";
import toast from "react-hot-toast"

// components
import InputField from "@/components/shared/inputField"
import Button from "@/components/shared/button"

// validator
import passwordValidator from "@/lib/validator/password";

export default function ResetPasswordScreen() {
    const [userInput, setUserInput] = useState({
        password: '',
        confirmPassword: ''
    })

    const onResetPasswordFormSubmit = (e) => {
        e.preventDefault()
        try {
            let validatePassword = passwordValidator(userInput.password, userInput.confirmPassword)

            if (validatePassword) {
                console.log('all done.');
            }
        } catch (error) {
            if (error.code === 'EMPTY')
                return toast.error('All fields are required.')
            toast.error(error.message)
        }
    }
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-title-28">Reset Password</h1>
            <form onSubmit={onResetPasswordFormSubmit} className="gap-3 flex flex-col">
                <InputField
                    id="password"
                    className="w-full sm:min-w-[300px]"
                    title='Password'
                    placeholder="•••••••••"
                    type="password"
                    value={userInput.password}
                    onChange={(e) => setUserInput({
                        ...userInput,
                        password: e.target.value
                    })} />
                <InputField
                    id="ConfirmPassword"
                    className="w-full sm:min-w-[300px]"
                    title='Confirm Password'
                    placeholder="•••••••••"
                    value={userInput.confirmPassword}
                    type="password"
                    onChange={(e) => setUserInput({
                        ...userInput,
                        confirmPassword: e.target.value
                    })} />
                <Button disabled={false}
                    width={300}
                    label="Reset"
                    className='bg-primary-text text-white w-full' />
            </form>
        </div>
    );
}