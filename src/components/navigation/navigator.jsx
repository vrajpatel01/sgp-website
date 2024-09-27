//components
import NavigationItem from "./navigationItem";
import { usePathname } from "next/navigation";

// icons
// dashboard
import { TbLayoutDashboard } from "react-icons/tb";
import { TbLayoutDashboardFilled } from "react-icons/tb";
// student
import { PiStudent, PiStudentFill } from "react-icons/pi";
// faculty 
import { IoPeopleOutline, IoPeopleSharp } from "react-icons/io5";
// hod
import { TbUser, TbUserFilled } from "react-icons/tb";
// institute
import { RiSchoolLine, RiSchoolFill } from "react-icons/ri";
// settings
import { TbSettings, TbSettingsFilled } from "react-icons/tb";


export default function Navigator() {
    const pathname = usePathname();
    return (
        <div className="flex flex-col gap-5">
            <div>
                <div className="flex flex-col gap-5">
                    <NavigationItem
                        href="/"
                        title="Dashboard"
                        icon={<TbLayoutDashboard />}
                        activeIcon={<TbLayoutDashboardFilled />}
                        active={pathname == '/' ? true : false}
                    />
                </div>
            </div>
            <div>
                <div className="mb-3 text-light-text capitalize text-body-16 border-border border-b-1"></div>
                <div className="flex flex-col gap-5">
                    <NavigationItem
                        href="/hod"
                        title="Hod"
                        icon={<TbUser />}
                        activeIcon={<TbUserFilled />}
                        active={pathname == '/hod' ? true : false}
                    />
                    <NavigationItem
                        href="/faculty"
                        title="Faculty"
                        icon={<IoPeopleOutline />}
                        activeIcon={<IoPeopleSharp />}
                        active={pathname == '/faculty' ? true : false}
                    />
                    <NavigationItem
                        href="/students"
                        title="Students"
                        icon={<PiStudent />}
                        activeIcon={<PiStudentFill />}
                        active={pathname == '/students' ? true : false}
                    />
                </div>
            </div>
            <div>
                <div className="mb-3 text-light-text capitalize text-body-16 border-border border-b-1"></div>
                <div className="flex flex-col gap-5">
                    <NavigationItem
                        href="/institutes"
                        title="Institutes"
                        icon={<RiSchoolLine />}
                        activeIcon={<RiSchoolFill />}
                        active={pathname == '/institutes' ? true : false}
                    />
                    <NavigationItem
                        href="/settings"
                        title="Settings"
                        icon={<TbSettings />}
                        activeIcon={<TbSettingsFilled />}
                        active={pathname == '/settings' ? true : false}
                    />
                </div>
            </div>
        </div>
    )
}