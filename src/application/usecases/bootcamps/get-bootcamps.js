export default function makeGetBootcamps({ bootcampRepository }) {
    return async function getBootcamps(query) {
        return await bootcampRepository.advancedFind(query)
    }
}
