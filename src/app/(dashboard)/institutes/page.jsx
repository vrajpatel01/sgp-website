'use client';
import { useState } from "react";

// icons
import { RiSchoolLine } from "react-icons/ri";

// components
import Button from "@/components/shared/button";

// models
import AddInstituteModel from "./models/models/addInstituteModel";
import InstitutesItem from "./models/instituteItem";
import ManageDepartmentModel from "./models/models/manageDepartmentModel";
import EditInstituteModel from "./models/models/editInstituteModel";
import InstituteDeleteConfirmationModel from "./models/models/instituteDeleteConfirmationModel";
import InstituteCardSkeleton from "./components/instituteCardSkeleton";

// network
import { useGetAllInstitutes } from "./services/query";

import Error from "@/components/shared/error";

export default function Institutes() {
    const [addInstituteModel, setAddInstituteModel] = useState(false)
    const [departmentsModel, setDepartmentsModel] = useState(false)
    const [editInstituteModel, setEditInstituteModel] = useState(false)
    const [instituteDeleteConfirmationModel, setInstituteDeleteConfirmationModel] = useState(false)

    const institutes = useGetAllInstitutes()

    const [institute, setInstitute] = useState({
        name: '',
        id: ''
    })

    if (institutes.isPending) {
        return <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            <InstituteCardSkeleton itemCount={8} />
        </div>
    }
    if (institutes.isError) return <Error message="Having some problem to fetch data." />

    // if (institutes.isSuccess && institutes?.data?.institutes.length === 0) return <Error message="Currently not exists any account." />


    return (
        <div>
            <div className="header flex justify-between items-center">
                <div className="flex justify-start items-center gap-3">
                    <h1 className="text-title-28">Institutes</h1>
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

            {institutes.isSuccess && institutes?.data?.institutes.length === 0 && <Error message="Currently not exists any Institute." />}
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                {institutes.data?.institutes.map((e) => (
                    <InstitutesItem
                        key={e._id}
                        onInstituteClick={() => {
                            setInstitute({
                                name: e.name,
                                id: e._id
                            });
                            setEditInstituteModel(true)
                        }}
                        onDepartmentClick={() => {
                            setInstitute({
                                name: e.name,
                                id: e._id
                            });
                            setDepartmentsModel(true)
                        }}
                        title={e.name} />
                ))}
            </div>
            <AddInstituteModel
                data={addInstituteModel}
                setData={setAddInstituteModel}
            />

            <ManageDepartmentModel
                data={departmentsModel}
                setData={setDepartmentsModel}
                instituteData={institute} />

            <EditInstituteModel
                data={editInstituteModel}
                setData={setEditInstituteModel}
                instituteData={institute}
                setInstituteDeleteConfirmationModel={setInstituteDeleteConfirmationModel} />

            <InstituteDeleteConfirmationModel
                data={instituteDeleteConfirmationModel}
                setData={setInstituteDeleteConfirmationModel}
                instituteData={institute}
            />
        </div>
    )
}