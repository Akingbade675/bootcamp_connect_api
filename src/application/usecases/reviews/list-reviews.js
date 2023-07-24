export default function makeListReviews({ reviewsDb, ErrorResponse }) {
    return async function listReviews({ bootcampId }) {
        if (!bootcampId) {
            throw new ErrorResponse('You must supply a bootcamp id.', 400)
        }
        const reviews = await reviewsDb.findByBootcampId({ bootcampId })
        return reviews
    }
}
