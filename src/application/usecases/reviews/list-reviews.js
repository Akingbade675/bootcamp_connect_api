export default function makeListReviews({ reviewsRepository, ErrorResponse }) {
    return async function listReviews({ bootcampId }) {
        if (!bootcampId) {
            throw new ErrorResponse('You must supply a bootcamp id.', 400)
        }
        const reviews = await reviewsRepository.findByBootcampId({ bootcampId })
        return reviews
    }
}
