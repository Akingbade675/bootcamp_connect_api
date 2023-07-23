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
        const newUser = await userDb.create(userInfo)
        return {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        }
    }

    async function findByEmail(email) {
        const user = await userDb.findOne({ email })
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            password: user.password,
        }
    }

    async function findById(id) {
        const user = await userDb.findById(id)
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    }

    async function findAll() {
        const users = await userDb.find()
        return users.map((user) => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }))
    }

    async function removeById(id) {
        const user = await userDb.findByIdAndRemove(id)
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    }

    async function update({ id, ...changes }) {
        const updatedUser = await userDb.findByIdAndUpdate(id, changes, {
            new: true,
        })
        return {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        }
    }
}
