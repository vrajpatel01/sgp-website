'use client';
import BasicInformation from "./components/basicInformation";
import ChangeEmail from "./components/changeEmail";
import PasswordChange from "./components/passwordChange";
import { Warper } from "./components/warper";
import Button from "@/components/shared/button";
import { signOut } from "next-auth/react";
import { useGetMyInfo } from "./services/query";
import SettingsSkelton from "./components/settingsSkelton";

export default function Settings() {
    const myInfo = useGetMyInfo();
    if (myInfo.isPending) {
        return <SettingsSkelton />
    }

    return (
        <div className="h-full">
            <div className="header flex justify-between items-center">
                <h1 className="text-title-28">Settings</h1>
            </div>

            <div className="max-w-[900px] mx-auto space-y-5 mt-10">
                <BasicInformation data={myInfo.data.admin} />
                <ChangeEmail currentEmail={myInfo.data.admin.email} />
                <PasswordChange />
                <Warper title='Sign out' className='border-t-[.5px] border-gray-500 pt-5'>
                    <div className="text-sm text-gray-500">
                        End your session and securely sign out of your account. Make sure to save any changes before signing out to avoid losing your progress.
                    </div>
                    <div onClick={() => signOut()} className="flex justify-end">
                        <Button className='bg-red-500 text-white text-sm' label="Sign out" />
                    </div>
                </Warper>
            </div>
        </div>
    )
}