import advancedResult from '../../interfaces/utils/advancedResult'

export default function makeBootcampRepository({ bootcampDb }) {
    return Object.freeze({
        insert,
        findById,
        findAll,
        advancedFind,
        findByQuery,
        findOneByUserId,
        removeById,
        update,
    })

    async function insert(bootcampInfo) {
        const newBootcamp = await bootcampDb.create(bootcampInfo)
        return cleanBootcamp(newBootcamp)
    }

    async function findById(id) {
        const bootcamp = await bootcampDb.findById(id).populate('courses')

        return cleanBootcamp(bootcamp)
        // return {
        //     id: bootcamp._id,
        //     name: bootcamp.name,
        //     description: bootcamp.description,
        //     website: bootcamp.website,
        //     phone: bootcamp.phone,
        //     email: bootcamp.email,
        //     address: bootcamp.address,
        //     careers: bootcamp.careers,
        //     housing: bootcamp.housing,
        //     jobAssistance: bootcamp.jobAssistance,
        //     jobGuarantee: bootcamp.jobGuarantee,
        //     acceptGi: bootcamp.acceptGi,
        //     courses: bootcamp.courses,
        // }
    }

    async function findAll() {
        const bootcamps = await bootcampDb.find()
        return bootcamps.map((bootcamp) => cleanBootcamp(bootcamp))
    }

    async function advancedFind(requestQuery) {
        return await advancedResult(bootcampDb, requestQuery, 'courses')
    }

    async function findByQuery(query) {
        const bootcamps = await bootcampDb.find(query)
        return bootcamps.map((bootcamp) => cleanBootcamp(bootcamp))
    }

    async function findOneByUserId(userId) {
        const bootcamp = await bootcampDb.findOne({ user: userId })

        return cleanBootcamp(bootcamp)
    }

    async function removeById(id) {
        const bootcamp = await bootcampDb.findByIdAndRemove(id)

        return cleanBootcamp(bootcamp)
    }

    async function update(id, bootcampInfo) {
        const bootcamp = await bootcampDb.findByIdAndUpdate(id, bootcampInfo, {
            new: true,
            runValidators: true,
        })

        return cleanBootcamp(bootcamp)
    }
}

// renames _id to id and removes __v
function cleanBootcamp(bootcamp) {
    if (!bootcamp) {
        return null
    }

    const { _id: id, __v, ...found } = bootcamp.toObject()
    return { id, ...found }
}
