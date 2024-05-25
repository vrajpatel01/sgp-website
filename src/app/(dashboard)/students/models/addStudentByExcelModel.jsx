import SideModel from "@/components/models/sideModel";

// icons
import { IoAddCircleOutline } from "react-icons/io5";
import { MdSimCardDownload } from "react-icons/md";

// components
import Button from "@/components/shared/button";


export default function AddStudentByExcelModel({ data, setData }) {

    return (
        <SideModel toggle={data} setToggle={() => setData(!data)}>
            <div className="px-5 py-7 sm:p-6 overflow-x-scroll h-full flex justify-between flex-col">
                <h1 className="text-title-24 mb-4">Upload Excel</h1>
                {/* <p>Upload Excel file to add multiple students at a time.</p> */}
                <div className="flex flex-col gap-5">
                    <div className="flex justify-start items-start w-full p-3 min-w-[300px] border-1 border-dashed rounded-md border-border cursor-pointer gap-3">
                        <div className="p-5 bg-secondary-background rounded-full">
                            <MdSimCardDownload className="text-3xl" />
                        </div>
                        <div>
                            <h1 className="text-body-16 text-primary-text">Download Excel</h1>
                            <p className="text-detail-14 text-light-text leading-4">Download sample excel sheet to <br /> upload proper formate.</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center flex-col w-full p-10 min-w-[300px] border-1 rounded-md border-border cursor-pointer ">
                        <IoAddCircleOutline className="text-3xl" />
                        <p className="text-detail-14 text-light-text">Click to choose file</p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <Button
                            type="button"
                            label='Cancel'
                            className='min-w-full'
                            onClick={() => setData(false)} />

                        <Button
                            label='Upload'
                            className='min-w-full bg-primary text-white' />
                    </div>
                </div>
            </div>
        </SideModel>
    );
}