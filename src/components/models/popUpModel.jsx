export default function PopUpModel({ children, toggle = false, setToggle }) {
    return (
        <div className={`${toggle ? 'absolute' : 'hidden'} h-screen w-screen top-0 bottom-0 left-0 right-0 z-50 bg-primary-text bg-opacity-15 flex justify-center items-center p-4 transition-all duration-300`}>
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm min-w-full sm:!min-w-min">
                {children}
            </div>
        </div>
    )
}