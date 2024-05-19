'use client';
import { useId } from "react";
export default function Button({ label, disabled, onClick, className, icon, type = "submit" }) {
    const buttonId = useId()
    return (
        <div>
            <button
                onClick={onClick}
                disabled={disabled}
                className={`flex justify-center items-center rounded-md px-4 py-2 cursor-pointer text-subtitle-16 disabled:cursor-not-allowed ${className}`}
                value={label}
                type={type}
                name={label}
                id={label || buttonId} >
                {icon && <span className="mr-2">{icon}</span>}
                {label}
            </button>
        </div>
    );
}