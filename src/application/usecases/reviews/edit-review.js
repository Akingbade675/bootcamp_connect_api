import { makeReview } from '../../../domain/entities'

export default function makeEditReview({ reviewsRepository, ErrorResponse }) {
    return async function editReview({
        reviewId,
        currentUserId,
        currentUserRole,
        ...changes
    }) {
        if (!reviewId) {
            throw new ErrorResponse('You must supply a review id.', 400)
        }
        const existingReview = await reviewsRepository.findById({
            id: reviewId,
        })

        if (!existingReview) {
            throw new ErrorResponse(`No review with the id of ${reviewId}`, 404)
        }

        const review = makeReview({ ...existingReview, ...changes })

        if (
            review.getUser().toString() !== currentUserId &&
            currentUserRole !== 'admin'
        ) {
            console.log('review.getUser()', review.getUser())
            console.log('currentUserId', currentUserId)
            throw new ErrorResponse(`Not authorized to update this review`, 401)
        }

        const updatedReview = await reviewsRepository.update({
            id: reviewId,
            ...changes,
        })

        return { ...updatedReview }
    }
}
