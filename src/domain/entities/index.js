import defineMakeUser from './users'
import defineMakeBootcamp from './bootcamps'
import defineMakeCourse from './courses'
import ErrorResponse from '../../interfaces/utils/errorResponse'
import slugify from 'slugify'

export const makeUser = defineMakeUser({ ErrorResponse })
export const makeBootcamp = defineMakeBootcamp({ ErrorResponse, slugify })
export const makeCourse = defineMakeCourse({ ErrorResponse })
