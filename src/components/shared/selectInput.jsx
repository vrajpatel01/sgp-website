export default function SelectInput({ children, onChange, className, title, required = false, disabled = false }) {
    return (
        <div className="w-auto">
            <p className="mb-[2px] text-detail-14">{title} {required && <span className="text-red-500">*</span>}</p>
            <div className="relative">
                <select
                    disabled={disabled}
                    required={required}
                    onChange={e => onChange(e)}
                    className={`border-border border-2 rounded-md px-3 py-[0.6rem] focus:bg-primary focus:bg-opacity-5 focus:ring-primary ${className}`}>
                    {children}
                </select>
            </div>
        </div >
    )
}