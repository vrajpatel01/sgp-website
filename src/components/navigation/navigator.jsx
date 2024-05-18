//components
import NavigationItem from "./navigationItem";
import { usePathname } from "next/navigation";

// icons
// dashboard
import { TbLayoutDashboard } from "react-icons/tb";
import { TbLayoutDashboardFilled } from "react-icons/tb";
// student
import { PiStudent } from "react-icons/pi";
import { PiStudentFill } from "react-icons/pi";
// faculty 
import { IoPeopleOutline } from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";

export default function Navigator() {
    const pathname = usePathname();
    return (
        <div>
            <div className="mb-3 text-[#9CA3AF] capitalize text-body-16">section</div>
            <div className="flex flex-col gap-5">
                <NavigationItem
                    href="/"
                    title="Dashboard"
                    icon={<TbLayoutDashboard />}
                    activeIcon={<TbLayoutDashboardFilled />}
                    active={pathname == '/' ? true : false}
                />
                <NavigationItem
                    href="/students"
                    title="Students"
                    icon={<PiStudent />}
                    activeIcon={<PiStudentFill />}
                    active={pathname == '/students' ? true : false}
                />
                <NavigationItem
                    href="/faculty"
                    title="Faculty"
                    icon={<IoPeopleOutline />}
                    activeIcon={<IoPeopleSharp />}
                    active={pathname == '/faculty' ? true : false}
                />
            </div>
        </div>
    )
}