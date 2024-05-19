'use client';
import { useState } from "react";

// icons
import { PiStudent } from "react-icons/pi";
import { SiMicrosoftexcel } from "react-icons/si";

// components
import Button from "@/components/shared/button";
import SubMenuItem from "@/components/submenu/subMenuItem";
import AddStudentModel from "@/components/models/student/addStudent";

export default function Students() {

    const [addStudentButton, setAddStudentButton] = useState(false)
    const [addStudentModel, setAddStudentModel] = useState(false)

    return (
        <div>
            <div className="header flex justify-between items-center">
                <h1 className="text-title-28">Students</h1>
                <div className="relative">
                    <Button
                        onClick={() => setAddStudentButton(!addStudentButton)}
                        icon={<PiStudent className="text-xl" />}
                        width={null}
                        label='Add Student'
                        className="bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-md hover:border-1 hover:border-primary hover:bg-opacity-20 border-transparent border-1 transition-color duration-150 ease-in-out" />

                    <div className={`bg-white rounded-md shadow-sm top-full mt-2 right-0 w-[400px] ${addStudentButton ? 'absolute' : 'hidden'}`}>
                        <SubMenuItem
                            onClick={() => {
                                setAddStudentModel(true)
                                setAddStudentButton(false)
                            }}
                            icon={<PiStudent />}
                            label="Manuel Entry"
                            description='Enter One student at a time and add every details manually.' />
                        <SubMenuItem
                            icon={<SiMicrosoftexcel />}
                            label="Excel Sheet"
                            description='Upload Excel Sheet to add multiple students quickly.' />
                    </div>
                </div>
            </div>
            <AddStudentModel addStudentModel={addStudentModel} setAddStudentModel={setAddStudentModel} />
        </div>
    )
}