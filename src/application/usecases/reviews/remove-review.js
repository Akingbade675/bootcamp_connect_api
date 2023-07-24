export default function makeRemoveReview({ reviewsDb, ErrorResponse }) {
    return async function removeReview({ reviewId, currentUserId }) {
        if (!reviewId) {
            throw new ErrorResponse('You must supply a review id.', 400)
        }
        const existingReview = await reviewsDb.findById({ id: reviewId })

        if (!existingReview) {
            throw new ErrorResponse(`No review with the id of ${reviewId}`, 404)
        }

        if (
            existingReview.getUser().toString() !== currentUserId &&
            currentUserId !== 'admin'
        ) {
            throw new ErrorResponse(`Not authorized to update this review`, 401)
        }

        return await reviewsDb.remove(reviewId)
    }
}
