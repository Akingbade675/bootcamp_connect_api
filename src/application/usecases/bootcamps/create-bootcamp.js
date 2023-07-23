import { makeBootcamp } from '../../../domain/entities'

export default function createBootcampUseCase({
    bootcampsRepository,
    ErrorResponse,
}) {
    return async function createBootcamp(
        bootcampInfo,
        currentUserId,
        currentUserRole
    ) {
        bootcampInfo.user = currentUserId
        // validates the fields
        makeBootcamp(bootcampInfo)

        const publishedBootcamp = await bootcampsRepository.findOneByUserId(
            currentUserId
        )

        // If the user is not an admin, they can only add one bootcamp
        if (publishedBootcamp && currentUserRole !== 'admin') {
            throw new ErrorResponse(
                `User with id ${currentUserId} has already published a bootcamp`,
                403
            )
        }

        return await bootcampsRepository.insert(bootcampInfo)
    }
}
