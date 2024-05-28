'use client';
import { useState } from "react";

// icons
import { IoPeopleOutline } from "react-icons/io5";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdDelete } from "react-icons/md";


// models
import AddFacultyModel from "@/app/(dashboard)/faculty/models/addFacultyModel";
import AddFacultyByExcelModel from "@/app/(dashboard)/faculty/models/addFacultyByExcelModel";

// components
import SubMenuItem from "@/components/submenu/subMenuItem";
import Button from "@/components/shared/button";
import FacultyData from "./components/facultyData";
import FacultyDeleteConfirmationModel from "./models/facultyDeleteConfirmationModel";

export default function Faculty() {
    const [addFacultyButton, setAddFacultyButton] = useState(false)
    const [addFacultyModel, setAddFacultyModel] = useState(false)
    const [addFacultyByExcelModel, setAddFacultyByExcelModel] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])
    const [deleteFacultyModel, setDeleteFacultyModel] = useState(false)

    return (
        <div className="h-full">
            <div className="header flex justify-between items-center">
                <h1 className="text-title-28">Faculty</h1>
                <div className="relative">
                    {selectedItem.length > 0 ?
                        <Button
                            onClick={() => setDeleteFacultyModel(true)}
                            icon={<MdDelete className="text-xl" />}
                            width={null}
                            label='Delete Accounts'
                            className="bg-secondary bg-opacity-10 text-secondary px-4 py-2 rounded-md hover:border-1 hover:border-secondary hover:bg-opacity-20 border-transparent border-1 transition-color duration-150 ease-in-out" /> :
                        <Button
                            onClick={() => setAddFacultyButton(!addFacultyButton)}
                            icon={<IoPeopleOutline className="text-xl" />}
                            width={null}
                            label='Add Faculty'
                            className="bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-md hover:border-1 hover:border-primary hover:bg-opacity-20 border-transparent border-1 transition-color duration-150 ease-in-out" />}

                    <div className={`bg-white rounded-md shadow-sm top-full mt-2 right-0 sm:w-[400px] z-20 ${addFacultyButton ? 'absolute' : 'hidden'}`}>
                        <SubMenuItem
                            onClick={() => {
                                setAddFacultyModel(true)
                                setAddFacultyButton(false)
                            }}
                            icon={<IoPeopleOutline />}
                            label="Manuel Entry"
                            description='Enter One faculty at a time and add every details manually.' />
                        <SubMenuItem
                            onClick={() => {
                                setAddFacultyByExcelModel(true)
                                setAddFacultyButton(false)
                            }}
                            icon={<SiMicrosoftexcel />}
                            label="Excel Sheet"
                            description='Upload Excel Sheet to add multiple faculty quickly.' />
                    </div>
                </div>
            </div>
            <FacultyData selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <AddFacultyModel data={addFacultyModel} setData={setAddFacultyModel} />
            <AddFacultyByExcelModel data={addFacultyByExcelModel} setData={setAddFacultyByExcelModel} />
            <FacultyDeleteConfirmationModel data={deleteFacultyModel} setData={setDeleteFacultyModel} deleteMode='multiple' id={selectedItem} setSelectedItem={setSelectedItem} />
        </div>
    )
}