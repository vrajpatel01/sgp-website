import "@/app/globals.css"
import Image from "next/image";
import { Suspense } from "react";

export const metadata = {
    title: 'Authentication',
}

export default function RootAuthLayout({ children }) {
    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col-reverse md:flex-row overflow-x-scroll">
            <div className="w-full md:w-1/2 h-full md:h-full p-7 auth">
                <div className="bg-gradient-to-bl to-[#8ACAFF] from-[#035FAA] h-full rounded-2xl p-7 relative overflow-hidden">
                    <Image src='/auth/team.svg' height={400} width={650} alt="team image" className="select-none absolute bottom-0 left-1/2 transform hidden md:block md:w-[550px] -translate-x-1/2 img" />
                    <div className="mx-auto md:mx-auto text-center md:text-left md:mt-10 md:ml-5 max-w-[500px] space-y-2 md:space-y-4">
                        <div className="p-1 rounded-sm bg-white max-w-fit mx-auto md:mx-0">
                            <Image src='/auth/charusat_full_logo.png' className="w-[190px]" height={70} width={190} alt="logo" />
                        </div>
                        <h1 className="text-xl md:text-3xl lg:text-4xl text-white font-medium leading-7 lg:leading-[50px]">Simplify Project Oversight with Software Group Project Management System</h1>
                        <p className="text-white text-sm md:text-lg">Easily manage student submissions, approvals, and project updates in one place.</p>
                    </div>
                </div>
            </div>
            <div className="bg-background p-8 pb-0 sm:p-6 rounded-lg w-full md:w-1/2 m-4 relative auth-form">
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