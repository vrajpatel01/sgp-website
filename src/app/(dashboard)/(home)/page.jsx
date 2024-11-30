"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryChart, ProjectSubmissionChart, TechnologyChart } from "./components/charts";
import { useGetCategoryInfo, useGetProjectSubmissionInfo, useGetTechnologyInfo } from "./services/query";
import { useGetAllInstitutes, useGetDepartments } from "../institutes/services/query";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

export default function DashboardPage() {
    const institutes = useGetAllInstitutes()
    const [values, setValues] = useState({ institute: null, department: null })
    const departments = useGetDepartments(values.institute, values.institute !== '' && values.institute !== 'Select Institute' ? true : false)

    const projectSubmission = useGetProjectSubmissionInfo({
        institute: values?.institute,
        department: values?.department
    })

    const technologyChart = useGetTechnologyInfo({
        institute: values?.institute,
        department: values?.department
    })

    const categoryChart = useGetCategoryInfo({
        institute: values?.institute,
        department: values?.department
    })

    useEffect(() => {
        projectSubmission.refetch()
        technologyChart.refetch()
        categoryChart.refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.institute, values.department])

    if (institutes.isLoading) {
        return (
            <div className="space-y-10">
                <h1 className="text-title-28 mb-5">Dashboard</h1>
                <Skeleton height={300} className="mb-6" />
                <Skeleton height={300} />
            </div>
        )
    }
    return (
        <div className="h-full">
            <h1 className="text-title-28 mb-5">Dashboard</h1>
            <div className="space-y-5">

                <div className="flex justify-end items-center gap-4">
                    <Select
                        // value={values.institute}
                        onValueChange={e => setValues({ ...values, institute: e })} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="select institute" />
                        </SelectTrigger>
                        <SelectContent>
                            {institutes.data.institutes.map((institute, index) => (
                                <SelectItem default={index === 0} key={index} value={institute._id}>{institute.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        disabled={values.institute === null}
                        // value={values.department}
                        onValueChange={e => setValues({ ...values, department: e })} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="select department" />
                        </SelectTrigger>
                        <SelectContent>
                            {departments.data !== undefined && departments.data.departments.map((department, index) => (
                                <SelectItem default={index === 0} key={index} value={department._id}>{department.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <ProjectSubmissionChart data={projectSubmission} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <TechnologyChart data={technologyChart} />
                    <CategoryChart data={categoryChart} />
                </div>
            </div>
        </div>
    )
}
