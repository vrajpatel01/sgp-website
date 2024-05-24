import { useState, useEffect } from "react"
import toast from "react-hot-toast"

// models
import PopUpModel from "@/components/models/popUpModel"

// icons
import { MdDelete } from "react-icons/md";

// components
import InputField from "@/components/shared/inputField"
import Button from "@/components/shared/button"
import { useDeleteInstitute } from "@/services/network/mutation"

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
        <PopUpModel
            toggle={data}
            setToggle={setData}>
            <form onSubmit={handleDeleteConfirmation} className="flex flex-col gap-5">
                <div className="flex justify-start items-center gap-2">
                    <MdDelete className="text-2xl" />
                    <h1 className="text-title-24">Confirmation</h1>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="min-w-full sm:w-[350px] text-body-16 leading-5">Enter the institute name <b>{instituteData.name}</b> to continue.</div>
                    <InputField
                        type='text'
                        placeholder='Institute Name'
                        value={institute}
                        disabled={deleteInstitute.isPending}
                        className='min-w-full sm:min-w-[350px]'
                        onChange={(e) => setInstitute(e.target.value)}
                    />
                    <div className="w-full sm:w-[350px] text-sm sm:text-center leading-5">
                        Delete whole institute. if you delete this institute all department are also delete related to this institute.
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button
                        label='Cancel'
                        onClick={() => {
                            setInstitute('')
                            setData(false)
                        }}
                        disabled={deleteInstitute.isPending}
                        type="button"
                        className='!rounded-full w-full sm:min-w-[130px]'
                    />
                    <Button
                        label='Delete'
                        disabled={deleteInstitute.isPending}
                        isLoading={deleteInstitute.isPending}
                        className='bg-secondary text-white !rounded-full whitespace-nowrap w-full sm:min-w-[130px] disabled:bg-opacity-90'
                    />
                </div>
            </form>
        </PopUpModel>
    )
}