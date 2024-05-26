'use client'
import { useState } from "react";

// components
import Navigator from "@/components/navigation/navigator";
import { RxCross2 } from "react-icons/rx";

// icons 
import { LuMenu } from "react-icons/lu";
import { MdOutlineSecurity } from "react-icons/md";
import Logo from "@/components/shared/logo";

export default function DashboardLayout({ children }) {
    const [sidebar, setSidebar] = useState(false)

    return (
        <div className="md:flex justify-start items-start">
            {/* sidebar + navbar */}
            <div className="absolute z-20 top-0 left-0 w-full bg-white p-6 flex justify-between items-center sm:hidden border-b-1 border-border">
                <Logo />
                <div className="cursor-pointer" onClick={() => setSidebar(!sidebar)}>
                    {sidebar ? <RxCross2 className="text-2xl" /> : <LuMenu className="text-2xl" />}
                </div>
            </div>
            <div className={`z-20 fixed flex flex-col gap-5 justify-start items-start left-0 top-[5.3rem] sm:top-0 w-full h-auto sm:h-full sm:w-auto bg-white p-6 border-r-1 border-border transition-all duration-150 ease-in-out ${sidebar ? 'left-0' : 'left-full'} sm:left-0`}>
                <Logo className='hidden sm:block' />
                <div className="left-full bg-white w-full sm:w-auto">
                    <Navigator />
                </div>
            </div>
            <div className="px-6 py-8 sm:ml-[17.4rem] pt-28 sm:mb-0 sm:py-8 w-full h-screen bg-secondary-background overflow-x-auto">
                {children}
            </div>
        </div>
    )
}