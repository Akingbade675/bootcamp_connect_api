export default function makeUsersRepository({ userDb }) {
    return Object.freeze({
        insert,
        findByEmail,
        findById,
        findAll,
        removeById,
        update,
    })

    async function insert(userInfo) {
        const result = await userDb.create({ ...userInfo })

        return cleanUser(result)
    }

    async function findByEmail(email) {
        const result = await userDb.findOne({ email })

        return cleanUser(result)
    }

    async function findById(id) {
        const result = await userDb.findById(id)

        return cleanUser(result)
    }

    async function findAll() {
        const users = await userDb.find()
        return users.map((user) => {
            cleanUser(user)
        })
    }

    async function removeById(id) {
        const result = await userDb.findByIdAndRemove(id)

        return cleanUser(result)
    }

    async function update(id, changes) {
        const result = await userDb.findByIdAndUpdate(id, changes, {
            new: true,
        })

        return cleanUser(result)
    }
}

// renames _id to id and removes __v
function cleanUser(user) {
    if (!user) {
        return null
    }

    const { _id: id, __v, ...remainingFields } = user.toObject()
    return { id, ...remainingFields }
}
