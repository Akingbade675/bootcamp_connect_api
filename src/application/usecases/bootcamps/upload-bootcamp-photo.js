export default function makeUploadBootcampPhoto({
    bootcampsRepository,
    parseFile,
    ErrorResponse,
}) {
    return async function uploadBootcampPhoto({
        bootcampId,
        files,
        currentUserId,
        currentUserRole,
    }) {
        if (!files) {
            throw new ErrorResponse('Please upload a file', 400)
        }

        const file = files.file

        const bootcamp = await bootcampsRepository.findById(bootcampId)
        if (!bootcamp) {
            throw new ErrorResponse(
                `Bootcamp with id ${bootcampId} cannot be found`,
                404
            )
        }

        if (
            bootcamp.user.toString() !== currentUserId &&
            currentUserRole !== 'admin'
        ) {
            throw new ErrorResponse(
                `User ${currentUserId} is not authorized to update this bootcamp`,
                401
            )
        }

        if (!file.mimetype.startsWith('image')) {
            throw new ErrorResponse('Please upload an image file', 400)
        }

        if (file.size > process.env.MAX_FILE_UPLOAD) {
            throw new ErrorResponse(
                `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
                400
            )
        }

        const fileName = `photo_${bootcampId}${parseFile(file.name)}`

        file.mv(`${process.env.FILE_UPLOAD_PATH}/${fileName}`, async (err) => {
            if (err) {
                throw new ErrorResponse('Problem with file upload', 500)
            }
        })

        await bootcampsRepository.update(bootcampId, { photo: fileName })
        return fileName
    }
}
