const mongoose = require('mongoose')

const connectDB = async () => {
    mongoose.set('strictQuery', true)
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
    })

    console.log(
        `Mongoose Connected to: ${conn.connection.host}`.cyan.underline.bold
    )
}

module.exports = connectDB
