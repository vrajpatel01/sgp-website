// components
import PopUpModel from "@/components/models/popUpModel";
import Button from "@/components/shared/button";

// icons
import { MdDelete } from "react-icons/md";

// network
import { useDeleteMultipleStudentsAccount, useDeleteStudentAccount } from "../services/mutation";

export default function StudentDeleteConfirmationModel({ data, setData, id, deleteMode, setSelectedItem }) {

    const deleteAccount = useDeleteStudentAccount()
    const deleteMultipleAccounts = useDeleteMultipleStudentsAccount()

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
        <PopUpModel toggle={data} setToggle={setData}>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4" noValidate>
                <h1 className="text-title-24">Delete Account</h1>
                <div className="flex justify-end gap-5 flex-col">
                    <p className="w-full sm:max-w-[330px] text-body-16 leading-5 text-light-text text-left">
                        Are you sure you want to delete this Hod Account. Please note that this action cannot be undone.
                    </p>
                    <div className="flex justify-center items-center gap-3">
                        <Button
                            label='Cancel'
                            onClick={() => {
                                setData(false)
                            }}
                            type="button"
                            className='!rounded-full w-full sm:min-w-[130px]'
                        />
                        <Button
                            label='Delete'
                            icon={<MdDelete />}
                            isLoading={deleteAccount.isPending || deleteMultipleAccounts.isPending}
                            disabled={deleteAccount.isPending || deleteMultipleAccounts.isPending}
                            className='bg-primary text-white !rounded-full whitespace-nowrap w-full sm:min-w-[130px] disabled:bg-opacity-90 hover:bg-secondary transition-colors duration-200 ease-in-out'
                        />
                    </div>
                </div>
            </form>
        </PopUpModel>
    )
}