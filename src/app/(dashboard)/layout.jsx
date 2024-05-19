'use client'
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

// components
import Navigator from "@/components/navigation/navigator";
import { RxCross2 } from "react-icons/rx";

// icons 
import { LuMenu } from "react-icons/lu";
import { MdOutlineSecurity } from "react-icons/md";

export default function DashboardLayout({ children }) {
    const [sidebar, setSidebar] = useState(false)
    const { data: session, status } = useSession()
    console.log(session);

    if (status === 'loading') {
        return <div className="h-screen w-screen flex justify-center items-center">
            <div className="animate-spin">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" viewBox="0 0 304 304">
                    <path fill="#D9D9D9" d="M304 152c0 83.947-68.053 152-152 152S0 235.947 0 152 68.053 0 152 0s152 68.053 152 152Zm-292.296 0c0 77.483 62.813 140.296 140.296 140.296 77.483 0 140.296-62.813 140.296-140.296 0-77.483-62.813-140.296-140.296-140.296C74.517 11.704 11.704 74.517 11.704 152Z" />
                    <path fill="#035FAA" d="M289.015 202.858c3.029 1.125 6.408-.416 7.415-3.486A152.002 152.002 0 0 0 96.406 10.532a152 152 0 0 0-17.944 274.495c2.828 1.563 6.352.392 7.805-2.494 1.454-2.886.285-6.392-2.538-7.965a140.295 140.295 0 0 1-71.88-129.024A140.297 140.297 0 0 1 179.974 14.518a140.297 140.297 0 0 1 105.478 180.779c-.997 3.073.535 6.437 3.564 7.561Z" />
                </svg>

            </div>
            <MdOutlineSecurity className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl" />
        </div>
    }


    if (status === 'unauthenticated') signIn()

    return (
        <div className="md:flex justify-start items-start">
            {/* sidebar + navbar */}
            <div className="bg-background border-b-1 md:border-r-1 border-border md:h-screen p-7 flex justify-between items-center md:justify-start md:items-start md:flex-col gap-9">
                <div className="logo text-title-24">
                    Logo
                </div>
                <div onClick={() => setSidebar(!sidebar)} className="text-title-24 cursor-pointer md:hidden">
                    {sidebar ? <RxCross2 /> : <LuMenu />}
                </div>
                <div className="hidden md:block">
                    <Navigator />
                </div>
            </div>
            <div className={`md:hidden p-7 h-full w-full absolute transition-all ease-in-out duration-300 bg-white z-20 ${sidebar ? 'left-0' : 'left-full'
                }`}>
                <Navigator />
            </div>
            <div className="px-6 py-8 w-full h-screen bg-secondary-background overflow-x-auto">
                {children}
            </div>
        </div>
    )
}