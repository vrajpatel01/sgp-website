import { useEffect, useState } from "react"
import { useGetAllInstitutes, useGetDepartments } from "../../institutes/services/query"
import { useEditHodAccount } from "../services/mutation"
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import addHodValidator from "@/app/validator/addHod.validator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function EditHodModel({ data, setData, currentUserData, setHodDeleteModel }) {
    const [hod, setHod] = useState({ institute: 'Select Institute', department: 'Select Department' })
    const institutes = useGetAllInstitutes()
    const departments = useGetDepartments(hod.institute, hod.institute !== '' && hod.institute !== 'Select Institute' ? true : false)
    const editHodAccount = useEditHodAccount()
    const form = useForm({
        resolver: zodResolver(addHodValidator),
        defaultValues: {
            name: currentUserData.name,
            employeeNumber: currentUserData.employeeCode,
            email: currentUserData.email,
            phoneNumber: currentUserData.mobileNumber,
            designation: currentUserData.designation,
            institute: currentUserData?.institute?._id,
            department: currentUserData?.department?._id,
        }
    })
    useEffect(() => {
        setHod({ institute: currentUserData?.institute?._id, department: currentUserData?.department?._id });
        form.setValue('name', currentUserData.name);
        form.setValue('employeeNumber', currentUserData.employeeCode);
        form.setValue('email', currentUserData.email);
        form.setValue('phoneNumber', currentUserData.mobileNumber);
        form.setValue('designation', currentUserData.designation);
        form.setValue('institute', currentUserData?.institute?._id);
        form.setValue('department', currentUserData?.department?._id);
    }, [currentUserData, form, currentUserData?.department, currentUserData.designation, currentUserData.email, currentUserData.employeeNumber, currentUserData?.institute, currentUserData.name, currentUserData.phoneNumber, currentUserData.subjectCode, currentUserData.subjectName])

    const onSubmit = (value) => {
        const data = {
            payload: {
                ...(currentUserData.name !== value.name && { name: value.name.trim() }),
                ...(currentUserData.employeeCode !== value.employeeNumber && { employeeCode: value.employeeNumber }),
                ...(currentUserData.email !== value.email && { email: value.email }),
                ...(currentUserData.mobileNumber !== value.phoneNumber && { mobileNumber: value.phoneNumber }),
                ...(currentUserData.designation !== value.designation && { designation: value.designation }),
                ...(currentUserData.institute._id !== value.institute && { institute: value.institute }),
                ...(currentUserData.department._id !== value.department) && { department: value.department },
            },
            id: currentUserData._id
        }
        editHodAccount.mutate(data, {
            onSuccess: () => {
                setData(false)
            }
        })

    }

    return (
        <SheetContent className="space-y-5 overflow-y-scroll">
            <SheetHeader>
                <SheetTitle>Edit account</SheetTitle>
                <SheetDescription>Edit hod account information</SheetDescription>
            </SheetHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="employeeNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Employee Number</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="designation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Designation</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="institute"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Institute</FormLabel>
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
                                <FormLabel>Department</FormLabel>
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

                    {/* <FormField
                        control={form.control}
                        name="subjectCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject Code</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="subjectName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} /> */}
                    <SheetFooter>
                        <Button
                            type="submit"
                            disabled={editHodAccount.isPending}
                            isLoading={editHodAccount.isPending}>
                            Change
                        </Button>
                    </SheetFooter>
                </form>
            </Form>
        </SheetContent>
    )
}