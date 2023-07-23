export default function makeCourseDb({ mongoose }) {
    const CourseSchema = mongoose.Schema({
        title: {
            type: String,
            required: [true, 'Please add a course title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        weeks: {
            type: String,
            required: [true, 'Please add a number of weeks'],
        },
        tuition: {
            type: Number,
            required: [true, 'Please add a tuition cost'],
        },
        minimumSkill: {
            type: String,
            required: [true, 'Please add a minimum skill'],
            enum: ['beginner', 'intermediate', 'advanced'],
        },
        scholarshipAvailable: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        bootcamp: {
            type: mongoose.Schema.ObjectId,
            ref: 'Bootcamp',
            required: true,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
    })

    // Static method to get average of course tuition
    CourseSchema.statics.getAverageCost = async function (bootcampId) {
        const obj = await this.aggregate([
            {
                $match: { bootcamp: bootcampId },
            },
            {
                $group: {
                    _id: '$bootcamp',
                    averageCost: { $avg: '$tuition' },
                },
            },
        ])
        // Update the bootcamp's average cost
        try {
            await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
                averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
            })
        } catch (error) {
            console.error(error)
        }
    }

    // Call getAverageCost function before after save
    CourseSchema.post('save', async function () {
        await this.constructor.getAverageCost(this.bootcamp)
    })

    // Call getAverageCost function before after remove
    CourseSchema.post('remove', async function () {
        await this.constructor.getAverageCost(this.bootcamp)
    })

    return mongoose.model('Course', CourseSchema)
}
