export default function makeGetBootcamps({ bootcampsRepository }) {
    return async function getBootcamps(query) {
        return await bootcampsRepository.advancedFind(query)
    }
}
