import { makeUser } from '../../../domain/entities'

export default function registerUserUseCase({ userRepository }) {
    return async function registerUser(userData) {
        try {
            const user = makeUser(userData)

            const newUser = await userRepository.insert({
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole(),
            })

            return newUser
        } catch (error) {
            throw error
        }
    }
}
