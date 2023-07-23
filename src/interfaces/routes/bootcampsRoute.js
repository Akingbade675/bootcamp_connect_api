import express from 'express'
import { protect, authorize } from '../middlewares/auth'
import coursesRouter from './coursesRoute'
import {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    uploadBootcampPhoto,
} from '../controllers/BootcampsController'

const bootcampsRouter = express.Router()

// Re-route into other resource router
bootcampsRouter.use('/:bootcampId/courses', coursesRouter)

bootcampsRouter.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

bootcampsRouter
    .route('/:id/photo')
    .put(protect, authorize('publisher', 'admin'), uploadBootcampPhoto)

bootcampsRouter
    .route('/')
    .get(getBootcamps)
    .post(protect, authorize('publisher', 'admin'), createBootcamp)

bootcampsRouter
    .route('/:id')
    .get(getBootcamp)
    .put(protect, authorize('publisher', 'admin'), updateBootcamp)
    .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)

export default bootcampsRouter
