'use client';
import { useState, useEffect } from "react";

export default function Button({ label, width = 300, disabled, onClick }) {
    const [buttonWidth, setButtonWidth] = useState(`${width}px`);

    useEffect(() => {
        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);

        return () => window.removeEventListener('resize', updateWindowDimensions);
    }, []);

    const updateWindowDimensions = () => {
        // setWindowWidth(window.innerWidth);
        if (window.innerWidth <= 768) {
            setButtonWidth('auto');
        } else {
            setButtonWidth(`${width}px`);
        }
    }

    return (
        <div>
            <button
                style={{ minWidth: buttonWidth }}
                onClick={onClick}
                disabled={disabled}
                className={`w-full bg-primary-text text-white rounded-md px-4 py-2 cursor-pointer text-subtitle-16 disabled:cursor-not-allowed`}
                value={label}
                type="submit"
                name={label}
                id={label} >
                {label}
            </button>
        </div>
    );
}