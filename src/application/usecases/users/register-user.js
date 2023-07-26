import { makeUser } from '../../../domain/entities'

export default function registerUserUseCase({
    usersRepository,
    ErrorResponse,
}) {
    return async function registerUser(userData) {
        const user = makeUser(userData)

        const existingUser = await usersRepository.findByEmail(user.getEmail())
        if (existingUser) {
            throw new ErrorResponse('User already exists', 400)
        }

        const result = await usersRepository.insert({
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole(),
        })

        // return all user data except password
        const { password, ...insertedUser } = result
        return insertedUser
    }
}
