import express from 'express'
import { protect, authorize } from '../middlewares/auth'
import {
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse,
} from '../controllers/CoursesController'

const coursesRouter = express.Router({ mergeParams: true })

coursesRouter
    .route('/')
    .get(getCourses)
    .post(protect, authorize('publisher', 'admin'), addCourse)

coursesRouter
    .route('/:id')
    .get(getCourse)
    .put(protect, authorize('publisher', 'admin'), updateCourse)
    .delete(protect, authorize('publisher', 'admin'), deleteCourse)

export default coursesRouter
