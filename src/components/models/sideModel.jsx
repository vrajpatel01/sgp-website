export default function SideModel({ children, toggle = false, setToggle }) {
    return (
        <div className={`${toggle ? 'block' : 'hidden'}`}>
            <div onClick={() => setToggle(false)} className={`absolute z-20 bg-primary-text bg-opacity-30 top-0 left-0 h-screen w-screen`}></div>
            <div className={`absolute top-0 bottom-0 right-0 left-0 pt-[5.3rem] sm:left-auto h-screen w-screen sm:w-auto sm:h-auto sm:pt-0 bg-background border-l-1 border-border transition-all duration-150 ease-in-out z-40 shadow-md md:min-w-[300px] md:max-w-[400px]`}>
                {children}
            </div>
        </div>
    )
}