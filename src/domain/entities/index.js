import defineMakeUser from './users'
import defineMakeBootcamp from './bootcamps'
import defineMakeCourse from './courses'
import defineMakeReview from './reviews'
import ErrorResponse from '../../interfaces/utils/errorResponse'
import slugify from 'slugify'

export const makeUser = defineMakeUser({ ErrorResponse })
export const makeBootcamp = defineMakeBootcamp({ ErrorResponse, slugify })
export const makeCourse = defineMakeCourse({ ErrorResponse })
export const makeReview = defineMakeReview({ ErrorResponse })
