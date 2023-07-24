import { reviewsRepository } from '../../../domain/repositories'
import makeAddReview from './add-review'
import makeEditReview from './edit-review'
import makeDeleteReview from './remove-review'
import makeGetReviews from './get-reviews'
import makeGetReview from './get-review'
import ErrorResponse from '../../../interfaces/utils/errorResponse'

const addReview = makeAddReview({})
