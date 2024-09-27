"use client";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from 'next/navigation'


import { Button } from "@/components/ui/button";

// network
import { useForgotPassword } from "../services/mutation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordValidator } from "@/app/validator/auth.validator";
import { Input } from "@/components/ui/input";
import { AxiosError } from "axios";



export default function ForgotPasswordScreen() {
    const router = useRouter()

    const forgotPassword = useForgotPassword();
    const form = useForm({
        resolver: zodResolver(forgotPasswordValidator),
        defaultValues: {
            email: ''
        }
    })

    const onSubmit = async (value) => {
        forgotPassword.mutate(value.email, {
            onSuccess: (data) => {
                if (data.success) {
                    toast.success('OTP sent successfully. Check your email.');
                    return router.push(`/auth/verify-otp?email=${value.email}`);
                }
                return form.setError('root', data?.message || 'something went wrong')
            },
            onError: (error) => {
                if (error instanceof AxiosError) {
                    return form.setError("root", {
                        message: error.response.data?.message
                    })
                }
                // toast.error('Failed to send OTP. Please try again.');
                form.setError("root", {
                    message: 'Failed to send OTP. Please try again.'
                })
            }
        });
    }

    return (
        <div className="flex flex-col gap-8 w-full sm:min-w-[350px]">
            <h1 className="text-title-28">Forgot Password</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="gap-3 flex flex-col" noValidate>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={forgotPassword.isPending} placeholder="example@example.com" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <p className="flex justify-end text-detail-14 underline">
                        <Link href="/auth/login">Back to Login?</Link>
                    </p>
                    {form.formState.errors.root && <FormMessage>{form.formState.errors.root.message}</FormMessage>}
                    <Button
                        disabled={forgotPassword.isPending}
                        isLoading={forgotPassword.isPending}>
                        Send OTP
                    </Button>
                </form>
            </Form>
        </div>
    );
}