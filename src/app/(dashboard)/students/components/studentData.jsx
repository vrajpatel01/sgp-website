import { useState } from "react"
import Skeleton from "react-loading-skeleton"
// components
import Pagination from "@/components/shared/pagination"
import TableCell from "@/components/shared/table/tableCell"
import TableRow from "@/components/shared/table/tableRow"

// network
import { useGetStudentWithPagination } from "../services/query"

// icons
import { MdDelete } from "react-icons/md"

export default function StudentData() {
    const [selectedItem, setSelectedItem] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const students = useGetStudentWithPagination(currentPage, 15)

    return (
        <>
            <div className="table-container mb-6 overflow-x-auto no-scroll  bg-white rounded-md w-full h-full my-5 border-border border-[.5px]">
                <table className="w-full h-full table-auto">
                    <thead className="border-b-1 border-border">
                        <TableRow header>
                            {students.isSuccess && <TableCell content="" />}
                            <TableCell content="Name" />
                            <TableCell content="Enrollment" />
                            <TableCell content="Email" />
                            <TableCell content="Phone Number" />
                            <TableCell content="Institute" />
                            <TableCell content="Department" />
                            <TableCell content="Division" />
                            {students.isSuccess && <TableCell content="" />}
                        </TableRow>
                    </thead>
                    <tbody className="divide-y">
                        {students.isLoading && Array(15).fill(0).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                            </TableRow>
                        ))}
                        {students.isSuccess && students.isSuccess && students?.data?.students?.map((student) => (
                            <TableRow
                                checkBox
                                onChange={(id, checked) => {
                                    if (checked) {
                                        setSelectedItem([...selectedItem, id])
                                    } else {
                                        setSelectedItem(selectedItem.filter(item => item !== id))
                                    }
                                }}
                                id={student._id}
                                key={student._id}>
                                <TableCell content={student.name} />
                                <TableCell content={student.rollNumber} />
                                <TableCell content={student.email} />
                                <TableCell content={student.phoneNumber} />
                                <TableCell content={student.institute.name} />
                                <TableCell content={student.department.name} />
                                <TableCell content={student.division} />
                                <td className="p-3 whitespace-nowrap px-3 text-2xl !text-red-500"><MdDelete /></td>
                            </TableRow>
                        ))}
                    </tbody>
                </table>
            </div >
            {students.isSuccess && <Pagination
                totalPages={students?.data?.totalPages}
                setCurrentPage={e => setCurrentPage(e.selected + 1)}
                currentPage={currentPage} />}
        </>
    )
}
