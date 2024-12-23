'use client'
import { useState } from "react";

// components
import Navigator from "@/components/navigation/navigator";
import { RxCross2 } from "react-icons/rx";

// icons 
import { LuMenu } from "react-icons/lu";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import NavigationItem from "@/components/navigation/navigationItem";
import { IoMdContact } from "react-icons/io";
import { usePathname } from "next/navigation";


export default function DashboardLayout({ children }) {
    const [sidebar, setSidebar] = useState(false)
    const pathname = usePathname();
    return (
        <div className="md:flex justify-start items-start">
            {/* sidebar + navbar */}
            <div className="absolute z-50 sm:z-20 top-0 left-0 w-full bg-white p-6 flex justify-between items-center sm:hidden border-b-1 border-border">
                <Logo />
                <div className="cursor-pointer" onClick={() => setSidebar(!sidebar)}>
                    {sidebar ? <RxCross2 className="text-2xl" /> : <LuMenu className="text-2xl" />}
                </div>
            </div>
            <div className={`sm:z-20 z-30 fixed flex flex-col gap-5 justify-start items-start left-0 pt-[5.3rem] sm:pt-6 w-full h-screen overflow-y-scroll scroll-none sm:h-full sm:w-auto bg-white p-6 border-r-1 border-border transition-all duration-150 ease-in-out ${sidebar ? 'left-0' : 'left-full'} sm:left-0`}>
                <Logo className='hidden sm:block' />
                <div className="left-full bg-white w-full sm:w-auto pt-3 h-full flex flex-col justify-between">
                    <Navigator />
                    <div className="w-full space-y-3">
                        <NavigationItem
                            href="/contact-us"
                            title="Contact us"
                            icon={<IoMdContact />}
                            activeIcon={<IoMdContact />}
                            active={pathname == '/contact-us' ? true : false} />
                        <Button className="w-full" variant="destructive" onClick={() => signOut()}>
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
            <div className="px-6 py-8 sm:ml-[17.4rem] pt-28 sm:mb-0 sm:py-8 w-full h-screen bg-secondary-background overflow-y-scroll">
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}