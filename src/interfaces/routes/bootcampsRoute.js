import express from 'express'

const bootcampsRouter = express.Router()
import {
    getbootcamps,
    getbootcamp,
    createbootcamp,
    updatebootcamp,
    deletebootcamp,
    getBootcampInRadius,
    uploadBootcampPhoto,
} from '../controllers/BootcampsController'

import { protect, authorize } from '../middleware/auth'

import coursesRouter from './coursesRoute'
// Re-route into other resource router
router.use('/:bootcampId/courses', coursesRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampInRadius)

router
    .route('/:id/photo')
    .put(protect, authorize('publisher', 'admin'), uploadBootcampPhoto)

router
    .route('/')
    .get(getbootcamps)
    .post(protect, authorize('publisher', 'admin'), createbootcamp)

router
    .route('/:id')
    .get(getbootcamp)
    .put(protect, authorize('publisher', 'admin'), updatebootcamp)
    .delete(protect, authorize('publisher', 'admin'), deletebootcamp)

export default bootcampsRouter
