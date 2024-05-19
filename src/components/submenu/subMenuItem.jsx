export default function SubMenuItem({ label, icon, description, onClick }) {
    return (
        <div className="p-4 hover:bg-secondary-background">
            <button
                onClick={onClick}
                className="flex justify-center items-center gap-3">
                <div className="text-xl sm:p-3 sm:rounded-md sm:border-border sm:border-1 sm:bg-secondary-background sm:w-12 sm:h-12 sm:flex sm:justify-center sm:items-center sm:text-xl">
                    {icon}
                </div>
                <div className="flex flex-col justify-center items-start">
                    <h1 className="text-detail-14 whitespace-nowrap">{label}</h1>
                    <p className="text-small-12 text-left leading-3 text-gray-500 hidden sm:block">{description}</p>
                </div>
            </button>
        </div>
    );
}