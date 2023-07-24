export default function makeReviewDb({ monngoose }) {
    const ReviewSchema = new monngoose.Schema({
        title: {
            type: String,
            trim: true,
            required: [true, 'Please add a title for the review'],
            maxlength: 100,
        },
        text: {
            type: String,
            required: [true, 'Please add some text'],
            maxlength: 500,
        },
        rating: {
            type: Number,
            min: 1,
            max: 10,
            required: [true, 'Please add a rating between 1 and 10'],
        },
        bootcamp: {
            type: monngoose.Schema.ObjectId,
            ref: 'Bootcamp',
            required: true,
        },
        user: {
            type: monngoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    })

    ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true })

    return monngoose.model('Review', ReviewSchema)
}
