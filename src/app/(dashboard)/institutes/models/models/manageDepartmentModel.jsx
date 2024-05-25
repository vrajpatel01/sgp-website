import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// models
import SideModel from "@/components/models/sideModel";

// components
import InputField from "@/components/shared/inputField";
import Button from "@/components/shared/button";
import DepartmentItem from "../departmentItem";

// validator
import isEmpty from "@/services/validator/isEmpty";

// network
import { useGetDepartments } from "../../services/query";
import { useAddDepartment } from "../../services/mutation";

// icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function ManageDepartmentModel({ data, setData, instituteData }) {
    const [department, setDepartment] = useState('')

    const addDepartment = useAddDepartment()
    const allDepartments = useGetDepartments(instituteData.id, data)

    useEffect(() => {
        if (addDepartment.isSuccess) {
            setDepartment('')
        }

    }, [addDepartment.isSuccess])

    const handleAddDepartment = (e) => {
        e.preventDefault()
        try {
            const departmentValidator = isEmpty(department)
            if (departmentValidator) {
                addDepartment.mutate({
                    department,
                    instituteId: instituteData.id
                })
            }
        } catch (error) {
            if (error.code == 'EMPTY')
                return toast.error('Department name is required')
            return toast.error(error.message)
        }
    }

    return (
        <SideModel toggle={data} setToggle={() => setData(!data)}>
            <div className="px-5 py-7 sm:p-6 overflow-x-scroll h-full flex justify-between flex-col">
                <div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-title-24 mb-3">Departments</h1>
                    </div>
                    <p className="min-w-full sm:w-[300px] mb-5 text-center border-primary border-1 p-4 rounded-md leading-5 text-primary bg-primary bg-opacity-15">
                        {instituteData.name}
                    </p>

                    <form onSubmit={handleAddDepartment} className="flex flex-col gap-2">
                        <InputField
                            placeholder='Department Name'
                            className='min-w-full'
                            value={department}
                            disabled={addDepartment.isPending}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                        <p className="w-full sm:max-w-[300px] text-sm leading-4 text-light-text">Enter the department name and press the button to add department.</p>
                        <Button
                            label='Add Department'
                            disabled={addDepartment.isPending}
                            isLoading={addDepartment.isPending}
                            className='w-full bg-primary text-white' />
                    </form>
                    <div className="flex flex-col gap-3 mt-6">
                        <div className="flex justify-start items-center gap-3 mb-3">
                            <h1 className="text-body-18">Added departments</h1>
                            {allDepartments.isLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
                        </div>
                        {allDepartments?.data?.departments?.length == 0 && <span className="text-center text-light-text w-full py-4 px-5 border-border border-1 rounded-md">No departments added yet</span>}
                        <div className="flex flex-col gap-3">
                            {allDepartments?.data && allDepartments?.data.departments.length > 0 && allDepartments?.data?.departments?.map(e => (<DepartmentItem instituteId={instituteData.id} departmentData={e} key={e._id} title={e.name} />))}
                        </div>
                    </div>
                </div>

                <Button onClick={() => setData(false)} className='w-full bg-secondary-background mt-5' label='Close' />
            </div>
        </SideModel>
    )
}