import CustomError from "../customError"

const isEmpty = (text) => {
    if (text === undefined || text.length == 0 || text == '') {
        throw new CustomError('This field is empty.', 'EMPTY')
    }

    return true
}

export default isEmpty