import express from 'express'
const coursesRouter = express.Router({ mergeParams: true })
const {
    getCourses,
    getCourse,
    addCourse,
    updatecourse,
    deleteCourse,
} = require('../controllers/courses')

const { protect, authorize } = require('../middleware/auth')
const advancedResult = require('../middleware/advancedResult')
const Courses = require('../models/Course')

router
    .route('/')
    .get(
        advancedResult(Courses, {
            path: 'bootcamp',
            // select: 'name description' OR
            select: { name: 1, description: 1 },
        }),
        getCourses
    )
    .post(protect, authorize('publisher', 'admin'), addCourse)

router
    .route('/:id')
    .get(getCourse)
    .put(protect, updatecourse)
    .delete(protect, authorize('publisher', 'admin'), deleteCourse)

export default coursesRouter
