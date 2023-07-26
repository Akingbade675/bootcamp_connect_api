import { makeCourse } from '../../../domain/entities'

export default function editCourseUseCase({
    coursesRepository,
    ErrorResponse,
}) {
    return async function editCourse({
        courseId,
        courseData,
        currentUserId,
        currentUserRole,
    }) {
        const existingCourse = await coursesRepository.findById(courseId)
        if (!existingCourse) {
            throw new ErrorResponse(`No course with the id of ${courseId}`, 404)
        }

        const course = makeCourse({ ...existingCourse, ...courseData })

        // Make sure user is course owner or admin
        if (
            course.getUserId().toString() !== currentUserId &&
            currentUserRole !== 'admin'
        ) {
            throw new ErrorResponse(
                `User ${currentUserId} is not authorized to edit course ${courseId}`,
                401
            )
        }

        const updatedCourse = await coursesRepository.update(
            courseId,
            courseData
        )

        return updatedCourse
    }
}
