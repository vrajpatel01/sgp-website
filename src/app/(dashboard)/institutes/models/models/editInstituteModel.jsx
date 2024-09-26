import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// components
import InputField from "@/components/shared/inputField";
import { Button } from "@/components/ui/button";

// models
import SideModel from "@/components/models/sideModel";

// icons
// import { MdDelete } from "react-icons/md";

// validator
import isEmpty from "@/services/validator/isEmpty";

// network
import { useUpdateInstitute } from "../../services/mutation";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";


export default function EditInstitute({ data, setData, instituteData, refetch, setInstituteDeleteConfirmationModel }) {
    const [institute, setInstitute] = useState('')
    useEffect(() => { setInstitute(instituteData.name) }, [instituteData])

    const updateInstitute = useUpdateInstitute()


    const handleFormSubmit = (e) => {
        e.preventDefault()
        try {
            const instituteNameValidator = isEmpty(institute)
            if (instituteNameValidator) {
                updateInstitute.mutate({ instituteId: instituteData.id, name: institute })
            }
        } catch (error) {
            if (error.code == 'EMPTY')
                return toast.error('Institute name is required')
            toast.error(error.message)
        }
    }
    return (
        <SheetContent className="space-y-5 overflow-y-scroll">
            <SheetHeader>
                <SheetTitle>Institute</SheetTitle>
            </SheetHeader>

            <Separator />
            <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                <div className="flex flex-col gap-5">
                    <Input onChange={e => setInstitute(e.target.value)}
                        value={institute}
                        className='w-full'
                        placeholder='institute' />
                    <div className="w-full flex justify-end">
                        <Button
                            label='Edit'
                            disabled={institute == instituteData.name || updateInstitute.isPending}
                            isLoading={updateInstitute.isPending} >
                            Change
                        </Button>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardDescription>
                            Delete whole institute. if you delete this institute all department are also delete related to this institute.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-end">
                        <Button
                            onClick={() => {
                                setData(false)
                                setInstituteDeleteConfirmationModel(true)
                            }}
                            variant="destructive"
                            type="button" >
                            Delete
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </SheetContent>
    )
}