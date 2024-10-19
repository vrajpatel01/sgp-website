"use client"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PendingAndSuccessfulSubmissions, TotalSubmissions } from "./components/charts";
import { useGetChartData } from "./services/query";
import { useGetAllInstitutes, useGetDepartments } from "../institutes/services/query";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

export default function DashboardPage() {
    const institutes = useGetAllInstitutes()
    // const chartData = useGetChartData();
    const [values, setValues] = useState({ institute: null, department: null })
    const departments = useGetDepartments(values.institute, values.institute !== '' && values.institute !== 'Select Institute' ? true : false)

    const chartData = useGetChartData({
        institute: values?.institute,
        department: values?.department
    })

    useEffect(() => {
        chartData.refetch()
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
                        value={values.institute}
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
                        value={values.department}
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
                <TotalSubmissions data={chartData} />
                <PendingAndSuccessfulSubmissions data={chartData} />
            </div>
        </div>
    )
}
