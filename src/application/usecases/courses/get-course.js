export default function getCourseUseCase({ coursesRepository, ErrorResponse }) {
    return async function getCourse(courseId) {
        const course = coursesRepository.findById(courseId)
        if (!course) {
            throw new ErrorResponse(`No course with the id of ${courseId}`, 404)
        }

        return course
    }
}
