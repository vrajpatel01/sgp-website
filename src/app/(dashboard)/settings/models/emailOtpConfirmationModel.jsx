import { useState } from "react";

import PopUpModel from "@/components/models/popUpModel";
import { Button } from "@/components/ui/button";
import OTPInput from "react-otp-input";
import { useVerifyEmailChange } from "../services/mutation";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function EmailOtpConfirmationModel({ data, setData }) {
    const verifyEmail = useVerifyEmailChange();
    const [otp, setOtp] = useState('')

    const handleFormSubmit = e => {
        e.preventDefault()
        verifyEmail.mutate(otp)
    }
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Change Email</DialogTitle>
                <DialogDescription>We send OTP to your new email address. please enter that six digit OTP here to change your email address.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} noValidate>
                <div className="flex justify-end gap-2 flex-col">
                    <div className="flex justify-center items-center gap-3 my-4">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            inputStyle="!w-12 !h-12 p-2 text-2xl rounded-md border border-gray-300 text-center mx-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            inputType="number"
                            renderInput={(props) => <input {...props} />}
                        />
                    </div>
                    <DialogFooter className="flex justify-end items-center gap-3">
                        <Button
                            onClick={() => {
                                setOtp('')
                                setData(false)
                            }}
                            variant="ghost"
                            type="button">
                            Cancel
                        </Button>
                        <Button
                            isLoading={verifyEmail.isPending}
                            disabled={verifyEmail.isPending}>
                            Change
                        </Button>
                    </DialogFooter>
                </div>
            </form>
        </DialogContent>
    )
}