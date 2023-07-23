export default function getUserUseCase({ usersRepository }) {
    return async function getUser(id) {
        const user = await usersRepository.findById(id)
        const { password, ...currentUser } = user
        return currentUser
    }
}
