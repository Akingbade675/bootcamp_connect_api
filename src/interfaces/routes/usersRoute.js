import express from 'express'
import { register, login, getMe } from '../controllers/UsersController'
import { protect } from '../middlewares/auth'

const usersRouter = express.Router()

router.post('/register', register)
router.post('/login', login)

router.get('/me', protect, getMe)

export default usersRouter
