
import { IoAddCircleOutline } from "react-icons/io5";
import { MdSimCardDownload } from "react-icons/md";

// components
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


export default function AddStudentByExcelModel({ data, setData }) {

    return (
        <SheetContent className="space-y-5 overflow-y-scroll">
            <SheetHeader>
                <SheetTitle>Add account</SheetTitle>
                <SheetDescription>add multiple account at ones by uploading excel.</SheetDescription>
            </SheetHeader>
            <Separator />
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
                <SheetFooter>
                    {/* <Button
                        variant="ghost"
                        type="button"
                        onClick={() => {
                            return setData(false)
                        }}>
                        Cancel
                    </Button> */}
                    <Button
                        type="submit"
                    // disabled={addHod.isPending}
                    // isLoading={addHod.isPending}
                    >
                        Add accounts
                    </Button>
                </SheetFooter>
            </div>
        </SheetContent>
    );
}