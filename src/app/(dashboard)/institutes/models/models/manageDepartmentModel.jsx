import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// models
import SideModel from "@/components/models/sideModel";

// components
import InputField from "@/components/shared/inputField";
import { Button } from "@/components/ui/button";
import DepartmentItem from "../departmentItem";

// validator
import isEmpty from "@/services/validator/isEmpty";

// network
import { useGetDepartments } from "../../services/query";
import { useAddDepartment } from "../../services/mutation";

// icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


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
        <SheetContent className="space-y-5 overflow-y-scroll">
            <SheetHeader>
                <SheetTitle>Department</SheetTitle>
            </SheetHeader>
            <Separator />
            <div className="space-y-4">
                <Card className="p-4">
                    {instituteData.name}
                </Card>

                <form onSubmit={handleAddDepartment} className="flex flex-col gap-2 space-y-2">
                    <Input
                        placeholder='Department Name'
                        value={department}
                        disabled={addDepartment.isPending}
                        onChange={(e) => setDepartment(e.target.value)} />
                    <p className="w-full sm:max-w-[300px] text-sm leading-4 text-light-text">Enter the department name and press the button to add department.</p>
                    <Button
                        disabled={addDepartment.isPending}
                        isLoading={addDepartment.isPending}
                        className='w-full bg-primary text-white' >
                        Add
                    </Button>
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
        </SheetContent>
    )
}