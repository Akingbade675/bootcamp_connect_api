import {
    userDb,
    bootcampDb,
    courseDb,
    reviewDb,
} from '../../infrastructure/repositories'
import makeUsersRepository from './UsersRepository'
import makeBootcampsRepository from './BootcampsRepository'
import makeCoursesRepository from './CoursesRepository'
import makeReviewsRepository from './ReviewsRepository'

export const usersRepository = makeUsersRepository({ userDb })
export const bootcampsRepository = makeBootcampsRepository({ bootcampDb })
export const coursesRepository = makeCoursesRepository({ courseDb })
export const reviewsRepository = makeReviewsRepository({ reviewDb })
