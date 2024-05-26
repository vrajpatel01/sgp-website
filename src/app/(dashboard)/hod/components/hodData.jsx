import { MdDelete } from "react-icons/md"
import { useGetHodWithPagination } from "../services/query"
import TableCell from "@/components/shared/table/tableCell"
import TableRow from "@/components/shared/table/tableRow"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import Pagination from "@/components/shared/pagination"
import Error from "@/components/shared/error"


export default function HodData() {
    const [selectedItem, setSelectedItem] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const hod = useGetHodWithPagination(currentPage, 15)

    if (hod.isError) return <Error message="Having some problem to fetch data." />

    return (
        <>
            <div className="table-container mb-6 overflow-x-auto no-scroll  bg-white rounded-md w-full my-5 border-border border-[.5px]">
                <table className="w-full table-auto">
                    <thead className="border-b-1 border-border">
                        <TableRow header>
                            {hod.isSuccess && <TableCell content="" />}
                            <TableCell content="Name" />
                            <TableCell content="Enrollment Number" />
                            <TableCell content="Email" />
                            <TableCell content="Phone Number" />
                            <TableCell content="Institute" />
                            <TableCell content="Department" />
                            {hod.isSuccess && <TableCell content="" />}
                        </TableRow>
                    </thead>
                    <tbody className="divide-y">
                        {hod.isLoading && Array(15).fill(0).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                            </TableRow>
                        ))}
                        {hod.isSuccess && hod.isSuccess && hod?.data?.hods?.map((hods) => (
                            <TableRow
                                checkBox
                                onChange={(id, checked) => {
                                    if (checked) {
                                        setSelectedItem([...selectedItem, id])
                                    } else {
                                        setSelectedItem(selectedItem.filter(item => item !== id))
                                    }
                                }}
                                id={hods._id}
                                key={hods._id}>
                                <TableCell content={hods.name} />
                                <TableCell content={hods.employeeCode} />
                                <TableCell content={hods.email} />
                                <TableCell content={hods.mobileNumber} />
                                <TableCell content={hods.institute.name} />
                                <TableCell content={hods.department.name} />
                                <td className="p-3 whitespace-nowrap px-3 text-2xl !text-red-500"><MdDelete /></td>
                            </TableRow>
                        ))}
                    </tbody>
                </table>
            </div >
            {hod.isSuccess && <Pagination
                totalPages={hod?.data?.totalPages}
                setCurrentPage={e => setCurrentPage(e.selected + 1)}
                currentPage={currentPage} />}
        </>
    )
}