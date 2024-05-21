'use client';
import { useState } from "react";

// icons
import { RiSchoolLine } from "react-icons/ri";

// components
import Button from "@/components/shared/button";
import AddInstituteModel from "@/components/institute/models/addInstituteModel";
import InstitutesItem from "@/components/institute/instituteItem";
import ManageDepartmentModel from "@/components/institute/models/manageDepartmentModel";
import EditInstituteModel from "@/components/institute/models/editInstituteModel";

export default function Institutes() {
    const [addInstituteModel, setAddInstituteModel] = useState(false)
    const [departmentsModel, setDepartmentsModel] = useState(false)
    const [editInstituteModel, setEditInstituteModel] = useState(false)

    return (
        <div>
            <div className="header flex justify-between items-center">
                <div className="flex justify-start items-center gap-3">
                    <h1 className="text-title-28">Institutes</h1>
                    {/* <CallOut
                        className="bg-transparent hidden sm:block"
                        icon={'💡'}
                        message='Click on the institute to add departments in the institute.' /> */}
                </div>
                <div className="relative">
                    <Button
                        onClick={() => setAddInstituteModel(true)}
                        icon={<RiSchoolLine className="text-xl" />}
                        width={null}
                        label='Add Institute'
                        className="bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-md hover:border-1 hover:border-primary hover:bg-opacity-20 border-transparent border-1 transition-color duration-150 ease-in-out" />
                </div>
            </div>

            {/* <CallOut
                className="bg-transparent sm:hidden p-2 mt-5"
                icon={<span className="text-2xl">💡</span>}
                message='Click on the institute to add departments in the institute.' /> */}
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                <InstitutesItem
                    onInstituteClick={() => setDepartmentsModel(true)}
                    onDepartmentClick={() => setEditInstituteModel(true)}
                    title="Devang Patel Institute of advance science & technology" />
                {/* <InstitutesItem onClick={() => setDepartmentsModel(true)} title="Devang Patel Institute of advance science & technology" /> */}
            </div>
            <AddInstituteModel data={addInstituteModel} setData={setAddInstituteModel} />
            <ManageDepartmentModel data={departmentsModel} setData={setDepartmentsModel} />
            <EditInstituteModel data={editInstituteModel} setData={setEditInstituteModel} />
        </div>
    )
}