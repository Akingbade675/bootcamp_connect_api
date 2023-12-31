import { makeCourse } from '../../../domain/entities'

export default function addCourseUseCase({
    coursesRepository,

    bootcampsRepository,
    ErrorResponse,
}) {
    return async function addCourse({
        bootcampId,
        courseData,
        currentUserId,
        currentUserRole,
    }) {
        courseData.user = currentUserId
        courseData.bootcamp = bootcampId
        // validates the fields
        makeCourse({ ...courseData })

        const bootcamp = await bootcampsRepository.findById(bootcampId)
        if (!bootcamp) {
            throw new ErrorResponse(
                `No bootcamp with the id of ${bootcampId}`,
                404
            )
        }

        // Make sure user is bootcamp owner
        if (
            bootcamp.user.toString() !== currentUserId &&
            currentUserRole !== 'admin'
        ) {
            throw new ErrorResponse(
                `User ${currentUserId} is not authorized to add a course to bootcamp ${bootcampId}`,
                401
            )
        }

        return await coursesRepository.insert(courseData)
    }
}
