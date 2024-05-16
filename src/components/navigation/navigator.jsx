//components
import NavigationItem from "./navigationItem";

// icons
// dashboard
import { TbLayoutDashboard } from "react-icons/tb";
import { TbLayoutDashboardFilled } from "react-icons/tb";

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
                    title="Groups"
                    icon={<TbLayoutDashboard />}
                    activeIcon={<TbLayoutDashboardFilled />}
                />
            </div>
        </div>
    )
}