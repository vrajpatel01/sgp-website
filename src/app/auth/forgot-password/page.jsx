"use client";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";

// components
import InputField from "@/components/shared/inputField";
import Button from "@/components/shared/button";

// validator
import emailValidator from "@/lib/validator/email";


export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const onForgotPasswordFormSubmit = (e) => {
        e.preventDefault();

        try {
            let validateEmail = emailValidator(email)
            if (validateEmail) {
                console.log('all done');
            }
        } catch (error) {
            if (error.code === 'EMPTY')
                return toast.error('Email fields are required.')
            toast.error(error.message)
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-title-28">Forgot Password</h1>
            <form onSubmit={onForgotPasswordFormSubmit} className="gap-3 flex flex-col" noValidate>
                <InputField
                    id="email"
                    className="w-full sm:min-w-[300px]"
                    title='Email'
                    placeholder="example@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <p className="flex justify-end text-detail-14 underline">
                    <Link href="/auth/login">Back to Login?</Link>
                </p>
                <Button disabled={false}
                    width={300}
                    label="Send OTP"
                    className='bg-primary-text text-white w-full' />
            </form>
        </div>
    );
}