import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import slugify from 'slugify'
import jwt from 'jsonwebtoken'
import geocoder from '../externalServices/geocoder'

import makeUserDb from './DbUsersRepository'
import makeBootcampDb from './DbBootcampsRepository'
import makeCourseDb from './DbCoursesRepository'
import makeReviewDb from './DbReviewsRepository'

export const userDb = makeUserDb({ mongoose, bcrypt, jwt })
export const bootcampDb = makeBootcampDb({ mongoose, slugify, geocoder })
export const courseDb = makeCourseDb({ mongoose })
export const reviewDb = makeReviewDb({ mongoose })
