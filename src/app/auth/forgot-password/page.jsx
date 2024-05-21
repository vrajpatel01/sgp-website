"use client";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";
import axiosInstance, { AxiosError } from "@/axios.config";
import { useRouter } from 'next/navigation'

// components
import InputField from "@/components/shared/inputField";
import Button from "@/components/shared/button";

// validator
import emailValidator from "@/lib/validator/email";
import { useMutation } from "@tanstack/react-query";



export default function ForgotPasswordScreen() {
    const router = useRouter()
    const [email, setEmail] = useState('');

    const forgotPassword = async (email) => {
        const response = await axiosInstance.patch('/admin/auth/forgot-password', { email });
        return response.data;
    }

    const mutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess: () => {
            toast.success('OTP sent successfully. Check your email.');
            router.push(`/auth/verify-otp?email=${email}`);
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            toast.error('Failed to send OTP. Please try again.');
        }
    });

    const onForgotPasswordFormSubmit = async (e) => {
        e.preventDefault();
        try {
            let validateEmail = emailValidator(email);
            if (validateEmail) {
                mutation.mutate(email);
            }
        } catch (error) {
            if (error.code === "EMPTY")
                return toast.error('Please Enter Your Email Address.');
            return toast.error(error.message)
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-title-28">Forgot Password</h1>
            <form onSubmit={onForgotPasswordFormSubmit} className="gap-3 flex flex-col" noValidate>
                <InputField
                    disabled={mutation.isPending}
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
                <Button disabled={mutation.isPending}
                    width={300}
                    isLoading={mutation.isPending}
                    label="Send OTP"
                    className='bg-primary-text text-white w-full disabled:bg-opacity-75' />
            </form>
        </div>
    );
}