import { useState, useId, useRef, useEffect } from "react"
import toast from "react-hot-toast";

// icons
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";

// validators
import isEmpty from "@/services/validator/isEmpty";

// network
import { useDeleteDepartment, useUpdateDepartment } from "../services/mutation";
import { Loader2 } from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function DepartmentItem({ onClick, title, isNew = false, instituteId, departmentData }) {
    const [isEditable, setIsEditable] = useState(!isNew && title === '')
    const [departmentTitle, setDepartmentTitle] = useState(title)
    const departmentItemId = useId()
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [isEditable])

    const deleteDepartment = useDeleteDepartment()
    const updateDepartment = useUpdateDepartment()

    const handleSubmitByEnter = (e) => {
        if (e.key === 'Enter') {
            handleDepartmentSubmit();
        }
    }

    const handleDepartmentSubmit = () => {
        try {
            if (isEmpty(departmentTitle)) {
                setIsEditable(false)
                updateDepartment.mutate({
                    departmentId: departmentData._id,
                    instituteId: instituteId,
                    departmentName: departmentTitle
                })
            }
        } catch (error) {
            if (error.code === 'EMPTY')
                toast.error('Department title cannot be empty')
        }
    }
    return (
        <div onClick={onClick} className="w-full rounded-md border-border border-1 px-3 py-4 bg-secondary-background flex justify-between items-center">
            <input
                ref={inputRef}
                value={departmentTitle}
                disabled={!isEditable}
                onChange={e => setDepartmentTitle(e.target.value)}
                onKeyDown={handleSubmitByEnter}
                className="bg-transparent outline-none border-none w-full"
                type="text"
                name="department"
                id={departmentItemId} />
            <div className="flex gap-3">
                <div className="text-lg cursor-pointer" >
                    {updateDepartment.isPending ? <AiOutlineLoading3Quarters size={16} className="animate-spin" /> :
                        isEditable ? <MdOutlineDone onClick={handleDepartmentSubmit} /> :
                            <MdModeEditOutline onClick={() => setIsEditable(true)} />}
                </div>
                <MdDelete onClick={() => deleteDepartment.mutate({
                    departmentId: departmentData._id,
                    instituteId
                })} className="text-lg text-red-500 cursor-pointer" />
            </div>
        </div>
    )
}