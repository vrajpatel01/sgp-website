import CustomError from "../customError"
import isEmpty from "./isEmpty"

const passwordValidator = (password, confirmPassword = null) => {
    const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g

    const isPasswordEmpty = isEmpty(password)
    if (confirmPassword == null) {
        if (isPasswordEmpty) {
            if (!password.match(passwordRegex)) {
                throw new CustomError('Please enter strong password.', 'WEAK_PASS')
            }
        }
    } else {
        const isConfirmPasswordEmpty = isEmpty(confirmPassword)
        if (isPasswordEmpty && isConfirmPasswordEmpty) {
            if (!password.match(passwordRegex)) {
                throw new CustomError('Please enter strong password.', 'WEAK_PASS')
            } else if (password !== confirmPassword) {
                throw new CustomError('Password and Confirm Password is not match.')
            }
        }
    }


    return true
}

export default passwordValidator