"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// validators
import emailValidator from '@/lib/validator/email'
import isEmpty from "@/lib/validator/isEmpty";

// components
import Button from "@/components/shared/button";
import InputField from "@/components/shared/inputField";


export default function LoginScreen() {
    const redirect = useRouter()
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const onLoginFormSubmit = async (e) => {
        e.preventDefault()
        try {
            let validateEmail = emailValidator(userData.email)
            let validatePassword = isEmpty(userData.password, false)

            if (validateEmail && validatePassword) {
                // console.log('all done');
                const status = await signIn('credentials', {
                    email: userData.email,
                    password: userData.password,
                    redirect: false
                })

                if (!status.ok && status.error !== null) {
                    return toast.error(status.error)
                }
                // return window.location.href = '/'
                redirect.push('/')
            }

        } catch (error) {
            if (error.code == 'EMPTY')
                return toast.error('All fields are required.')
            return toast.error(error.message)
        }
    }
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-title-28">Login</h1>
            <form onSubmit={onLoginFormSubmit} className="gap-3 flex flex-col" noValidate>
                <InputField
                    id="email"
                    className="w-full sm:min-w-[300px]"
                    title='Email'
                    placeholder="example@example.com"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({
                        ...userData,
                        email: e.target.value
                    })} />
                <InputField
                    id="password"
                    className="w-full sm:min-w-[300px]"
                    title='Password'
                    placeholder="•••••••••"
                    type="password"
                    value={userData.password}
                    onChange={(e) => setUserData({
                        ...userData,
                        password: e.target.value
                    })} />
                <p className="flex justify-end text-detail-14">
                    <Link href="/auth/forgot-password" className="text-title-18 underline">Forgot Password?</Link>
                </p>
                <Button disabled={false}
                    width={300}
                    label="Log in"
                    className='bg-primary-text text-white w-full' />
                <div className="flex justify-center text-detail-14">
                    <span>Don&apos;t have an account? <Link href="/auth/signup" className="underline">Sign Up</Link></span>
                </div>
            </form>
        </div>
    );
}