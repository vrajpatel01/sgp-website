import { BiError } from "react-icons/bi";

export default function Error({ message }) {
    return (
        <div className="h-screen w-full flex justify-center items-center flex-col gap-2">
            <BiError className="text-6xl sm:text-8xl text-border" />
            <p className="text-center text-lg sm:text-2xl text-primary-text opacity-50">{message}</p>
        </div>
    )
}