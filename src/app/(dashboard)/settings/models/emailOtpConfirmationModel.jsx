import { useState } from "react";

import PopUpModel from "@/components/models/popUpModel";
import Button from "@/components/shared/button";
import OTPInput from "react-otp-input";
import { useVerifyEmailChange } from "../services/mutation";

export default function EmailOtpConfirmationModel({ data, setData }) {
    const verifyEmail = useVerifyEmailChange();
    const [otp, setOtp] = useState('')

    const handleFormSubmit = e => {
        e.preventDefault()
        verifyEmail.mutate(otp, {
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (error) => {
                console.log(error);
            }
        })
    }
    return (
        <PopUpModel setToggle={setData} toggle={data}>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4" noValidate>
                <h1 className="text-title-24">Change Email</h1>
                <div className="flex justify-end gap-2 flex-col">
                    <div className="flex justify-center items-center gap-3">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            inputStyle="!w-12 !h-12 p-2 text-2xl rounded-md border border-gray-300 text-center mx-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            inputType="number"
                            renderInput={(props) => <input {...props} />}
                        />
                    </div>
                    <p className="w-full sm:max-w-[330px] text-small-12 leading-4 text-light-text text-center">We send OTP to your new email address. please enter that six digit OTP here to change your email address.</p>
                    <div className="flex justify-center items-center gap-3">
                        <Button
                            label='Cancel'
                            onClick={() => {
                                setOtp('')
                                setData(false)
                            }}
                            type="button"
                            className='!rounded-full w-full sm:min-w-[130px]'
                        />
                        <Button
                            isLoading={verifyEmail.isPending}
                            disabled={verifyEmail.isPending}
                            label='Change Email'
                            className='bg-primary text-white !rounded-full whitespace-nowrap w-full sm:min-w-[130px] disabled:bg-opacity-90'
                        />
                    </div>
                </div>
            </form>
        </PopUpModel>
    )
}