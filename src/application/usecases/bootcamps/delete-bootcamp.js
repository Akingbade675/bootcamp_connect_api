export default function makeDeleteBootcamp({
    bootcampRepository: bootcampsRepository,
}) {
    return async function deleteBootcamp(
        bootcampId,
        currentUserId,
        currentUserRole
    ) {
        const bootcamp = await bootcampsRepository.findById(bootcampId)
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

        await bootcampsRepository.removeById(bootcampId)
    }
}
