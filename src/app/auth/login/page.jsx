"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// validators
import emailValidator from "@/services/validator/email";
import isEmpty from "@/services/validator/isEmpty";

// components
import { Button } from "@/components/ui/button";
import InputField from "@/components/shared/inputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidator } from "@/app/validator/auth.validator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";


export default function LoginScreen() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(loginValidator),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (value) => {
        setIsLoading(true)
        const status = await signIn('credentials', {
            email: value.email,
            password: value.password,
            redirect: false,
            callbackUrl: '/'
        })

        if (!status.ok && status.error !== null) {
            setIsLoading(false)
            return form.setError('root', {
                message: status.error
            })
        }
        // window.location.href = "/";
        router.replace(status.url)
        toast.success('Logged in successfully, redirecting...')
        setIsLoading(false)
    }
    return (
        <div className="flex flex-col gap-8 w-full sm:min-w-[350px]">
            <h1 className="text-title-28">Login</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="gap-3 flex flex-col" noValidate>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isLoading} placeholder="example@example.com" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>password</FormLabel>
                                <FormControl>
                                    <PasswordInput {...field} disabled={isLoading} placeholder="•••••••••" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <p className="flex justify-end text-detail-14">
                        <Link href="/auth/forgot-password" className="text-title-18 underline">Forgot Password?</Link>
                    </p>
                    {form.formState.errors.root && <FormMessage>{form.formState.errors.root.message}</FormMessage>}
                    <Button
                        disabled={isLoading}
                        isLoading={isLoading}>
                        Log in
                    </Button>
                    {/* <div className="flex justify-center text-detail-14">
                        <span>Don&apos;t have an account? <Link href="/auth/signup" className="underline">Sign Up</Link></span>
                    </div> */}
                </form>
            </Form>
        </div>
    );
}