// icons
import { IoAddCircleOutline } from "react-icons/io5";
import { MdSimCardDownload } from "react-icons/md";

// components
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRef, useState } from "react";
import { useGetAllInstitutes, useGetDepartments } from "../../institutes/services/query";
import { useCreateAccountByCSV } from "../../hod/services/mutation";


export default function AddFacultyByExcelModel({ data, setData }) {

    const uploader = useRef();
    const [hod, setHod] = useState({ institute: 'Select Institute', department: 'Select Department' })
    const [file, setFile] = useState(null)
    const institutes = useGetAllInstitutes()
    const departments = useGetDepartments(hod.institute, hod.institute !== '' && hod.institute !== 'Select Institute' ? true : false)
    const createAccount = useCreateAccountByCSV();

    const form = useForm({
        defaultValues: {
            file: null,
            institute: '',
            department: ''
        }
    })

    const onSubmit = (value) => {
        const data = {
            file: value.file,
            institute: value.institute,
            department: value.department,
            role: 'faculty'
        }
        createAccount.mutate(data, {
            onSuccess: (data) => {
                if (data.success) {
                    form.reset()
                    return setData(false)
                }
            },
            onError: (error) => {
                if (!error.response.data.success) {
                    toast.error(error.response.data.message)
                }
            }
        })
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            form.setValue("file", file);
        }
    };

    return (
        <SheetContent className="space-y-5 overflow-y-scroll">
            <SheetHeader>
                <SheetTitle>Add account</SheetTitle>
                <SheetDescription>add multiple account at ones by uploading excel.</SheetDescription>
            </SheetHeader>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5">
                        <a href="/csv/faculty.csv" target="_blank" download className="flex justify-start items-start w-full p-3 min-w-[300px] border-1 border-dashed rounded-md border-border cursor-pointer gap-3">
                            <div className="p-5 bg-secondary-background rounded-full">
                                <MdSimCardDownload className="text-3xl" />
                            </div>
                            <div>
                                <h1 className="text-body-16 text-primary-text">Download Excel</h1>
                                <p className="text-detail-14 text-light-text leading-4">Download sample excel sheet to <br /> upload proper formate.</p>
                            </div>
                        </a>
                        <input onChange={handleFileChange} ref={uploader} type="file" name="file" id="file" accept=".csv" hidden />
                        <div onClick={() => { if (uploader.current) uploader.current.click(); }} className="flex justify-center items-center flex-col w-full p-10 min-w-[300px] border-1 rounded-md border-border cursor-pointer ">
                            <IoAddCircleOutline className="text-3xl" />
                            <p className="text-detail-14 text-light-text">{!file
                                ? 'Click to choose file'
                                : file.name
                            }</p>
                        </div>
                        <FormField
                            control={form.control}
                            name="institute"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>institute</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={(value) => {
                                            setHod({ ...hod, institute: value })
                                            form.setValue('institute', value)
                                        }} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select institute" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {institutes.isSuccess && institutes.data.institutes.map(institute => (
                                                    <SelectItem key={institute._id} value={institute._id}>{institute.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>department</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {departments.isSuccess && departments.data.departments.map(department => (
                                                    <SelectItem key={department._id} value={department._id}>{department.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <SheetFooter>
                            <Button
                                type="submit"
                                disabled={file == null || createAccount.isPending}
                                isLoading={createAccount.isPending}>
                                Add accounts
                            </Button>
                        </SheetFooter>
                    </div>
                </form>
            </Form>
        </SheetContent >
    );
}