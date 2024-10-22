import { useEffect, useState } from "react"
import { useGetAllInstitutes, useGetDepartments } from "../../institutes/services/query"

// network
import { useEditStudentAccount } from "../services/mutation"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import addStudentValidator from "@/app/validator/addStudent.validator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

export default function EditStudentModel({ data, setData, currentUserData, setStudentDeleteModel }) {
    const [student, setStudent] = useState({ institute: 'Select Institute', department: 'Select Department' })
    const institutes = useGetAllInstitutes()
    const departments = useGetDepartments(student.institute, student.institute !== undefined && student.institute !== 'Select Institute' ? true : false)
    const editAccount = useEditStudentAccount()

    const form = useForm({
        resolver: zodResolver(addStudentValidator),
        defaultValues: {
            name: currentUserData?.name,
            rollNumber: currentUserData?.rollNumber,
            email: currentUserData?.email,
            phoneNumber: currentUserData?.phoneNumber,
            institute: currentUserData?.institute?._id,
            department: currentUserData?.department?._id,
            semester: currentUserData?.semester?.toString(),
            division: currentUserData?.division,
            batch: currentUserData?.batch
        }
    })

    useEffect(() => {
        setStudent({ institute: currentUserData?.institute?._id, department: currentUserData?.department?._id })
        form.setValue('name', currentUserData?.name)
        form.setValue('rollNumber', currentUserData?.rollNumber)
        form.setValue('email', currentUserData?.email)
        form.setValue('phoneNumber', currentUserData?.phoneNumber)
        form.setValue('institute', currentUserData?.institute?._id)
        form.setValue('department', currentUserData?.department?._id)
        form.setValue('semester', currentUserData?.semester?.toString())
        form.setValue('division', currentUserData?.division)
        form.setValue('batch', currentUserData?.batch)
    }, [currentUserData, form])

    const onSubmit = (value) => {
        const data = {
            payload: {
                ...(currentUserData.name !== value.name && { name: value.name.trim() }),
                ...(currentUserData.rollNumber !== value.rollNumber && { rollNumber: value.rollNumber.trim() }),
                ...(currentUserData.email !== value.email && { email: value.email }),
                ...(currentUserData.phoneNumber !== value.phoneNumber && { phoneNumber: value.phoneNumber }),
                ...(currentUserData.institute._id !== value.institute && { institute: value.institute }),
                ...(currentUserData.department._id !== value.department && { department: value.department }),
                ...(currentUserData.semester !== value.semester && { semester: value.semester }),
                ...(currentUserData.division !== value.division && { division: value.division }),
                ...(currentUserData.batch !== value.batch && { batch: value.batch }),
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
                <SheetDescription>Edit student account information</SheetDescription>
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
                        name="rollNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>roll number</FormLabel>
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
                        name="institute"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>institute</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(value) => {
                                        setStudent({ ...student, institute: value })
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
                        name="batch"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>batch</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="semester"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>semester</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select semester" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: 8 }).map((_, index) => (
                                                    <SelectItem key={index} value={(index + 1).toString()}>{index + 1}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        <FormField
                            control={form.control}
                            name="division"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>division</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                    </div>
                    <SheetFooter>
                        {/* <Button
                            variant="ghost"
                            type="button"
                            disabled={editAccount.isPending}
                            onClick={() => {
                                form.reset();
                                return setData(false)
                            }}>
                            Cancel
                        </Button> */}
                        <Button
                            type="submit"
                            disabled={editAccount.isPending}
                            isLoading={editAccount.isPending}>
                            Add account
                        </Button>
                    </SheetFooter>
                </form>
            </Form>
        </SheetContent>
    )
}