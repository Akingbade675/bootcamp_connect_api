export default function makeDeleteBootcamp({ bootcampRepository }) {
    return async function deleteBootcamp(
        bootcampId,
        currentUserId,
        currentUserRole
    ) {
        const bootcamp = await bootcampRepository.findById(bootcampId)
        if (!bootcamp) {
            throw new ErrorResponse(
                `Bootcamp with id ${bootcampId} cannot be found`,
                404
            )
        }

        if (
            bootcamp.user.toString() !== currentUserId &&
            currentUserRole !== 'admin'
        ) {
            throw new ErrorResponse(
                `User ${currentUserId} is not authorized to delete this bootcamp`,
                401
            )
        }

        await bootcampRepository.removeById(bootcampId)
    }
}
