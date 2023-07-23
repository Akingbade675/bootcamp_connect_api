import { userDb, bootcampDb, courseDb } from '../../infrastructure/repositories'
import makeUsersRepository from './UsersRepository'
import makeBootcampsRepository from './BootcampsRepository'
import makeCoursesRepository from './CoursesRepository'

export const usersRepository = makeUsersRepository({ userDb })
export const bootcampsRepository = makeBootcampsRepository({ bootcampDb })
export const coursesRepository = makeCoursesRepository({ courseDb })
