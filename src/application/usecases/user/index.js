import { usersRepository } from '../../../domain/repositories'
import registerUserUseCase from './register-user'
import signInUserUseCase from './signin-user'
import getUserUseCase from './get-user'
import encrypt from '../../../infrastructure/externalServices/encrypt'
import signedToken from '../../../infrastructure/externalServices/signedJwtToken'
import ErrorResponse from '../../../interfaces/utils/errorResponse'

const matchPassword = encrypt().compareHash
const getSignedJwtToken = signedToken().encode

const registerUser = registerUserUseCase({ usersRepository })
const getUser = getUserUseCase({ usersRepository })

// TODO: import the dependencies
const signInUser = signInUserUseCase({
    usersRepository,
    matchPassword,
    getSignedJwtToken,
    ErrorResponse,
})

const userService = {
    registerUser,
    signInUser,
    getUser,
}

export default userService
export { registerUser, signInUser, getUser }
