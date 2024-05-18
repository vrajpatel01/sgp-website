export default function SubMenuItem({ label, icon, description, onClick }) {
    return (
        <div className="p-4 hover:bg-secondary-background">
            <button
                onClick={onClick}
                className="flex justify-center items-center gap-3">
                <div className="p-3 rounded-md border-border border-1 bg-secondary-background w-12 h-12 flex justify-center items-center text-xl">
                    {icon}
                </div>
                <div className="flex flex-col justify-center items-start">
                    <h1 className="text-detail-14">{label}</h1>
                    <p className="text-small-12 text-left leading-3 text-gray-500">{description}</p>
                </div>
            </button>
        </div>
    );
}