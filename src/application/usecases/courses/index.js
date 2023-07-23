import {
    coursesRepository,
    bootcampsRepository,
} from '../../../domain/repositories'
import addCourseUseCase from './add-course'
import editCourseUseCase from './edit-course'
import deleteCourseUseCase from './remove-course'
import getCoursesUseCase from './get-courses'
import getCourseUseCase from './get-course'
import ErrorResponse from '../../../interfaces/utils/errorResponse'

const addCourse = addCourseUseCase({
    coursesRepository,
    bootcampsRepository,
    ErrorResponse,
})
const editCourse = editCourseUseCase({ coursesRepository, ErrorResponse })
const deleteCourse = deleteCourseUseCase({ coursesRepository, ErrorResponse })
const getCourses = getCoursesUseCase({ coursesRepository })
const getCourse = getCourseUseCase({ coursesRepository, ErrorResponse })

const coursesService = Object.freeze({
    addCourse,
    editCourse,
    deleteCourse,
    getCourses,
    getCourse,
})

export default coursesService
export { addCourse, editCourse, deleteCourse, getCourses, getCourse }
