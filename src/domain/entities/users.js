export default function defineMakeUser({ ErrorResponse }) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const validRoles = ['user', 'publisher', 'admin']
    return function makeUser({
        id = null,
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

        if (!validRoles.includes(role)) {
            throw new ErrorResponse('Please add a valid role', 400)
        }

        return Object.freeze({
            getId: () => id,
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
