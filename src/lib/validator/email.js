import CustomError from "../handler/customError"
import isEmpty from "./isEmpty"

const emailValidator = (email, throwError) => {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

    const empty = isEmpty(email)
    if (empty) {
        if (!email.toLowerCase().match(emailRegex)) {
            throw new CustomError('Enter valid email address.', 'NOT_VALID')
        }
    }
    return true
}

export default emailValidator