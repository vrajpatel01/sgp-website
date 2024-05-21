import Button from "@/components/shared/button";
import SideModel from "../../models/sideModel";
import DepartmentItem from "../departmentItem";
import { useState } from "react";

// icons
import { IoMdAdd } from "react-icons/io";


export default function ManageDepartmentModel({ data, setData }) {
    const [department, setDepartment] = useState(['computer science'])

    const handleDepartmentAdd = () => {
        setDepartment([...department, ''])
    }
    return (
        <SideModel toggle={data} setToggle={() => setData(!data)}>
            <div className="px-5 py-7 sm:p-6 overflow-x-scroll h-full flex justify-between flex-col">
                <div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-title-24 mb-3">Departments</h1>
                        <IoMdAdd onClick={handleDepartmentAdd} className="text-2xl cursor-pointer" />
                    </div>
                    <p className="min-w-full sm:w-[300px] mb-5 text-center border-primary border-1 p-4 rounded-md leading-5 text-primary bg-primary bg-opacity-15">
                        Devang patel institute of advance science & technology
                    </p>
                    <div className="flex flex-col gap-3">
                        {
                            department.map(e => {
                                return <DepartmentItem key={e} title={e} />
                            })
                        }
                    </div>
                </div>

                <Button onClick={() => setData(false)} className='w-full bg-secondary-background mt-5' label='Close' />
            </div>
        </SideModel>
    )
}