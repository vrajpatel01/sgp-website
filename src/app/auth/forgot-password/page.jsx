"use client";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation'

// components
import InputField from "@/components/shared/inputField";
import Button from "@/components/shared/button";

// validator
import emailValidator from "@/services/validator/email";

// network
import { useForgotPassword } from "../services/mutation";



export default function ForgotPasswordScreen() {
    const router = useRouter()
    const [email, setEmail] = useState('');

    const forgotPassword = useForgotPassword();

    const onForgotPasswordFormSubmit = async (e) => {
        e.preventDefault();
        try {
            let validateEmail = emailValidator(email);
            if (validateEmail) {
                forgotPassword.mutate(email);
            }
        } catch (error) {
            if (error.code === "EMPTY")
                return toast.error('Please Enter Your Email Address.');
            return toast.error(error.message)
        }
    }

    if (forgotPassword.isSuccess) {
        return router.push(`/auth/verify-otp?email=${email}`);
    }

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-title-28">Forgot Password</h1>
            <form onSubmit={onForgotPasswordFormSubmit} className="gap-3 flex flex-col" noValidate>
                <InputField
                    disabled={forgotPassword.isPending}
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
                <Button
                    disabled={forgotPassword.isPending}
                    width={300}
                    isLoading={forgotPassword.isPending}
                    label="Send OTP"
                    className='bg-primary-text text-white w-full disabled:bg-opacity-75' />
            </form>
        </div>
    );
}