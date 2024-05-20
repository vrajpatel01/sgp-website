export default function CallOut({ message, icon, className = '' }) {
    return (
        <div className={`bg-primary bg-opacity-10 text-primary sm:max-w-min p-4 rounded-md ${className}`}>
            <div className="flex justify-start items-center gap-3">
                <pre>{icon}</pre><p className="text-body-16 text-light-text sm:whitespace-nowrap">{message}</p>
            </div>
        </div>
    )
}