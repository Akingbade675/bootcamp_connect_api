export default function deleteCourseUseCase({
    coursesRepository,
    ErrorResponse,
}) {
    return async function deleteCourse(
        courseId,
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
                `User ${currentUserId} is not authorized to delete course ${courseId}`,
                401
            )
        }

        return await coursesRepository.remove(courseId)
    }
}
