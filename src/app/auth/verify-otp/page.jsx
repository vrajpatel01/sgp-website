"use client";
import { useEffect } from "react";
import toast from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation";

// components
import { Button } from "@/components/ui/button"

// validator
import { useOtpValidation } from "../services/mutation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

export default function VerifyOtpScreen(props) {
    const router = useRouter()
    const searchParams = useSearchParams();

    const otpVerification = useOtpValidation()

    const form = useForm({
        resolver: zodResolver(z.object({
            otp: z.string().min(6, {
                message: 'OTP must be 6 digits long.'
            }).max(6, {
                message: 'OTP must be 6 digits long.'
            })
        })),
        defaultValues: { otp: '' }
    })

    const onSubmit = (value) => {
        if (value.otp.length !== 6) {
            return form.setError('otp', {
                message: 'OTP must be 6 digits long.'
            })
        }
        let email = searchParams.get('email');
        email = email.replace(/ /g, '+');
        otpVerification.mutate({ email, otp: value.otp }, {
            onSuccess: (data) => {
                if (data.success) {
                    toast.success('Password is Send to your email. Please check your email.')
                    return router.push(`/auth/login`)
                }

                return form.setError('root', {
                    message: 'something went wrong'
                })
            },
            onError: (error) => {
                if (error instanceof AxiosError) {
                    return form.setError("root", {
                        message: error.response.data?.message
                    })
                }
                return form.setError('root', {
                    message: 'Failed to verify OTP. Please try again.'
                })
            }
        })
    }

    useEffect(() => {
        let email = searchParams.get('email');
        email = email?.replace(/ /g, '+');
        if (!email) router.push(`/auth/forgot-password`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.searchParams.email, router])

    return (
        <div className="flex flex-col gap-8">
            <div className="mx-auto flex justify-center flex-col gap-3">
                <h1 className="text-4xl mt-10 font-bold text-center">Enter OTP</h1>
                <p className="text-base text-muted-foreground text-center">OTP is send to your email please enter OTP to reset your password so new password is send to your email.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="gap-3 flex flex-col justify-center items-center">
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl className="flex justify-center">
                                    <InputOTP {...field} disabled={otpVerification.isPending} maxLength={6}>
                                        <InputOTPGroup>
                                            <InputOTPSlot className="text-2xl w-12 h-12 sm:w-16 sm:h-16" index={0} />
                                            <InputOTPSlot className="text-2xl w-12 h-12 sm:w-16 sm:h-16" index={1} />
                                            <InputOTPSlot className="text-2xl w-12 h-12 sm:w-16 sm:h-16" index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot className="text-2xl w-12 h-12 sm:w-16 sm:h-16" index={3} />
                                            <InputOTPSlot className="text-2xl w-12 h-12 sm:w-16 sm:h-16" index={4} />
                                            <InputOTPSlot className="text-2xl w-12 h-12 sm:w-16 sm:h-16" index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <p className="w-full text-base leading-4 text-light-text text-center">Enter your OTP received on your registered email address. If the email is valid, we will send the password to your registered email address.</p>
                    {form.formState.errors.root && <FormMessage type="error">{form.formState.errors.root.message}</FormMessage>}
                    <Button
                        className="text-xl h-12 w-full"
                        isLoading={otpVerification.isPending}
                        disabled={otpVerification.isPending}>
                        Reset
                    </Button>
                </form>
            </Form>
        </div>
    );
}