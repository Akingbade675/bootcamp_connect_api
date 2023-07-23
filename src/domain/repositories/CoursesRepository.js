import advancedResult from '../../interfaces/utils/advancedResult'

export default function makeCoursesRepository({ courseDb }) {
    return Object.freeze({
        insert,
        findById,
        findByBootcampId,
        advancedFind,
        removeById,
        update,
    })

    async function insert(courseInfo) {
        const newCourse = await courseDb.create(courseInfo)

        return cleanCourse(newCourse)
    }

    async function findById(id) {
        const course = await courseDb
            .findById(id)
            .populate({ path: 'bootcamp', select: 'name description' })

        return cleanCourse(course)
    }

    async function findByBootcampId(bootcampId) {
        const courses = await courseDb.find({ bootcamp: bootcampId })
        const cleanedCourses = courses.map((course) => cleanCourse(course))
        return cleanedCourses
    }

    async function advancedFind(requestQuery) {
        return await advancedResult(courseDb, requestQuery, {
            path: 'bootcamp',
            select: { name: 1, description: 1 },
        })
    }

    async function removeById(id) {
        const removedCourse = await courseDb.findByIdAndRemove(id)

        return cleanCourse(removedCourse)
    }

    async function update(id, courseInfo) {
        const course = await courseDb.findByIdAndUpdate(id, courseInfo, {
            new: true,
            runValidators: true,
        })

        return cleanCourse(course)
    }
}

// renames _id to id and removes __v
function cleanCourse(course) {
    if (!course) {
        return null
    }

    const { _id: id, __v, ...remainingFields } = course.toObject()
    return { id, ...remainingFields }
}
