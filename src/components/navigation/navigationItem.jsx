import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

export default function NavigationItem({ icon, activeIcon, title, href = '/', active = false, width = 230 }) {
    return (
        <Link href={href}>
            <div style={{ minWidth: `${width}px` }} className={`flex justify-between items-center py-2 px-4 rounded-md cursor-pointer hover:bg-[#F3F3F3] transition-all duration-300 ease-in-out ${active ? 'bg-[#F3F3F3]' : ''}`}>
                <div className="flex justify-start items-center gap-2">
                    {
                        active ?
                            <div className="text-title-24 text-primary">{activeIcon}</div> :
                            <div className="text-title-24">{icon}</div>
                    }
                    <div className="text-title-18">{title}</div>
                </div>
                {active ? <div><IoIosArrowForward /></div> : null}
            </div>
        </Link>
    )
}