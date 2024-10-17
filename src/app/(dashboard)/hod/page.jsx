'use client';
import { useEffect, useState } from "react";

// icons
import { TbUser } from "react-icons/tb";
import { SiMicrosoftexcel } from "react-icons/si";

// components
import SubMenuItem from "@/components/submenu/subMenuItem";

// models
import AddHodByExcelModel from "@/app/(dashboard)/hod/models/addHodByExcelModel";
import HodData from "./components/hodData";
import { MdDelete } from "react-icons/md";
import HodDeleteConfirmationModel from "./models/hodDeleteConfirmationModel";
import AddHodModel from "./models/addHodModel";
import { Sheet } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IoPeopleOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Hod() {

    const [addHodButton, setAddHodButton] = useState(false)
    const [addHodModel, setAddHodModel] = useState(false)
    const [addHodByExcelModel, setAddHodByExcelModel] = useState(false)
    const [deleteHodModel, setDeleteHodModel] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])

    return (
        <div className="h-full">
            <div className="header flex justify-between items-center">
                <h1 className="text-title-28">Hod</h1>
                <div className="relative">
                    {selectedItem.length > 0 ?
                        <Dialog open={deleteHodModel} onOpenChange={setDeleteHodModel}>
                            <DialogTrigger asChild>
                                <Button variant="destructive" className="flex gap-3 items-center" onClick={() => setDeleteHodModel(true)} >
                                    <MdDelete className="text-xl" />
                                    <span>Delete Account</span>
                                </Button>
                            </DialogTrigger>
                            <HodDeleteConfirmationModel data={deleteHodModel} setData={setDeleteHodModel} id={selectedItem} deleteMode='multiple' setSelectedItem={setSelectedItem} />
                        </Dialog> :
                        <div className="flex justify-center items-center gap-5">
                            <Link href='/search?role=hod' className="bg-gray-200 p-3 rounded-md cursor-pointer">
                                <Search size={17} />
                            </Link>
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
                                        setAddHodModel(true)
                                    }} className="space-x-3"><IoPeopleOutline /><span>Create One</span></DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {
                                        setAddHodByExcelModel(true)
                                    }} className="space-x-3"><SiMicrosoftexcel /><span>Insert Excel</span></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>}


                    {/* 
                    <div className={`bg-white rounded-md shadow-sm top-full mt-2 right-0 sm:w-[400px] ${addHodButton ? 'absolute' : 'hidden'}`}>
                            <SubMenuItem
                                onClick={() => {
                                    setAddHodModel(true)
                                    setAddHodButton(false)
                                }}
                                icon={<TbUser />}
                                label="Manuel Entry"
                                description='Enter One hod at a time and add every details manually.' />
                            <SubMenuItem
                                onClick={() => {
                                    setAddHodByExcelModel(true)
                                    setAddHodButton(false)
                                }}
                                icon={<SiMicrosoftexcel />}
                                label="Excel Sheet"
                                description='Upload Excel Sheet to add multiple hod quickly.' />
                        </div> */}
                </div>
            </div>
            <HodData selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <Sheet open={addHodModel} onOpenChange={setAddHodModel}>
                <AddHodModel data={addHodModel} setData={setAddHodModel} />
            </Sheet>
            <Sheet open={addHodByExcelModel} onOpenChange={setAddHodByExcelModel}>
                <AddHodByExcelModel data={addHodByExcelModel} setData={setAddHodByExcelModel} />
            </Sheet>
        </div>
    )
}