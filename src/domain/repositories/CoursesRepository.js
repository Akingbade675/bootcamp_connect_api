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
        return {
            id: newCourse._id,
            title: newCourse.title,
            description: newCourse.description,
            weeks: newCourse.weeks,
            tuition: newCourse.tuition,
            minimumSkill: newCourse.minimumSkill,
            scholarhipsAvailable: newCourse.scholarhipsAvailable,
            bootcamp: newCourse.bootcamp,
        }
    }

    async function findById(id) {
        const course = await courseDb
            .findById(id)
            .populate({ path: 'bootcamp', select: 'name description' })
        return {
            id: course._id,
            title: course.title,
            description: course.description,
            weeks: course.weeks,
            tuition: course.tuition,
            minimumSkill: course.minimumSkill,
            scholarhipsAvailable: course.scholarhipsAvailable,
            bootcamp: course.bootcamp,
        }
    }

    async function findByBootcampId(bootcampId) {
        const courses = await courseDb.find({ bootcamp: bootcampId })
        return courses.map((course) => ({
            id: course._id,
            title: course.title,
            description: course.description,
            weeks: course.weeks,
            tuition: course.tuition,
            minimumSkill: course.minimumSkill,
            scholarhipsAvailable: course.scholarhipsAvailable,
            bootcamp: course.bootcamp,
        }))
    }

    async function advancedFind(requestQuery) {
        return await advancedResult(courseDb, requestQuery, {
            path: 'bootcamp',
            select: { name: 1, description: 1 },
        })
    }

    async function removeById(id) {
        return await courseDb.findByIdAndRemove(id)
    }

    async function update(id, courseInfo) {
        const course = await courseDb.findByIdAndUpdate(id, courseInfo, {
            new: true,
            runValidators: true,
        })
        return {
            id: course._id,
            title: course.title,
            description: course.description,
            weeks: course.weeks,
            tuition: course.tuition,
            minimumSkill: course.minimumSkill,
            scholarhipsAvailable: course.scholarhipsAvailable,
            bootcamp: course.bootcamp,
        }
    }
}
