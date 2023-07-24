import { makeReview } from '../../../domain/entities'

export default function makeEditReview({ reviewsDb, ErrorResponse }) {
    return async function editReview({ reviewId, currentUserId, ...changes }) {
        if (!reviewId) {
            throw new ErrorResponse('You must supply a review id.', 400)
        }
        const existingReview = await reviewsDb.findById({ id: reviewId })

        if (!existingReview) {
            throw new ErrorResponse(`No review with the id of ${reviewId}`, 404)
        }

        const review = makeReview({ ...existingReview, ...changes })

        if (
            review.getUser().toString() !== currentUserId &&
            currentUserId !== 'admin'
        ) {
            throw new ErrorResponse(`Not authorized to update this review`, 401)
        }

        const updatedReview = await reviewsDb.update({
            reviewId,
            ...changes,
        })

        return { ...updatedReview }
    }
}
