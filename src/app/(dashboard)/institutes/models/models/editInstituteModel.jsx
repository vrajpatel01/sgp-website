import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// components
import InputField from "@/components/shared/inputField";
import Button from "@/components/shared/button";

// models
import SideModel from "@/components/models/sideModel";

// icons
// import { MdDelete } from "react-icons/md";

// validator
import isEmpty from "@/services/validator/isEmpty";

// network
import { useUpdateInstitute } from "../../services/mutation";


export default function EditInstitute({ data, setData, instituteData, refetch, setInstituteDeleteConfirmationModel }) {
    const [institute, setInstitute] = useState('')
    useEffect(() => { setInstitute(instituteData.name) }, [instituteData])

    const updateInstitute = useUpdateInstitute()

    useEffect(() => {
        if (updateInstitute.isSuccess) {
            setInstitute('')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateInstitute.isSuccess])


    const handleFormSubmit = (e) => {
        e.preventDefault()
        try {
            const instituteNameValidator = isEmpty(institute)
            if (instituteNameValidator) {
                updateInstitute.mutate({ instituteId: instituteData.id, name: institute })
            }
        } catch (error) {
            if (error.code == 'EMPTY')
                return toast.error('Institute name is required')
            toast.error(error.message)
        }
    }
    return (
        <SideModel toggle={data} setToggle={() => setData(!data)}>
            <form onSubmit={handleFormSubmit} className="px-5 py-7 sm:p-6 overflow-x-scroll h-full flex justify-between gap-5 flex-col" noValidate>
                <div className="flex flex-col gap-5">
                    <h1 className="text-title-24 mb-4">Institute</h1>
                    <InputField onChange={e => setInstitute(e.target.value)}
                        value={institute}
                        className='min-w-full sm:min-w-[300px]'
                        title='Name' />
                    <div className="w-full grid grid-cols-2 gap-5">
                        <Button
                            type="button"
                            label='Cancel'
                            className='min-w-full'
                            onClick={() => setData(false)} />

                        <Button
                            label='Edit'
                            className='min-w-full bg-primary text-white' />
                    </div>
                </div>
                <div className="flex justify-start items-start w-full p-3 sm:max-w-[300px] leading-5 rounded-md border-secondary bg-secondary bg-opacity-5 border-1 border-opacity-50 gap-3">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-body-14 text-pri text-light-text">Delete whole institute. if you delete this institute all department are also delete related to this institute.</h1>
                        <div className="flex justify-end">
                            <Button
                                onClick={() => {
                                    setData(false)
                                    setInstituteDeleteConfirmationModel(true)
                                }}
                                label='Delete'
                                type="button"
                                className='bg-secondary bg-opacity-20 text-secondary' />
                        </div>
                    </div>
                </div>
            </form>
        </SideModel>
    )
}