"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";

// components
import InputField from "@/components/shared/inputField";
import Button from "@/components/shared/button";

// validators
import emailValidator from "@/lib/validator/email";
import passwordValidator from "@/lib/validator/password";

export default function SignUpScreen() {
    const [userInput, setUserInput] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const onSignUpFormSubmit = (e) => {
        e.preventDefault()
        try {
            let validateEmail = emailValidator(userInput.email)
            let validatePassword = passwordValidator(userInput.password, userInput.confirmPassword)

            if (validateEmail && validatePassword) {
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
            <h1 className="text-title-28">Sign Up</h1>
            <form onSubmit={onSignUpFormSubmit} className="gap-3 flex flex-col">
                <InputField
                    id="email"
                    width="350px"
                    title='Email'
                    placeholder="example@example.com"
                    type="email"
                    value={userInput.email}
                    onChange={e => setUserInput({
                        ...userInput,
                        email: e.target.value
                    })} />
                <InputField
                    id="password"
                    width="350px"
                    title='Password'
                    placeholder="•••••••••"
                    type="password"
                    value={userInput.password}
                    onChange={e => setUserInput({
                        ...userInput,
                        password: e.target.value
                    })} />
                <InputField
                    id="confirmPassword"
                    width="350px"
                    title='Confirm Password'
                    placeholder="•••••••••"
                    type="password"
                    value={userInput.confirmPassword}
                    onChange={e => setUserInput({
                        ...userInput,
                        confirmPassword: e.target.value
                    })} />
                <Button width="350px" label="Sign Up" />
                <div className="flex justify-center text-detail-14">
                    <span>Already have an account? <Link href="/auth/login" className="underline">Login</Link></span>
                </div>
            </form>
        </div>
    );
}