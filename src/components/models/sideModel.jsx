export default function SideModel({ children, toggle = false, setToggle }) {
    return (
        <div>
            <div onClick={() => setToggle(false)} className={`${toggle ? 'block' : 'hidden'} absolute z-20 bg-primary-text bg-opacity-30 top-0 left-0 h-screen w-screen`}></div>
            <div className={`${toggle ? 'right-0' : 'left-full -right-full'} absolute top-0 bottom-0 px-5 py-8 sm:p-6 left-0 sm:left-auto bg-background border-l-1 border-border transition-all duration-150 ease-in-out z-40 overflow-x-scroll shadow-md`}>
                {children}
            </div>
        </div>
    )
}