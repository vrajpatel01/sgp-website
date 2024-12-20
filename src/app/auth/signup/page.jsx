"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";

// components
import { Button } from "@/components/ui/button";

// validators
import emailValidator from "@/services/validator/email";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerValidator } from "@/app/validator/auth.validator";
import { Form, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function SignUpScreen() {
    const [userEmail, setUserEmail] = useState('')


    const form = useForm({
        resolver: zodResolver(registerValidator),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-title-28">Sign Up</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="gap-3 flex flex-col" noValidate>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormDescription>
                                    <Input {...field} placeholder="example@example.com" />
                                </FormDescription>
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>password</FormLabel>
                                <FormDescription>
                                    <Input {...field} placeholder="•••••••••" />
                                </FormDescription>
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormDescription>
                                    <Input {...field} placeholder="•••••••••" />
                                </FormDescription>
                            </FormItem>
                        )} />
                    <Button disabled={false}
                        className='bg-primary-text text-white w-full sm:min-w-[300px]' >
                        Sign Up
                    </Button>
                    <div className="flex justify-center text-detail-14">
                        <span>Already have an account? <Link href="/auth/login" className="underline">Login</Link></span>
                    </div>
                </form>
            </Form>
        </div>
    );
}