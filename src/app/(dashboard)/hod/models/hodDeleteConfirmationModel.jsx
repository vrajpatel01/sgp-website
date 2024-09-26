import { MdDelete } from "react-icons/md";
import { useDeleteHodAccount, useDeleteMultipleHodAccount } from "../services/mutation";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function HodDeleteConfirmationModel({ data, setData, id, deleteMode, setSelectedItem }) {

    const deleteAccount = useDeleteHodAccount()
    const deleteMultipleAccounts = useDeleteMultipleHodAccount()

    const handleFormSubmit = e => {
        e.preventDefault()

        if (deleteMode === 'single') {
            deleteAccount.mutate(id, {
                onSuccess: () => {
                    setData(false)
                }
            })
        } else if (deleteMode === 'multiple') {
            deleteMultipleAccounts.mutate(id, {
                onSuccess: () => {
                    setSelectedItem([])
                    setData(false)
                }
            })
        }
    }
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete account</DialogTitle>
                <DialogDescription>Are you sure you want to delete this Hod Account. Please note that this action cannot be undone.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} noValidate>
                <div className="flex justify-end">
                    <Button
                        variant="destructive"
                        isLoading={deleteAccount.isPending || deleteMultipleAccounts.isPending}
                        disabled={deleteAccount.isPending || deleteMultipleAccounts.isPending}>
                        Delete</Button>
                </div>
            </form>
        </DialogContent>
    )
}