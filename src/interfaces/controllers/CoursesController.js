import asyncHandler from '../utils/async'
import courseService from '../../application/usecases/course'

export const addCourse = asyncHandler(async (req, res) => {
    const { bootcampId } = req.params
    const courseData = req.body
    const course = await courseService.addCourse(bootcampId, courseData)
    res.status(201).json({ success: true, data: course })
})

export const getCourses = asyncHandler(async (req, res) => {
    const { bootcampId } = req.params
    const result = await courseService.getCourses(bootcampId, req.query)

    let returnObject = {}
    if (bootcampId) {
        // if bootcampId is present, return the courses of that bootcamp
        returnObject = {
            success: true,
            count: result.length,
            data: result,
        }
    } else {
        /**
         * if bootcampId is not present,
         * use the advancedResult function that
         * returns an object with courses and pagination
         * e.g { pagination: {}, data: [] }
         */
        returnObject = {
            success: true,
            count: result['data'].length,
            pagination: result['pagination'],
            data: result['data'],
        }
    }
    res.status(200).json(returnObject)
})

export const getCourse = asyncHandler(async (req, res) => {
    const courseId = req.params.id

    const course = await courseService.getCourse(courseId)

    res.status(200).json({ success: true, data: course })
})

export const updateCourse = asyncHandler(async (req, res) => {
    const courseId = req.params.id
    const courseData = req.body
    const currentUserId = req.user.id
    const currentUserRole = req.user.role

    const updatedCourse = await courseService.editCourse(
        courseId,
        courseData,
        currentUserId,
        currentUserRole
    )
    res.status(200).json({ success: true, data: updatedCourse })
})

export const deleteCourse = asyncHandler(async (req, res) => {
    const courseId = req.params.id
    const currentUserId = req.user.id
    const currentUserRole = req.user.role

    await courseService.deleteCourse(courseId, currentUserId, currentUserRole)

    res.status(200).json({ success: true, data: {} })
})
