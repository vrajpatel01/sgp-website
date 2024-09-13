'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function ProgressBarProvider({ children }) {
    return (
        <div>
            <ProgressBar
                height="4px"
                color="#045EA8"
                options={{ showSpinner: false }}
                shallowRouting
            />
            {children}
        </div>
    )
}