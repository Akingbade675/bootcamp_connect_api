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
        return {
            id: newBootcamp._id,
            name: newBootcamp.name,
            description: newBootcamp.description,
            website: newBootcamp.website,
            phone: newBootcamp.phone,
            email: newBootcamp.email,
            address: newBootcamp.address,
            careers: newBootcamp.careers,
            housing: newBootcamp.housing,
            jobAssistance: newBootcamp.jobAssistance,
            jobGuarantee: newBootcamp.jobGuarantee,
            acceptGi: newBootcamp.acceptGi,
        }
    }

    async function findById(id) {
        const bootcamp = await bootcampDb.findById(id).populate('courses')
        return {
            id: bootcamp._id,
            name: bootcamp.name,
            description: bootcamp.description,
            website: bootcamp.website,
            phone: bootcamp.phone,
            email: bootcamp.email,
            address: bootcamp.address,
            careers: bootcamp.careers,
            housing: bootcamp.housing,
            jobAssistance: bootcamp.jobAssistance,
            jobGuarantee: bootcamp.jobGuarantee,
            acceptGi: bootcamp.acceptGi,
            courses: bootcamp.courses,
        }
    }

    async function findAll() {
        const bootcamps = await bootcampDb.find()
        return bootcamps.map((bootcamp) => ({
            id: bootcamp._id,
            name: bootcamp.name,
            description: bootcamp.description,
            website: bootcamp.website,
            phone: bootcamp.phone,
            email: bootcamp.email,
            address: bootcamp.address,
            careers: bootcamp.careers,
            housing: bootcamp.housing,
            jobAssistance: bootcamp.jobAssistance,
            jobGuarantee: bootcamp.jobGuarantee,
            acceptGi: bootcamp.acceptGi,
        }))
    }

    async function advancedFind(requestQuery) {
        return await advancedResult(bootcampDb, requestQuery, 'courses')
    }

    async function findByQuery(query) {
        const bootcamps = await bootcampDb.find(query)
        return bootcamps.map((bootcamp) => ({
            id: bootcamp._id,
            name: bootcamp.name,
            description: bootcamp.description,
            website: bootcamp.website,
            phone: bootcamp.phone,
            email: bootcamp.email,
            address: bootcamp.address,
            careers: bootcamp.careers,
            housing: bootcamp.housing,
            jobAssistance: bootcamp.jobAssistance,
            jobGuarantee: bootcamp.jobGuarantee,
            acceptGi: bootcamp.acceptGi,
        }))
    }

    async function findOneByUserId(userId) {
        const bootcamp = await bootcampDb.findOne({ user: userId })
        return {
            id: bootcamp._id,
            name: bootcamp.name,
            description: bootcamp.description,
            website: bootcamp.website,
            phone: bootcamp.phone,
            email: bootcamp.email,
            address: bootcamp.address,
            careers: bootcamp.careers,
            housing: bootcamp.housing,
            jobAssistance: bootcamp.jobAssistance,
            jobGuarantee: bootcamp.jobGuarantee,
        }
    }

    async function removeById(id) {
        const bootcamp = await bootcampDb.findByIdAndRemove(id)
        return {
            id: bootcamp._id,
            name: bootcamp.name,
            description: bootcamp.description,
            website: bootcamp.website,
            phone: bootcamp.phone,
            email: bootcamp.email,
            address: bootcamp.address,
            careers: bootcamp.careers,
            housing: bootcamp.housing,
            jobAssistance: bootcamp.jobAssistance,
            jobGuarantee: bootcamp.jobGuarantee,
            acceptGi: bootcamp.acceptGi,
        }
    }

    async function update(id, bootcampInfo) {
        const bootcamp = await bootcampDb.findByIdAndUpdate(id, bootcampInfo, {
            new: true,
            runValidators: true,
        })
        return {
            id: bootcamp._id,
            name: bootcamp.name,
            description: bootcamp.description,
            website: bootcamp.website,
            phone: bootcamp.phone,
            email: bootcamp.email,
            address: bootcamp.address,
            careers: bootcamp.careers,
            housing: bootcamp.housing,
            jobAssistance: bootcamp.jobAssistance,
            jobGuarantee: bootcamp.jobGuarantee,
            acceptGi: bootcamp.acceptGi,
        }
    }
}
