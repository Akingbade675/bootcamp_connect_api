import asyncHandler from '../utils/async'
import userService from '../../application/usecases/user'

export const register = asyncHandler(async (request, response) => {
    const { name, email, password, role } = request.body

    await userService.registerUser({
        name,
        email,
        role,
        password,
    })

    response.json({ success: true })
})

export const login = asyncHandler(async (request, response) => {
    const { email, password } = request.body

    const { token } = await userService.signInUser(email, password)

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 3600 * 24 * 1000
        ),
        httpOnly: true,
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    response
        .status(200)
        .cookie('token', token, options)
        .json({ sucess: true, token })
})

export const getMe = asyncHandler(async (request, response) => {
    const user = await userService.getUser(request.user.id)
    response.json({ success: true, data: user })
})
