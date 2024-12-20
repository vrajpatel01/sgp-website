import { MdDelete } from "react-icons/md"
import { useGetHodWithPagination } from "../services/query"
import TableCell from "@/components/shared/table/tableCell"
import TableRow from "@/components/shared/table/tableRow"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import Pagination from "@/components/shared/pagination"
import Error from "@/components/shared/error"
import HodDeleteConfirmationModel from "../models/hodDeleteConfirmationModel"
import EditHodModel from "../models/editHodModel"
import { Sheet } from "@/components/ui/sheet"
import { Dialog } from "@/components/ui/dialog"


export default function HodData({ selectedItem, setSelectedItem }) {
    // const [selectedItem, setSelectedItem] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [hodDeleteModel, setHodDeleteModel] = useState(false)
    const [selectedHod, setSelectedHod] = useState({})
    const [editHodModel, setEditHodModel] = useState(false)
    const hods = useGetHodWithPagination(currentPage, 15)


    if (hods.isError) return <Error message="Having some problem to fetch data." />

    if (hods.isSuccess && hods?.data?.success === false) return <Error message="Currently not exists any account." />

    return (
        <>
            <div className="table-container mb-6 overflow-x-auto no-scroll bg-white rounded-md w-full my-5 border-border border-[.5px]">
                <table className="w-full table-auto">
                    <thead className="border-b-1 border-border">
                        <TableRow header>
                            {hods.isSuccess && <TableCell content="" />}
                            <TableCell content="Name" />
                            <TableCell content="Employee Number" />
                            <TableCell content="Email" />
                            <TableCell content="Phone Number" />
                            <TableCell content="Designation" />
                            <TableCell content="Institute" />
                            <TableCell content="Department" />
                        </TableRow>
                    </thead>
                    <tbody className="divide-y">
                        {hods.isLoading && Array(15).fill(0).map((_, index) => (
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
                        {hods.isSuccess && hods.isSuccess && hods?.data?.hods?.map((hod) => (
                            <TableRow
                                onClick={() => {
                                    setSelectedHod(hod)
                                    setEditHodModel(true)
                                }}
                                checkBox
                                onChange={(id, checked) => {
                                    if (checked) {
                                        setSelectedItem([...selectedItem, id])
                                    } else {
                                        setSelectedItem(selectedItem.filter(item => item !== id))
                                    }
                                }}
                                id={hod._id}
                                key={hod._id}>
                                <TableCell content={hod.name} />
                                <TableCell content={hod.employeeCode} />
                                <TableCell content={hod.email} />
                                <TableCell content={hod.mobileNumber} />
                                <TableCell content={hod.designation} />
                                <TableCell content={hod.institute.name} />
                                <TableCell content={hod.department.name} />
                            </TableRow>
                        ))}
                    </tbody>
                </table>
            </div >
            {hods.isSuccess && <Pagination
                totalPages={hods?.data?.totalPages}
                setCurrentPage={e => setCurrentPage(e.selected + 1)}
                currentPage={currentPage} />}
            <Dialog open={hodDeleteModel} onOpenChange={setHodDeleteModel}>
                <HodDeleteConfirmationModel data={hodDeleteModel} setData={setHodDeleteModel} id={selectedHod._id} deleteMode='single' />
            </Dialog>
            <Sheet open={editHodModel} onOpenChange={setEditHodModel}>
                <EditHodModel data={editHodModel} setData={setEditHodModel} currentUserData={selectedHod} setHodDeleteModel={setHodDeleteModel} />
            </Sheet>
        </>
    )
}