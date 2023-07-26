import {
    reviewsRepository,
    bootcampsRepository,
} from '../../../domain/repositories'
import makeAddReview from './add-review'
import makeEditReview from './edit-review'
import makeDeleteReview from './remove-review'
import makeListReviews from './list-reviews'
import ErrorResponse from '../../../interfaces/utils/errorResponse'

const addReview = makeAddReview({
    reviewsRepository,
    bootcampsRepository,
    ErrorResponse,
})
const editReview = makeEditReview({ reviewsRepository, ErrorResponse })
const deleteReview = makeDeleteReview({ reviewsRepository, ErrorResponse })
const listReviews = makeListReviews({ reviewsRepository, ErrorResponse })

const reviewsService = Object.freeze({
    addReview,
    editReview,
    deleteReview,
    listReviews,
})

export default reviewsService
export { addReview, editReview, deleteReview, listReviews }
