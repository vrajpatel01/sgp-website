import CustomError from "../customError"
import isEmpty from "./isEmpty"

const phoneValidator = (phone, throwError) => {
    const phoneRegex = /^\d{10}$/

    const empty = isEmpty(phone)
    if (empty) {
        if (!phone.toLowerCase().match(phoneRegex)) {
            throw new CustomError('Enter valid phone number.', 'NOT_VALID')
        }
    }
    return true
}

export default phoneValidator