import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import fileupload from 'express-fileupload'
import path from 'path'
import cookieParser from 'cookie-parser'
import connectDB from './config/db'

dotenv.config({ path: './config/config.env' })

import errorHandler from './src/interfaces/middlewares/error'
import logger from './src/interfaces/middlewares/logger'

import usersRouter from './src/interfaces/routes/usersRoute'
import bootcampsRouter from './src/interfaces/routes/bootcampsRoute'
import coursesRouter from './src/interfaces/routes/coursesRoute'
import reviewsRouter from './src/interfaces/routes/reviewsRoute'

connectDB()

const app = express()

// Body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// File uploading
app.use(fileupload())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Logger middleware
app.use(logger)

// Mount routers
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/bootcamps', bootcampsRouter)
app.use('/api/v1/courses', coursesRouter)
app.use('/api/v1/reviews', reviewsRouter)

// Error(from routers) handler middleware
app.use(errorHandler)

const PORT = process.env.PORT || 1245

const server = app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bold
            .yellow
    )
})

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`.red)
    server.close(() => {
        process.exit(1)
    })
})
