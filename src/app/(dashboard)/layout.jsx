'use client'
import { useState } from "react";

// components
import Navigator from "@/components/navigation/navigator";
import { RxCross2 } from "react-icons/rx";

// icons 
import { LuMenu } from "react-icons/lu";

export default function DashboardLayout({ children }) {
    const [sidebar, setSidebar] = useState(false)
    return (
        <div className="md:flex justify-start items-start">
            {/* sidebar + navbar */}
            <div className="bg-background border-b-1 md:border-r-1 border-border md:h-screen p-7 flex justify-between items-center md:justify-start md:items-start md:flex-col gap-9 resize-x">
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
            <div className={`md:hidden p-7 h-full w-full absolute transition-all ease-in-out duration-300 bg-white ${sidebar ? 'left-0' : 'left-full'
                }`}>
                <Navigator />
            </div>
            <div className="px-6 py-8 w-full h-screen bg-secondary-background overflow-x-auto">
                {children}
            </div>
        </div>
    )
}