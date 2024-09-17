'use client'
import useNetwork from "@/hooks/useNetwork"
import Logo from "./shared/logo";
import { RiWifiOffLine } from "react-icons/ri";

export default function NetworkProvider({ children }) {
    const isOnline = useNetwork();
    return (
        <div>
            {isOnline ? children :
                <div className="h-screen w-screen flex justify-center items-center flex-col gap-5 relative max-w-[400px] mx-auto p-10">
                    <div className="p-5 rounded-full relative before:content-[''] before:absolute before:border-l-2 before:border-black before:h-full before:w-full before:top-0 before:left-0 before:rounded-full before:animate-spin">
                        <span>
                            <RiWifiOffLine size={43} />
                        </span>
                    </div>
                    <div className="space-y-3 text-center">
                        <h1>No Internet Connection</h1>
                        <span className="text-sm text-gray-500">Please check your internet connection and reload the site or reopen the site.</span>
                    </div>
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                        <Logo />
                    </div>
                </div>}
        </div>
    )
}