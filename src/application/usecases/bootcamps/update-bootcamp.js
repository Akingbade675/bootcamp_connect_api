import { makeBootcamp } from '../../../domain/entities'

export default function makeUpdateBootcamp({
    bootcampsRepository,
    ErrorResponse,
}) {
    return async function updateBootcamp(
        bootcampId,
        changes,
        currentUserId,
        currentUserRole
    ) {
        const existingBootcamp = await bootcampsRepository.findById(bootcampId)
        if (!existingBootcamp) {
            throw new ErrorResponse(
                `Bootcamp with id ${bootcampId} cannot be found`,
                404
            )
        }

        const bootcamp = makeBootcamp({ ...existingBootcamp, ...changes })

        if (
            bootcamp.getUser().toString() !== currentUserId &&
            currentUserRole !== 'admin'
        ) {
            throw new ErrorResponse(
                `User with id ${userId} is not authorized to update this bootcamp`,
                401
            )
        }

        return await bootcampsRepository.update(bootcampId, changes)
    }
}
