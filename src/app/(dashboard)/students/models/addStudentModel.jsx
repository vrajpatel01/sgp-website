'use client'
import { useState, useEffect } from "react"
import { useGetAllInstitutes, useGetDepartments } from "../../institutes/services/query"
import { useAddStudent } from "../services/mutation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import addStudentValidator from "@/app/validator/addStudent.validator"
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function AddStudentModel({ data, setData }) {
    const [student, setStudent] = useState({ institute: '', department: '' })
    const institutes = useGetAllInstitutes()
    const departments = useGetDepartments(student.institute, student.institute !== '' && student.institute !== 'Select Institute' ? true : false)
    const addStudent = useAddStudent()

    const form = useForm({
        resolver: zodResolver(addStudentValidator),
        defaultValues: {
            name: '',
            rollNumber: '',
            email: '',
            phoneNumber: '',
            institute: '',
            department: '',
            semester: '',
            division: ''
        }
    })

    const onSubmit = (value) => {

        const data = {
            name: value.name.toLowerCase().trim(),
            rollNumber: value.rollNumber.toLowerCase().trim(),
            email: value.email,
            phoneNumber: value.phoneNumber,
            institute: value.institute,
            department: value.department,
            batch: value.batch,
            division: value.division.toLowerCase(),
            semester: parseInt(value.semester),
        }

        addStudent.mutate(data, {
            onSuccess: (data) => {
                if (data.success) {
                    form.reset()
                    return setData(false)
                }
            }
        })
    }

    useEffect(() => {
        if (addStudent.isSuccess) {
            setStudent({ name: '', rollNumber: '', email: '', phoneNumber: '', institute: '', department: '', semester: '', division: '' })
            setData(false)
        }
    }, [addStudent.isSuccess, setData]);
    return (
        <SheetContent className="space-y-5 overflow-y-scroll">
            <SheetHeader>
                <SheetTitle>Add account</SheetTitle>
                <SheetDescription>All fields are required so enter all the values to add student account.</SheetDescription>
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
                            disabled={addStudent.isPending}
                            onClick={() => {
                                form.reset();
                                return setData(false)
                            }}>
                            Cancel
                        </Button> */}
                        <Button
                            type="submit"
                            disabled={addStudent.isPending}
                            isLoading={addStudent.isPending}>
                            Add account
                        </Button>
                    </SheetFooter>
                </form>
            </Form>
        </SheetContent>
    )
}