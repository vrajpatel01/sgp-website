import BasicInformation from "./components/basicInformation";
import ChangeEmail from "./components/changeEmail";
import PasswordChange from "./components/passwordChange";

export default function Settings() {
    return (
        <div className="h-full">
            <div className="header flex justify-between items-center">
                <h1 className="text-title-28">Settings</h1>
            </div>

            <div className="max-w-[850px] flex justify-start items-start gap-5 flex-col md:flex-row mt-5">
                <BasicInformation />
                <div className="flex justify-start items-start flex-col w-full gap-5">
                    <ChangeEmail />
                    <PasswordChange />
                </div>
            </div>
        </div>
    )
}