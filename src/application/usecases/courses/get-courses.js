export default function getCourses({ coursesRepository }) {
    return async function getCourses(bootcampId = null, query = {}) {
        if (bootcampId) {
            return await coursesRepository.findByBootcampId(bootcampId)
        }

        return await coursesRepository.advancedFind(query)
    }
}
