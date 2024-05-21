"use client";
import { useState } from "react";
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";
import axiosInstance, { AxiosError } from "@/axios.config";
import { useMutation } from "@tanstack/react-query";

// components
import Button from "@/components/shared/button"

// validator
import OtpInput from "react-otp-input";
import numberValidator from "@/lib/validator/number";

export default function VerifyOtpScreen(props) {
    const router = useRouter()
    const [otp, setOtp] = useState('');

    const VerifyOtp = async () => {
        // const email = searchParams.get('email')
        const email = props?.searchParams?.email || ''
        const response = await axiosInstance.post('/admin/auth/forgot-password/verify', { email, otp })
        return response.data;
    }

    const mutation = useMutation({
        mutationFn: VerifyOtp,
        onSuccess: () => {
            toast.success('OTP Verification successful.');
            router.push(`/auth/login`)
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data?.message)
            }
            toast.error('Failed to verify OTP. Please try again.');
        }
    });

    const onResetPasswordFormSubmit = (e) => {
        e.preventDefault()
        try {
            const otpValidation = numberValidator(otp, 'OTP')

            if (otp.length !== 6) {
                return toast.error('OTP must be 6 digits long.')
            } else if (otpValidation) {
                mutation.mutate()
            }
        } catch (error) {
            if (error.code === 'EMPTY')
                return toast.error('Please Enter OTP to verify.')
            toast.error(error.message)
        }
    }
    return (
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
                        renderInput={(props) => <input disabled={mutation.isPending} {...props} />}
                    />
                </div>
                <p className="w-full sm:max-w-[330px] text-small-12 leading-4 text-light-text">Enter your OTP received on your registered email address. If the email is valid, we will send the password to your registered email address.</p>
                <Button
                    isLoading={mutation.isPending}
                    disabled={mutation.isPending}
                    width={300}
                    label="Reset"
                    className="bg-primary-text text-white w-full sm:min-w-[300px] disabled:bg-opacity-75"
                />
            </form>
        </div>
    );
}