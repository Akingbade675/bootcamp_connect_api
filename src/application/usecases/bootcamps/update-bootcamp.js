export default function makeUpdateBootcamp({
    bootcampRepository,
    ErrorResponse,
}) {
    return async function updateBootcamp(
        bootcampId,
        changes,
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
                `User with id ${userId} is not authorized to update this bootcamp`,
                401
            )
        }

        return await bootcampRepository.update(bootcampId, changes)
    }
}
