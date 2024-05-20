"use client";
import { useState, useId } from "react";
import { PiEyeClosed } from "react-icons/pi";
import { PiEye } from "react-icons/pi";

export default function InputField({ title, placeholder, className, onChange, type, id, value, required = false, maxLength }) {
    const [showPassword, setShowPassword] = useState(false)
    const fieldId = useId()

    return (
        <div className="w-auto">
            <p className="mb-[2px] text-detail-14">{title} {required && <span className="text-red-500">*</span>}</p>
            <div className="relative">
                <input
                    maxLength={maxLength}
                    className={`border-border border-2 rounded-md px-4 py-2 focus:bg-primary focus:bg-opacity-5 focus:ring-primary ${className} peer`}
                    value={value}
                    onChange={(e) => onChange(e)}
                    placeholder={placeholder}
                    type={showPassword || (type == undefined) ? 'text' : type}
                    name={id}
                    id={id || title || fieldId}
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