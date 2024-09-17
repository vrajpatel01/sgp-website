export const Warper = ({ children, title, description, className, ...rest }) => {
    return (
        <div {...rest} className={`grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-14 mx-auto ${className}`}>
            <div>
                <h1 className="text-2xl font-sf-samibold">{title}</h1>
                <p className="text-gray-400 text-sm">{description}</p>
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    )
}