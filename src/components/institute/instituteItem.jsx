import { IoSchool } from "react-icons/io5";
import Button from "../shared/button";


export default function InstituteItem({ title, onInstituteClick, onDepartmentClick }) {

    return (
        <div className="bg-white rounded-md shadow-sm p-5 relative flex justify-center flex-col sm:flex-row items-center gap-5">
            <div className="p-4 bg-secondary-background rounded-full">
                <IoSchool className="text-5xl text-primary" />
            </div>
            <h1 className="text-body-18 text-center sm:text-left">{title}</h1>
            <div className="flex flex-col gap-2">
                <Button onClick={onDepartmentClick} className='min-w-full bg-secondary-background' label='Edit Institute' />
                <Button onClick={onInstituteClick} className='min-w-full bg-secondary-background whitespace-nowrap' label='Manage Departments' />
            </div>
        </div>
    )
}