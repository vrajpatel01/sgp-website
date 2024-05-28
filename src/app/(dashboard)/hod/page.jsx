'use client';
import { useEffect, useState } from "react";

// icons
import { TbUser } from "react-icons/tb";
import { SiMicrosoftexcel } from "react-icons/si";

// components
import Button from "@/components/shared/button";
import SubMenuItem from "@/components/submenu/subMenuItem";

// models
import AddHodByExcelModel from "@/app/(dashboard)/hod/models/addHodByExcelModel";
import HodData from "./components/hodData";
import { MdDelete } from "react-icons/md";
import HodDeleteConfirmationModel from "./models/hodDeleteConfirmationModel";
import AddHodModel from "./models/addHodModel";

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
                        <Button
                            onClick={() => setDeleteHodModel(true)}
                            icon={<MdDelete className="text-xl" />}
                            width={null}
                            label='Delete Accounts'
                            className="bg-secondary bg-opacity-10 text-secondary px-4 py-2 rounded-md hover:border-1 hover:border-secondary hover:bg-opacity-20 border-transparent border-1 transition-color duration-150 ease-in-out" /> :
                        <Button
                            onClick={() => setAddHodButton(!addHodButton)}
                            icon={<TbUser className="text-xl" />}
                            width={null}
                            label='Add Hod'
                            className="bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-md hover:border-1 hover:border-primary hover:bg-opacity-20 border-transparent border-1 transition-color duration-150 ease-in-out" />}

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
                    </div>
                </div>
            </div>
            <HodData selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <AddHodModel data={addHodModel} setData={setAddHodModel} />
            <AddHodByExcelModel data={addHodByExcelModel} setData={setAddHodByExcelModel} />
            <HodDeleteConfirmationModel data={deleteHodModel} setData={setDeleteHodModel} id={selectedItem} deleteMode='multiple' setSelectedItem={setSelectedItem} />
        </div>
    )
}