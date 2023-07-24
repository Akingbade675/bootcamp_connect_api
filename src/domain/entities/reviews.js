export default function buildMakeReview({ ErrorResponse }) {
    return function makeReview({
        id,
        title,
        text,
        rating,
        user,
        bootcamp,
        createdAt = Date.now(),
    }) {
        if (!title) {
            throw new ErrorResponse('Review must have a title', 400)
        }

        if (!text) {
            throw new ErrorResponse('Review must have a text', 400)
        }

        if (!rating || rating < 1 || rating > 10) {
            throw new ErrorResponse(
                'Review must have a rating between 1 and 10',
                400
            )
        }

        if (!user) {
            throw new ErrorResponse(
                'Review must be associated to a valid user',
                400
            )
        }

        if (!bootcamp) {
            throw new ErrorResponse(
                'Review must be associated to a valid bootcamp',
                400
            )
        }

        return Object.freeze({
            getId: () => id,
            getTitle: () => title,
            getText: () => text,
            getRating: () => rating,
            getUser: () => user,
            getBootcamp: () => bootcamp,
            getCreatedDate: () => createdAt,
        })
    }
}
