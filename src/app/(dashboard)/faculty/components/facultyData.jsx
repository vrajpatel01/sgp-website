import { useState } from "react"
import Skeleton from "react-loading-skeleton"

// components
import TableCell from "@/components/shared/table/tableCell"
import TableRow from "@/components/shared/table/tableRow"
import Pagination from "@/components/shared/pagination"
import Error from "@/components/shared/error"

// models
import FacultyDeleteConfirmationModel from "../models/facultyDeleteConfirmationModel"
import EditFacultyModel from "../models/editFacultyModel"

// network
import { useGetFaultyWithPagination } from "../services/query"

export default function FacultyData({ selectedItem, setSelectedItem }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [facultyDeleteModel, setFacultyDeleteModel] = useState(false)
    const [selectedFaculty, setSelectedFaculty] = useState({})
    const [editFacultyModel, setEditFacultyModel] = useState(false)
    const faculties = useGetFaultyWithPagination(currentPage, 15)

    if (faculties.isError) return <Error message="Having some problem to fetch data." />

    return (
        <>
            <div className="table-container mb-6 overflow-x-auto no-scroll  bg-white rounded-md w-full my-5 border-border border-[.5px]">
                <table className="w-full">
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
                                onClick={() => {
                                    setEditFacultyModel(true)
                                    setSelectedFaculty(faculty)
                                }}
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
                            </TableRow>
                        ))}
                    </tbody>
                </table>
            </div >
            {faculties.isSuccess && <Pagination
                totalPages={faculties?.data?.totalPages}
                setCurrentPage={e => setCurrentPage(e.selected + 1)}
                currentPage={currentPage} />}
            <FacultyDeleteConfirmationModel data={facultyDeleteModel} setData={setFacultyDeleteModel} id={selectedFaculty._id} deleteMode="single" />
            <EditFacultyModel data={editFacultyModel} setData={setEditFacultyModel} currentUserData={selectedFaculty} setFacultyDeleteModel={setFacultyDeleteModel} />
        </>
    )
}