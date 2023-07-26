import express from 'express'
import { protect, authorize } from '../middlewares/auth'
import {
    getReviews,
    addReview,
    updateReview,
    deleteReview,
} from '../controllers/ReviewsController'

const reviewsRouter = express.Router({ mergeParams: true })

reviewsRouter
    .route('/')
    .get(getReviews)
    .post(protect, authorize('user', 'publisher', 'admin'), addReview)

reviewsRouter
    .route('/:id')
    // .get(getReview)
    .put(protect, authorize('user', 'publisher', 'admin'), updateReview)
    .delete(protect, authorize('user', 'publisher', 'admin'), deleteReview)

export default reviewsRouter
