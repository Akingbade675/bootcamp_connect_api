export default function signInUserUseCase({
    usersRepository,
    matchPassword,
    getSignedJwtToken,
    ErrorResponse,
}) {
    return async function signInUser(email, password) {
        if (!email || !password) {
            throw new ErrorResponse('Please provide an email and password', 400)
        }

        const user = await usersRepository.findByEmail(email)
        if (!user.id) {
            throw new ErrorResponse('Invalid credentials', 401)
        }

        const isMatch = await matchPassword(password, user.password)
        if (!isMatch) {
            throw new ErrorResponse('Invalid credentials', 401)
        }

        const token = getSignedJwtToken(user.id)
        return { token }
    }
}
