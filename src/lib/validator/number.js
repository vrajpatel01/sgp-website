import CustomError from "../handler/customError"
import isEmpty from "./isEmpty"

const numberValidator = (number, field) => {
    const numberRegex = /^\d+$/;

    const empty = isEmpty(number)
    if (empty) {
        if (!number.toLowerCase().match(numberRegex)) {
            throw new CustomError(`Enter valid ${field ? field : 'number'}`, 'NOT_VALID_NUMBER')
        }
    }
    return true
}

export default numberValidator