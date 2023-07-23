import jwt from 'jsonwebtoken'

export default function signedToken() {
    return Object.freeze({
        encode,
        decode,
    })

    function encode(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        })
    }

    function decode(token) {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}
