"use client";
import { useState } from "react";
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import axiosInstance, { AxiosError } from "@/axios.config";
import { Suspense } from 'react'

// components
import Button from "@/components/shared/button"

// validator
import OtpInput from "react-otp-input";
import numberValidator from "@/lib/validator/number";

export default function VerifyOtpScreen() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [otp, setOtp] = useState('');

    const onResetPasswordFormSubmit = (e) => {
        e.preventDefault()
        try {
            const otpValidation = numberValidator(otp, 'OTP')

            if (otpValidation) {
                const email = searchParams.get('email')
                const response = axiosInstance.post('/admin/auth/forgot-password/verify', {
                    email,
                    otp
                }).then(res => {
                    if (res.data.success === true)
                        router.push(`/auth/login`)
                })
                toast.promise(response, {
                    loading: 'Verifying OTP...',
                    success: 'OTP verified successfully.',
                    error: 'Failed to verify OTP. Please try again.'
                })
            }
        } catch (error) {
            if (error instanceof AxiosError)
                return toast.error(error.response.data?.message)
            if (error.code === 'EMPTY')
                return toast.error('All fields are required.')
            toast.error(error.message)
        }
    }
    return (
        <Suspense fallback={<VerifyOtpScreen />}>
            <div className="flex flex-col gap-8">
                <h1 className="text-title-28">Enter OTP</h1>
                <form onSubmit={onResetPasswordFormSubmit} className="gap-3 flex flex-col">
                    <div className="flex justify-center items-center gap-3">
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            inputStyle="!w-12 !h-12 p-2 text-2xl rounded-md border border-gray-300 text-center mx-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            inputType="number"
                            renderInput={(props) => <input {...props} />}
                        />
                    </div>
                    <Button
                        disabled={false}
                        width={300}
                        label="Reset"
                        className="bg-primary-text text-white w-full sm:min-w-[300px]"
                    />
                </form>
            </div>
        </Suspense>
    );
}