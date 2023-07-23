export default function getCourses({ coursesRepository }) {
    return async function getCourses(bootcampId = null, query = {}) {
        if (bootcampId) {
            const result = await coursesRepository.findByBootcampId(bootcampId)
            return {
                success: true,
                count: result.length,
                data: result,
            }
        }

        const result = await coursesRepository.advancedFind(query)
        return {
            success: true,
            count: result['data'].length,
            pagination: result['pagination'],
            data: result['data'],
        }
    }
}
