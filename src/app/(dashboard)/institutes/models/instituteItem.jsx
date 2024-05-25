import { IoSchool } from "react-icons/io5";
import Button from "@/components/shared/button";


export default function InstituteItem({ title, onInstituteClick, onDepartmentClick }) {

    return (
        <div className="bg-white rounded-md shadow-sm p-5 relative flex justify-center flex-col items-center gap-5">
            <div className="p-4 bg-secondary-background rounded-full">
                <IoSchool className="text-5xl text-primary" />
            </div>
            <h1 className="text-body-18 text-center sm:text-center">{title}</h1>
            <div className="flex gap-2 flex-wrap justify-center items-center">
                <Button onClick={onInstituteClick} className='w-full md:w-auto bg-secondary-background whitespace-nowrap' label='Edit Institute' />
                <Button onClick={onDepartmentClick} className='w-full md:w-auto bg-secondary-background whitespace-nowrap' label='Manage Departments' />
            </div>
        </div>
    )
}