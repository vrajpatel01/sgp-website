import { Suspense } from "react";

export default function SearchLayout({ children }) {
    return (
        <div>
            <Suspense fallback={<div></div>}>
                {children}
            </Suspense>
        </div>
    )
}