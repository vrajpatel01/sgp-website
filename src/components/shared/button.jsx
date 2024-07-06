'use client';
import { useEffect, useId, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Button({ label, disabled, onClick, className, icon, type = "submit", isLoading = false }) {
    const buttonId = useId()
    const [content, setContent] = useState(<div className="flex justify-center items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
    </div>)

    useEffect(() => {
        if (isLoading) {
            setContent(<AiOutlineLoading3Quarters className="animate-spin text-2xl" />)
        } else {
            setContent(<div className="flex justify-center items-center">
                {icon && <span className="mr-2">{icon}</span>}
                {label}
            </div>)
        }
    }, [isLoading, icon, label])

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex justify-center items-center rounded-md px-4 py-2 cursor-pointer text-subtitle-16 disabled:cursor-not-allowed active:scale-90 transition-all ease-in-out duration-75 ${className}`}
            type={type}
            name={label}
            id={label || buttonId} >
            {content}
        </button>
    );
}