import { useState } from "react";


// components
import SideModel from "../sideModel";
import InputField from "@/components/shared/inputField";
import Button from "@/components/shared/button";

// icons
import { MdDelete } from "react-icons/md";


export default function EditInstitute({ data, setData }) {
    const [institute, setInstitute] = useState('')

    const handleFormSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <SideModel toggle={data} setToggle={() => setData(!data)}>
            <form onSubmit={handleFormSubmit} className="px-5 py-7 sm:p-6 overflow-x-scroll h-full flex justify-between flex-col" noValidate>
                <div>
                    <h1 className="text-title-24 mb-4">Institute</h1>
                    <div className="flex flex-col gap-5">
                        <InputField onChange={e => setInstitute(e.target.value)}
                            value={institute}
                            className='min-w-full sm:min-w-[300px]'
                            title='Name' />
                        <div className="flex justify-start items-start w-full p-3 sm:max-w-[300px] leading-5 rounded-md border-secondary bg-secondary bg-opacity-5 border-1 border-opacity-50 gap-3">
                            <div className="flex flex-col gap-4">
                                <h1 className="text-body-14 text-pri text-light-text">Delete whole institute. if you delete this institute all department are also delete related to this institute.</h1>
                                <div className="flex justify-end">
                                    <Button label='Delete' className='bg-secondary bg-opacity-20 text-secondary' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-5 mt-5">
                    <Button
                        type="button"
                        label='Cancel'
                        className='min-w-full'
                        onClick={() => setData(false)} />

                    <Button
                        label='Edit'
                        className='min-w-full bg-primary text-white' />
                </div>
            </form>
        </SideModel>
    )
}