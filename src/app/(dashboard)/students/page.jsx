'use client';
import { useState } from "react";

// icons
import { PiStudent } from "react-icons/pi";
import { SiMicrosoftexcel } from "react-icons/si";

// components
import SubMenuItem from "@/components/submenu/subMenuItem";
import AddStudentModel from "@/app/(dashboard)/students/models/addStudentModel";
import AddStudentByExcelModel from "@/app/(dashboard)/students/models/addStudentByExcelModel";
import StudentData from "./components/studentData";
import StudentDeleteConfirmationModel from "./models/studentDeleteConfirmationModel";
import { MdDelete } from "react-icons/md";
import { Sheet } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IoPeopleOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Students() {

    const [addStudentButton, setAddStudentButton] = useState(false)
    const [addStudentModel, setAddStudentModel] = useState(false)
    const [addStudentByExcelModel, setAddStudentByExcelModel] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])
    const [deleteStudentModel, setDeleteStudentModel] = useState(false)

    return (
        <div className="h-full">
            <div className="header flex justify-between items-center">
                <h1 className="text-title-28">Students</h1>

                <div className="relative">
                    {selectedItem.length > 0 ?
                        <Dialog open={deleteStudentModel} onOpenChange={setDeleteStudentModel}>
                            <DialogTrigger asChild>
                                <Button variant="destructive" className="flex gap-3 items-center" onClick={() => setDeleteStudentModel(true)} >
                                    <MdDelete className="text-xl" />
                                    <span>Delete Account</span>
                                </Button>
                            </DialogTrigger>
                            <StudentDeleteConfirmationModel
                                data={deleteStudentModel}
                                setData={setDeleteStudentModel}
                                deleteMode='multiple'
                                id={selectedItem}
                                setSelectedItem={setSelectedItem} />
                        </Dialog>
                        :
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="flex gap-3 items-center" >
                                    <IoPeopleOutline className="text-xl" />
                                    <span>Add Account</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mr-4">
                                <DropdownMenuLabel>Choose a method to add Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => {
                                    setAddStudentModel(true)
                                }} className="space-x-3"><IoPeopleOutline /><span>Create One</span></DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    setAddStudentByExcelModel(true)
                                }} className="space-x-3"><SiMicrosoftexcel /><span>Insert Excel</span></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>}

                </div>
            </div>
            <StudentData selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <Sheet open={addStudentModel} onOpenChange={setAddStudentModel}>
                <AddStudentModel data={addStudentModel} setData={setAddStudentModel} />
            </Sheet>
            <Sheet open={addStudentByExcelModel} onOpenChange={setAddStudentByExcelModel}>
                <AddStudentByExcelModel data={addStudentByExcelModel} setData={setAddStudentByExcelModel} />
            </Sheet>
        </div>
    )
}