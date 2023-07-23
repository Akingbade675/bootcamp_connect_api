export default function defineMakeUser({ ErrorResponse }) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return function makeUser({
        _id = null,
        name,
        email,
        password,
        role = 'user',
        resetPasswordToken = '',
        resetPasswordExpire = '',
        createdAt = Date.now(),
    } = {}) {
        if (!name) {
            throw new ErrorResponse('Please add a name', 400)
        }

        if (!email || !emailRegex.test(email)) {
            throw new ErrorResponse('Please add a valid email address', 400)
        }

        if (!password) {
            throw new ErrorResponse('Please add a password', 400)
        }

        if ((role !== 'user' && role !== 'publisher', 400)) {
            throw new ErrorResponse('Please add a valid role', 400)
        }

        return Object.freeze({
            getId: () => _id,
            getName: () => name,
            getEmail: () => email,
            getPassword: () => password,
            getRole: () => role,
            getResetPasswordToken: () => resetPasswordToken,
            getResetPasswordExpire: () => resetPasswordExpire,
            getCreatedDate: () => createdAt,
        })
    }
}
