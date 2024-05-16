"use client";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { PiEyeClosed } from "react-icons/pi";
import { PiEye } from "react-icons/pi";

export default function InputField({ title, placeholder, width = 300, onChange, type, id, value }) {
    const [showPassword, setShowPassword] = useState(false)
    // const [windowWidth, setWindowWidth] = useState(0);
    const [inputWidth, setInputWidth] = useState(`${width}px`);

    useEffect(() => {
        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);

        return () => window.removeEventListener('resize', updateWindowDimensions);
    }, []);

    const updateWindowDimensions = () => {
        // setWindowWidth(window.innerWidth);
        if (window.innerWidth <= 768) {
            setInputWidth('auto');
        } else {
            setInputWidth(`${width}px`);
        }
    }
    return (
        <div>
            <p className="mb-[3px] text-detail-14">{title}</p>
            <div className="relative">
                <input style={{ minWidth: inputWidth }}
                    className={`w-full border-border border-2 rounded-md px-4 py-2 focus:bg-primary focus:bg-opacity-5 focus:ring-primary`}
                    value={value}
                    onChange={(e) => onChange(e)}
                    placeholder={placeholder}
                    type={showPassword || (type == undefined) ? 'text' : type}
                    name={id} id={id || title}
                />
                <div onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl">
                    {type === "password" ?
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl">
                            {showPassword ? <PiEye /> : <PiEyeClosed />}
                        </div>
                        : null
                    }
                </div>
            </div>
        </div >
    );
}