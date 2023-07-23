export default function editCourseUseCase({
    coursesRepository,
    ErrorResponse,
}) {
    return async function editCourse(
        courseId,
        courseInfo,
        currentUserId,
        currentUserRole
    ) {
        const course = await coursesRepository.findById(courseId)
        if (!course) {
            throw new ErrorResponse(`No course with the id of ${courseId}`, 404)
        }

        // Make sure user is course owner or admin
        if (
            course.user.toString() !== currentUserId &&
            currentUserRole !== 'admin'
        ) {
            throw new ErrorResponse(
                `User ${currentUserId} is not authorized to edit course ${courseId}`,
                401
            )
        }

        const updatedCourse = await coursesRepository.update(
            courseId,
            courseInfo
        )

        return updatedCourse
    }
}
