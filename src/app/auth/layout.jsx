import "@/app/globals.css"
import Image from "next/image";
import { Suspense } from "react";

export const metadata = {
    title: 'Authentication',
}

export default function RootAuthLayout({ children }) {
    return (
        <div className="overflow-y-scroll w-screen h-screen flex flex-col-reverse md:flex-row items-">
            <div className="p-7 md:w-1/2">
                <div className="bg-gradient-to-bl to-[#8ACAFF] from-[#035FAA] h-full rounded-2xl p-7 flex justify-between flex-col overflow-hidden">
                    <div className="space-y-5 text-center md:text-left md:w-[400px] lg:w-[500px]">
                        <div className="bg-white rounded-md p-1 max-w-fit mx-auto md:mx-0">
                            <Image src='/auth/charusat_full_logo.png' height={70} width={190} alt="logo" />
                        </div>
                        <h1 className="text-xl md:text-3xl lg:text-4xl text-white font-medium leading-7 lg:leading-[50px]">Simplify Project Oversight with Software Group Project Management System</h1>
                        <p className="text-white text-sm md:text-lg">Easily manage student submissions, approvals, and project updates in one place.</p>
                    </div>
                    <Image className="-mb-7" src='/auth/team.svg' height={400} width={650} alt="team image" />
                </div>
            </div>
            <div className="bg-background p-8 pb-0 sm:p-6 rounded-lg w-full md:w-1/2 relative auth-form my-auto">
                <Suspense fallback={<div></div>}>
                    <div className="md:max-w-[500px] mx-auto">
                        <Image className="mx-auto w-[80px] md:w-[100px]" src='/auth/logo.jpeg' height={100} width={100} alt="logo" />
                        {children}
                    </div>
                </Suspense>
            </div>
        </div>
    );
}
