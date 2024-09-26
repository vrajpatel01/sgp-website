import { useState, useEffect } from "react"
import toast from "react-hot-toast"

// models
import PopUpModel from "@/components/models/popUpModel"

// icons
import { MdDelete } from "react-icons/md";

// components
import InputField from "@/components/shared/inputField"
import { Button } from "@/components/ui/button"

// network
import { useDeleteInstitute } from "../../services/mutation";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function InstituteDeleteConfirmationModel({ data, setData, refetch, instituteData }) {
    const [institute, setInstitute] = useState('')

    const deleteInstitute = useDeleteInstitute()

    useEffect(() => {
        if (deleteInstitute.isSuccess) {
            setData(false)
            setInstitute('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteInstitute.isSuccess]);

    const handleDeleteConfirmation = async (e) => {
        e.preventDefault()
        if (institute === '') {
            return toast.error('Enter the institute name to delete.')
        }
        if (institute !== instituteData.name) {
            return toast.error('Please match institute name to delete.')
        }
        deleteInstitute.mutate(instituteData.id)
    }
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogDescription>Enter the institute name <b>{instituteData.name}</b> to continue.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleDeleteConfirmation} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <Input
                        type='text'
                        placeholder='Institute Name'
                        value={institute}
                        disabled={deleteInstitute.isPending}
                        onChange={(e) => setInstitute(e.target.value)} />
                </div>
                <DialogDescription>Delete whole institute. if you delete this institute all department are also delete related to this institute.</DialogDescription>
                <DialogFooter className="flex justify-end items-center gap-4">
                    <Button
                        onClick={() => {
                            setInstitute('')
                            setData(false)
                        }}
                        variant="ghost"
                        disabled={deleteInstitute.isPending}
                        type="button">
                        Cancel
                    </Button>
                    <Button
                        label='Delete'
                        disabled={deleteInstitute.isPending}
                        isLoading={deleteInstitute.isPending}>
                        Delete
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent >
    )
}