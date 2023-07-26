import { makeUser } from '../../../domain/entities'

export default function signInUserUseCase({
    usersRepository,
    matchPassword,
    getSignedJwtToken,
    ErrorResponse,
}) {
    return async function signInUser({ email, password }) {
        if (!email || !password) {
            throw new ErrorResponse('Please provide an email and password', 400)
        }

        const signedInUser = await usersRepository.findByEmail(email)
        if (!signedInUser) {
            throw new ErrorResponse('Invalid credentials', 401)
        }

        const user = makeUser(signedInUser)

        const isMatch = await matchPassword(password, user.getPassword())
        if (!isMatch) {
            throw new ErrorResponse('Invalid credentials', 401)
        }

        const token = getSignedJwtToken(user.getId())
        return { token }
    }
}
