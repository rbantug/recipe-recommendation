import isEmail from "validator/lib/isEmail";

function checkEmail(string) {
    return isEmail(string)
}

const validators = Object.freeze({
    checkEmail
})

export default validators