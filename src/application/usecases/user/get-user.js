import { makeUser } from '../../../domain/entities'

export default function getUserUseCase({ userRepository }) {
    return async function getUser(userId) {
        return await userRepository.findById(userId)
    }
}
