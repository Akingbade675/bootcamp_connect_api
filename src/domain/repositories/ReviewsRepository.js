export default function makeReviewsRepository({ reviewDb }) {
    return Object.freeze({
        insert,
        findById,
        findByBootcampId,
        findByBootcampIdAndUserId,
        findAll,
        remove,
        update,
    })

    async function insert(reviewInfo) {
        const result = await reviewDb.create({ ...reviewInfo })

        return cleanReview(result)
    }

    async function findById({ id }) {
        const result = await reviewDb.findById(id)

        return cleanReview(result)
    }

    async function findByBootcampId({ bootcampId }) {
        const reviews = await reviewDb.find({ bootcamp: bootcampId })

        return reviews.map((review) => cleanReview(review))
    }

    async function findByBootcampIdAndUserId({ bootcampId, userId }) {
        const result = await reviewDb.findOne({
            bootcamp: bootcampId,
            user: userId,
        })

        return cleanReview(result)
    }

    async function findAll() {
        const reviews = await reviewDb.find()
        return reviews.map((review) => cleanReview(review))
    }

    async function remove(id) {
        const result = await reviewDb.findByIdAndRemove(id)
        return cleanReview(result)
    }

    async function update({ id, ...changes }) {
        const result = await reviewDb.findByIdAndUpdate(id, changes, {
            new: true,
            runValidators: true,
        })

        return cleanReview(result)
    }
}

// renames _id to id and removes __v
function cleanReview(review) {
    if (!review) {
        return null
    }

    const { _id: id, __v, ...cleanedInfo } = review.toObject()

    return { id, ...cleanedInfo }
}
