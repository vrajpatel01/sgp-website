import { useState } from "react"

import { useGetAllInstitutes, useGetDepartments } from "../../institutes/services/query"
import { useAddHod } from "../services/mutation"
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import addHodValidator from "@/app/validator/addHod.validator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function AddHodModel({ data, setData }) {
    const [hod, setHod] = useState({ institute: 'Select Institute', department: 'Select Department' })
    const institutes = useGetAllInstitutes()
    const departments = useGetDepartments(hod.institute, hod.institute !== '' && hod.institute !== 'Select Institute' ? true : false)
    const addHod = useAddHod()

    const form = useForm({
        resolver: zodResolver(addHodValidator),
        defaultValues: {
            name: '',
            employeeNumber: '',
            email: '',
            phoneNumber: '',
            designation: '',
            institute: '',
            department: ''
        }
    })

    const onSubmit = (value) => {
        const data = {
            name: value.name.toLowerCase().trim(),
            employeeCode: value.employeeNumber.toLowerCase().trim(),
            mobileNumber: value.phoneNumber.toLowerCase().trim(),
            designation: value.designation.toLowerCase().trim(),
            email: value.email,
            institute: value.institute,
            department: value.department,
            subjectCode: value.subjectCode,
            subjectName: value.subjectName
        }
        addHod.mutate(data, {
            onSuccess: (data) => {
                if (data.success) {
                    form.reset()
                    return setData(false)
                }
            }
        })
    }
    return (
        <SheetContent className="space-y-5 overflow-y-scroll">
            <SheetHeader>
                <SheetTitle>Add account</SheetTitle>
                <SheetDescription>All fields are required so enter all the values to add hod account.</SheetDescription>
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
                            disabled={addHod.isPending}
                            isLoading={addHod.isPending}>
                            Add account
                        </Button>
                    </SheetFooter>
                </form>
            </Form>
        </SheetContent>
    )
}