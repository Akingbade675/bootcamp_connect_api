import asyncHandler from '../middlewares/async'
import courseService from '../../application/usecases/courses'

export const addCourse = asyncHandler(async (req, res) => {
    const { bootcampId } = req.params
    const courseData = req.body
    const course = await courseService.addCourse(bootcampId, courseData)
    res.status(201).json({ success: true, data: course })
})

export const getCourses = asyncHandler(async (req, res) => {
    const { bootcampId } = req.params
    const responseData = await courseService.getCourses(bootcampId, req.query)

    res.status(200).json(responseData)
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
