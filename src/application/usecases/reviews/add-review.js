import { makeReview } from '../../../domain/entities'

export default function makeAddReview({
    bootcampsDb,
    reviewsDb,
    ErrorResponse,
}) {
    return async function addReview({
        bootcampId,
        currentUserId,
        ...reviewInfo
    }) {
        if (!bootcampId) {
            throw new ErrorResponse('You must supply a bootcamp id.', 400)
        }

        const bootcamp = await bootcampsDb.findById({ id: bootcampId })

        if (!bootcamp) {
            throw new ErrorResponse(
                `No bootcamp with the id of ${bootcampId}`,
                404
            )
        }

        if (bootcamp.user.toString() === currentUserId) {
            throw new ErrorResponse(
                `The bootcamp owner cannot submit a review`,
                400
            )
        }

        const existingReview = await reviewsDb.findByBootcampIdAndUserId({
            bootcampId,
            userId: currentUserId,
        })

        if (existingReview) {
            throw new ErrorResponse(
                `The user has already submitted a review for this bootcamp`,
                400
            )
        }

        const review = makeReview({
            ...reviewInfo,
            bootcamp: bootcampId,
            user: currentUserId,
        })

        const addedReview = await reviewsDb.insert({
            title: review.getTitle(),
            text: review.getText(),
            rating: review.getRating(),
            user: review.getUser(),
            bootcamp: review.getBootcamp(),
            createdAt: review.getCreatedDate(),
        })

        return { ...addedReview }
    }
}
