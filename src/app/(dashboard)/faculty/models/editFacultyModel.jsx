import { useEffect, useState } from "react"
import { useEditFacultyAccount } from "../services/mutation"
import { useGetAllInstitutes, useGetDepartments } from "../../institutes/services/query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import addFacultyValidator from "@/app/validator/addFaculty.validator"
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";

export default function EditFacultyModel({ data, setData, currentUserData, setFacultyDeleteModel }) {
    const [faculty, setFaculty] = useState({ institute: 'Select Institute', department: 'Select Department' })
    const institutes = useGetAllInstitutes()
    const departments = useGetDepartments(faculty.institute, faculty.institute !== '' && faculty.institute !== 'Select Institute' ? true : false)
    const editAccount = useEditFacultyAccount()

    const form = useForm({
        resolver: zodResolver(addFacultyValidator),
        defaultValues: {
            name: currentUserData.name,
            employeeNumber: currentUserData.employeeNumber,
            email: currentUserData.email,
            phoneNumber: currentUserData.phoneNumber,
            designation: currentUserData.designation,
            institute: currentUserData?.institute?._id,
            department: currentUserData?.department?._id,
            subjectCode: currentUserData.subjectCode,
            subjectName: currentUserData.subjectName
        }
    })

    console.log(currentUserData);

    useEffect(() => {
        setFaculty({ institute: currentUserData?.institute?._id, department: currentUserData?.department?._id })
        form.setValue('name', currentUserData.name)
        form.setValue('employeeNumber', currentUserData.employeeCode)
        form.setValue('email', currentUserData.email)
        form.setValue('phoneNumber', currentUserData.mobileNumber)
        form.setValue('designation', currentUserData.designation)
        form.setValue('institute', currentUserData?.institute?._id)
        form.setValue('department', currentUserData?.department?._id)
        form.setValue('subjectCode', currentUserData.subjectCode)
        form.setValue('subjectName', currentUserData.subjectName)
    }, [currentUserData, form])


    const onSubmit = value => {
        const data = {
            payload: {
                ...(currentUserData.name !== value.name && { name: value.name.trim() }),
                ...(currentUserData.employeeCode !== value.employeeNumber && { employeeCode: value.employeeNumber.trim() }),
                ...(currentUserData.email !== value.email && { email: value.email }),
                ...(currentUserData.mobileNumber !== value.phoneNumber && { mobileNumber: value.phoneNumber }),
                ...(currentUserData.designation !== value.designation && { designation: value.designation.trim() }),
                ...(currentUserData.institute._id !== value.institute && { institute: value.institute }),
                ...(currentUserData.department._id !== value.department) && { department: value.department },
                ...(currentUserData.subjectCode !== value.subjectCode && { subjectCode: value.subjectCode.trim() }),
                ...(currentUserData.subjectName !== value.subjectName && { subjectName: value.subjectName.trim() })
            },
            id: currentUserData._id
        }
        editAccount.mutate(data, {
            onSuccess: () => {
                setData(false)
            }
        })
    }

    return (
        <SheetContent className="space-y-5 overflow-y-scroll">
            <SheetHeader>
                <SheetTitle>Edit account</SheetTitle>
                <SheetDescription>Edit faculty account information</SheetDescription>
            </SheetHeader>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>name</FormLabel>
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
                                <FormLabel>employee number</FormLabel>
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
                                <FormLabel>email</FormLabel>
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
                                <FormLabel>phone number</FormLabel>
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
                                <FormLabel>designation</FormLabel>
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
                                <FormLabel>institute</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(value) => {
                                        setFaculty({ ...faculty, institute: value })
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

                    <FormField
                        control={form.control}
                        name="subjectCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>subject code</FormLabel>
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
                                <FormLabel>subject name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <SheetFooter>
                        <Button
                            type="submit"
                            disabled={editAccount.isPending}
                            isLoading={editAccount.isPending}>
                            change
                        </Button>
                    </SheetFooter>
                </form>
            </Form>
        </SheetContent>
    )
}