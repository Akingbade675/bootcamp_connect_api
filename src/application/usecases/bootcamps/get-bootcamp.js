export default function makeGetBootcamp({
    bootcampsRepository,
    ErrorResponse,
}) {
    return async function getBootcamp(bootcampId) {
        const bootcamp = await bootcampsRepository.findById(bootcampId)
        if (!bootcamp) {
            throw new ErrorResponse(
                `Bootcamp with id ${bootcampId} cannot be found`,
                404
            )
        }
        return bootcamp
    }
}
