import { MdDelete } from "react-icons/md"
import { useGetFaulty } from "../services/query"
import TableCell from "@/components/shared/table/tableCell"
import TableRow from "@/components/shared/table/tableRow"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"


export default function FacultyData() {
    const [selectedItem, setSelectedItem] = useState([])
    const faculties = useGetFaulty()
    return (
        <div className="table-container mb-6 overflow-x-auto no-scroll  bg-white rounded-md w-full h-full my-5 border-border border-[.5px]">
            <table className="w-full h-full table-auto">
                <thead className="border-b-1 border-border">
                    <TableRow header>
                        {faculties.isSuccess && <TableCell content="" />}
                        <TableCell content="Name" />
                        <TableCell content="Employee Number" />
                        <TableCell content="Email" />
                        <TableCell content="Phone Number" />
                        <TableCell content="Institute" />
                        <TableCell content="Department" />
                        <TableCell content="Subject Name" />
                        <TableCell content="Subject Code" />
                        {faculties.isSuccess && <TableCell content="" />}
                    </TableRow>
                </thead>
                <tbody className="divide-y">
                    {faculties.isLoading && Array(15).fill(0).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell content={<Skeleton height={30} width={300} />} />
                            <TableCell content={<Skeleton height={30} width={300} />} />
                            <TableCell content={<Skeleton height={30} width={300} />} />
                            <TableCell content={<Skeleton height={30} width={300} />} />
                            <TableCell content={<Skeleton height={30} width={300} />} />
                            <TableCell content={<Skeleton height={30} width={300} />} />
                            <TableCell content={<Skeleton height={30} width={300} />} />
                            <TableCell content={<Skeleton height={30} width={300} />} />
                        </TableRow>
                    ))}
                    {faculties.isSuccess && faculties.isSuccess && faculties?.data?.faculties?.map((faculty) => (
                        <TableRow
                            checkBox
                            onChange={(id, checked) => {
                                if (checked) {
                                    setSelectedItem([...selectedItem, id])
                                } else {
                                    setSelectedItem(selectedItem.filter(item => item !== id))
                                }
                            }}
                            id={faculty._id}
                            key={faculty._id}>
                            <TableCell content={faculty.name} />
                            <TableCell content={faculty.employeeCode} />
                            <TableCell content={faculty.email} />
                            <TableCell content={faculty.mobileNumber} />
                            <TableCell content={faculty.institute.name} />
                            <TableCell content={faculty.department.name} />
                            <TableCell content={faculty.subjectName} />
                            <TableCell content={faculty.subjectCode} />
                            <td className="p-3 whitespace-nowrap px-3 text-2xl !text-red-500"><MdDelete /></td>
                        </TableRow>
                    ))}
                </tbody>
            </table>
        </div >
    )
}