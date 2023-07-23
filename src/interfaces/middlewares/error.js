import ErrorResponse from '../utils/errorResponse'

const errorHandler = (err, req, res, next) => {
    let error = { ...err }

    error.message = err.message

    // console.log(err);

    if (err.name === 'CastError') {
        const message = `Bootcamp with id ${err.value} cannot be found`
        error = new ErrorResponse(message, 404)
    }

    if (err.code === 11000) {
        const message = `Duplicate key value ${Object.keys(err.keyValue)[0]}: ${
            err.keyValue['name']
        }`
        error = new ErrorResponse(message, 400)
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error',
    })
}

export default errorHandler
