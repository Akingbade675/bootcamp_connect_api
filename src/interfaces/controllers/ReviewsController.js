import asyncHandler from '../middlewares/async'
import reviewService from '../../application/usecases/reviews'

export const addReview = asyncHandler(async (req, res) => {
    const { bootcampId } = req.params
    const currentUserId = req.user.id
    const reviewData = req.body
    const review = await reviewService.addReview({
        bootcampId,
        currentUserId,
        ...reviewData,
    })
    res.status(201).json({ success: true, data: review })
})

export const getReviews = asyncHandler(async (req, res) => {
    const { bootcampId } = req.params
    const responseData = await reviewService.listReviews({ bootcampId })

    res.status(200).json({
        success: true,
        count: responseData.length,
        data: responseData,
    })
})

// export const getReview = asyncHandler(async (req, res) => {
//     const reviewId = req.params.id;

//     const review = await reviewService.getReview(reviewId);

//     res.status(200).json({ success: true, data: review });
// });

export const updateReview = asyncHandler(async (req, res) => {
    const reviewId = req.params.id
    const reviewData = req.body
    const currentUserId = req.user.id
    const currentUserRole = req.user.role

    const updatedReview = await reviewService.editReview({
        reviewId,
        currentUserId,
        currentUserRole,
        ...reviewData,
    })
    res.status(200).json({ success: true, data: updatedReview })
})

export const deleteReview = asyncHandler(async (req, res) => {
    const reviewId = req.params.id
    const currentUserId = req.user.id
    const currentUserRole = req.user.role

    await reviewService.deleteReview({
        reviewId,
        currentUserId,
        currentUserRole,
    })

    res.status(200).json({ success: true, data: {} })
})
