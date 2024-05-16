//components
import NavigationItem from "./navigationItem";

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
    return (
        <div>
            <div className="mb-3 text-[#9CA3AF] capitalize text-body-16">section</div>
            <div className="flex flex-col gap-5">
                <NavigationItem
                    href="/auth/login"
                    title="Dashboard"
                    icon={<TbLayoutDashboard />}
                    activeIcon={<TbLayoutDashboardFilled />}
                    active />
                <NavigationItem
                    href="/auth/login"
                    title="Students"
                    icon={<PiStudent />}
                    activeIcon={<PiStudentFill />}
                />
                <NavigationItem
                    href="/auth/login"
                    title="Faculty"
                    icon={<IoPeopleOutline />}
                    activeIcon={<IoPeopleSharp />}
                />
            </div>
        </div>
    )
}