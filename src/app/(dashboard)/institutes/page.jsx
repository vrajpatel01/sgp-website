'use client';
import { useState } from "react";
import axiosInstance from "@/axios.config";
import { useQuery } from '@tanstack/react-query'

// icons
import { RiSchoolLine } from "react-icons/ri";

// components
import Button from "@/components/shared/button";
import AddInstituteModel from "@/components/institute/models/addInstituteModel";
import InstitutesItem from "@/components/institute/instituteItem";
import ManageDepartmentModel from "@/components/institute/models/manageDepartmentModel";
import EditInstituteModel from "@/components/institute/models/editInstituteModel";
import InstituteDeleteConfirmationModel from "@/components/institute/models/instituteDeleteConfirmationModel";
import { useGetAllInstitutes } from "@/services/network/query";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import InstituteCardSkeleton from "@/components/skeletons/instituteCardSkeleton";

export default function Institutes() {
    const [addInstituteModel, setAddInstituteModel] = useState(false)
    const [departmentsModel, setDepartmentsModel] = useState(false)
    const [editInstituteModel, setEditInstituteModel] = useState(false)
    const [instituteDeleteConfirmationModel, setInstituteDeleteConfirmationModel] = useState(false)

    const institutes = useGetAllInstitutes()

    const [institute, setInstitute] = useState({
        name: '',
        id: '',
        department: []
    })

    const currentInstitute = (e) => {
        setInstitute({
            name: e.name,
            id: e._id,
            department: e.departments
        });
    }

    if (institutes.isPending) {
        return <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            <InstituteCardSkeleton itemCount={8} />
        </div>
    }
    if (institutes.isError) return <div>Error: {institutes.error.message}</div>

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
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                {institutes.data?.institutes.map((e) => (
                    <InstitutesItem
                        key={e._id}
                        onInstituteClick={() => {
                            currentInstitute(e)
                            setEditInstituteModel(true)
                        }}
                        onDepartmentClick={() => {
                            currentInstitute(e)
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