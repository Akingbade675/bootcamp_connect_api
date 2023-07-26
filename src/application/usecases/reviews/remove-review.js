export default function makeRemoveReview({ reviewsRepository, ErrorResponse }) {
    return async function removeReview({
        reviewId,
        currentUserId,
        currentUserRole,
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

        if (
            existingReview.user.toString() !== currentUserId.toString() &&
            currentUserRole !== 'admin'
        ) {
            throw new ErrorResponse(`Not authorized to update this review`, 401)
        }

        return await reviewsRepository.remove(reviewId)
    }
}
