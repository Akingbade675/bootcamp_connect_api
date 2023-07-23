import asyncHandler from './async'
import ErrorResponse from '../utils/errorResponse'
import signedToken from '../../infrastructure/externalServices/signedJwtToken'
import { usersRepository } from '../../domain/repositories'

export const protect = asyncHandler(async (request, response, next) => {
    let token

    if (
        request.headers.authorization &&
        request.headers.authorization.startsWith('Bearer')
    ) {
        token = request.headers.authorization.split(' ')[1]
    } else if (request.cookies.token) {
        token = request.cookies.token
    }

    // Make sure token exists
    if (!token) {
        return next(
            new ErrorResponse('Not authorized to access this route', 401)
        )
    }

    try {
        // Verify token
        const decoded = signedToken().decode(token)

        // Get logged in user
        request.user = await usersRepository.findById(decoded.id)

        next()
    } catch (error) {
        return next(
            new ErrorResponse('Not authorized to access this route', 401)
        )
    }
})

export const authorize = (...roles) => {
    return (request, response, next) => {
        if (!roles.includes(request.user.role)) {
            return next(
                new ErrorResponse(
                    `User role: ${request.user.role} is not authorized to access this route`,
                    401
                )
            )
        }

        next()
    }
}
