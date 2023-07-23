import express from 'express'
import { register, login, getMe } from '../controllers/UsersController'
import { protect } from '../middlewares/auth'

const usersRouter = express.Router()

usersRouter.post('/register', register)
usersRouter.post('/login', login)

usersRouter.get('/me', protect, getMe)

export default usersRouter
