import "@/app/globals.css"

export const metadata = {
    title: 'Authentication',
}

export default function RootAuthLayout({ children }) {
    return (
        <div className="bg-primary w-screen h-screen flex justify-center items-center">
            <div className="bg-background p-4 sm:p-6 rounded-lg w-full m-4 sm:w-auto">
                {children}
            </div>
        </div>
    );
}