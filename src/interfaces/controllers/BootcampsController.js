import asyncHandler from '../utils/async'
import bootcampService from '../../application/usecases/bootcamps'

export const getBootcamps = asyncHandler(async (request, response) => {
    // returns an object with pagination and data
    const result = await bootcampService.getBootcamps(request.query)

    response.json({
        success: true,
        count: result['data'].length,
        pagination: result['pagination'],
        data: result['data'],
    })
})

export const getBootcamp = asyncHandler(async (request, response) => {
    const bootcampId = request.params.id

    const bootcamp = await bootcampService.getBootcamp(bootcampId)

    response.json({ success: true, data: bootcamp })
})

export const createBootcamp = asyncHandler(async (request, response) => {
    const bootcampData = request.body
    const userId = request.user.id

    const bootcamp = await bootcampService.createBootcamp(bootcampData, userId)

    response.json({ success: true, data: bootcamp })
})

export const updateBootcamp = asyncHandler(async (request, response) => {
    const bootcampId = request.params.id
    const bootcampData = request.body
    const currentUserId = request.user.id
    const currentUserRole = request.user.role

    const bootcamp = await bootcampService.updateBootcamp(
        bootcampId,
        bootcampData,
        currentUserId,
        currentUserRole
    )

    response.json({ success: true, data: bootcamp })
})

export const deleteBootcamp = asyncHandler(async (request, response) => {
    const bootcampId = request.params.id
    const currentUserId = request.user.id
    const currentUserRole = request.user.role

    await bootcampService.deleteBootcamp(
        bootcampId,
        currentUserId,
        currentUserRole
    )
    response.json({ success: true, data: {} })
})

export const getBootcampsInRadius = asyncHandler(async (request, response) => {
    const { zipcode, distance } = request.params

    const bootcamps = await bootcampService.getBootcampsInRadius(
        zipcode,
        distance
    )
    response.json({ success: true, count: bootcamps.length, data: bootcamps })
})

export const uploadBootcampPhoto = asyncHandler(async (request, response) => {
    const bootcampId = request.params.id
    const file = request.files.file

    const fileName = await bootcampService.uploadBootcampPhoto(bootcampId, file)
    response.json({ success: true, data: fileName })
})
