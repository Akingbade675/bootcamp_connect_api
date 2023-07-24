export default function defineMakeCourse({ ErrorResponse }) {
    return function makeCourse({
        title,
        description,
        weeks,
        tuition,
        minimumSkill,
        scholarshipAvailable = false,
        createdAt = Date.now(),
        bootcamp,
        user,
    } = {}) {
        if (!title) {
            throw new ErrorResponse('Course must have a title', 400)
        }

        if (!description) {
            throw new ErrorResponse('Course must have a description', 400)
        }

        if (!weeks) {
            throw new ErrorResponse('Course must have a duration in weeks', 400)
        }

        if (!tuition) {
            throw new ErrorResponse('Course must have a tuition', 400)
        }

        const REQUIRED_SKILLS = ['beginner', 'intermediate', 'advanced']
        if (!minimumSkill || !REQUIRED_SKILLS.includes(minimumSkill)) {
            throw new ErrorResponse('Course must have a minimum skill', 400)
        }

        if (!bootcamp) {
            throw new ErrorResponse(
                'Course must be associated to a valid bootcamp',
                400
            )
        }

        if (!user) {
            throw new ErrorResponse(
                'Course must be associated to a valid user',
                400
            )
        }

        return Object.freeze({
            getTitle: () => title,
            getDescription: () => description,
            getDuration: () => weeks,
            getTuition: () => tuition,
            getMinimumSkill: () => minimumSkill,
            IsScholarshipAvailable: () => scholarshipAvailable,
            getCreatedDate: () => createdAt,
            getBootcampId: () => bootcamp,
            getUserId: () => user,
        })
    }
}
