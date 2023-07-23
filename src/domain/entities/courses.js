export default function defineMakeCourse() {
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
            throw new ErrorResponse('Please add a course title', 400)
        }

        if (!description) {
            throw new ErrorResponse('Please add a description', 400)
        }

        if (!weeks) {
            throw new ErrorResponse('Please add a number of weeks', 400)
        }

        if (!tuition) {
            throw new ErrorResponse('Please add a tuition cost', 400)
        }

        const REQUIRED_SKILLS = ['beginner', 'intermediate', 'advanced']
        if (!minimumSkill || !REQUIRED_SKILLS.includes(minimumSkill)) {
            throw new ErrorResponse('Please add a minimum skill', 400)
        }

        if (!bootcamp) {
            throw new ErrorResponse(
                'course must be associated to a valid bootcamp',
                400
            )
        }

        if (!user) {
            throw new ErrorResponse(
                'course must be associated to a valid user',
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
