import bcrypt from 'bcryptjs'

export default function encrypt() {
    return Object.freeze({
        compareHash,
        hash,
    })

    async function compareHash(value, hash) {
        return await bcrypt.compare(value, hash)
    }

    async function hash(value) {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(value, salt)
    }
}
