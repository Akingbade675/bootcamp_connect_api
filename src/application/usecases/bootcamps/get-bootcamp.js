export default function makeGetBootcamp({ bootcampRepository, ErrorResponse }) {
    return async function getBootcamp(bootcampId) {
        const bootcamp = await bootcampRepository.findById(bootcampId)
        if (!bootcamp) {
            throw new ErrorResponse(
                `Bootcamp with id ${bootcampId} cannot be found`,
                404
            )
        }
        return bootcamp
    }
}
