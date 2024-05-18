"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";

// components
import InputField from "@/components/shared/inputField";
import Button from "@/components/shared/button";

// validators
import emailValidator from "@/lib/validator/email";

export default function SignUpScreen() {
    const [userEmail, setUserEmail] = useState('')
    const onSignUpFormSubmit = (e) => {
        e.preventDefault()
        try {
            let validateEmail = emailValidator(userEmail)

            if (validateEmail) {
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
            <form onSubmit={onSignUpFormSubmit} className="gap-3 flex flex-col" noValidate>
                <InputField
                    id="email"
                    className="w-full sm:min-w-[300px]"
                    title='Email'
                    placeholder="example@example.com"
                    type="email"
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)} />
                <Button disabled={false}
                    className="w-full sm:min-w-[300px]"
                    label="Sign Up"
                    className='bg-primary-text text-white w-full' />
                <div className="flex justify-center text-detail-14">
                    <span>Already have an account? <Link href="/auth/login" className="underline">Login</Link></span>
                </div>
            </form>
        </div>
    );
}