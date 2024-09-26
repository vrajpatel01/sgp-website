"use client";
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react";
import toast from "react-hot-toast"

// components
import { Button } from "@/components/ui/button"

// validator
import isEmpty from "@/services/validator/isEmpty";

// network
import { useAddInstitute } from "../../services/mutation";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function AddInstituteModel({ data, setData }) {
    const [institute, setInstitute] = useState('')
    const { data: session, loading } = useSession()

    const addInstitute = useAddInstitute()

    useEffect(() => {
        if (addInstitute.isSuccess) {
            setData(false);
            setInstitute('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addInstitute.isSuccess]);

    const handleStudentAdd = (e) => {
        e.preventDefault()
        try {
            const instituteCheck = isEmpty(institute)

            if (instituteCheck) {
                addInstitute.mutate(institute)
            }
        } catch (error) {
            if (error.code == 'EMPTY')
                return toast.error('Institute name is required')
            toast.error(error.message)
        }
    }

    if (loading) return null

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add institute</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleStudentAdd} className="flex flex-col gap-4" noValidate>
                <Input
                    value={institute}
                    onChange={e => setInstitute(e.target.value)}
                    disabled={addInstitute.isPending}
                    placeholder='Institute Name' />
                <div className="flex justify-end gap-2">
                    <Button
                        onClick={() => {
                            setInstitute('')
                            setData(false)
                        }}
                        variant="ghost"
                        disabled={addInstitute.isPending}
                        type="button">
                        Cancel
                    </Button>
                    <Button
                        disabled={addInstitute.isPending}
                        isLoading={addInstitute.isPending}>
                        Add
                    </Button>
                </div>
            </form>
        </DialogContent>
    )
}