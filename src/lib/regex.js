const regex = {
    password: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/,
    phone: /^(\+91[\-\s]?)?[6-9]\d{9}$/
}

export default regex;