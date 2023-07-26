import {
    bootcampsRepository,
    coursesRepository,
} from '../../../domain/repositories'
import ErrorResponse from '../../../interfaces/utils/errorResponse'
import geocoder from '../../../infrastructure/externalServices/geocoder'
import parseFile from '../../../infrastructure/externalServices/parseFile'
import makeGetBootcamp from './get-bootcamp'
import makeGetBootcamps from './get-bootcamps'
import makeCreateBootcamp from './create-bootcamp'
import makeUpdateBootcamp from './update-bootcamp'
import makeDeleteBootcamp from './delete-bootcamp'
import makeGetBootcampsInRadius from './get-bootcamp-in-radius'
import makeUploadBootcampPhoto from './upload-bootcamp-photo'

const getBootcamp = makeGetBootcamp({
    bootcampsRepository,
    coursesRepository,
    ErrorResponse,
})
const getBootcamps = makeGetBootcamps({
    bootcampsRepository,
})
const createBootcamp = makeCreateBootcamp({
    bootcampsRepository,
    ErrorResponse,
})
const updateBootcamp = makeUpdateBootcamp({
    bootcampsRepository,
    ErrorResponse,
})
const deleteBootcamp = makeDeleteBootcamp({
    bootcampsRepository,
    ErrorResponse,
})
const getBootcampsInRadius = makeGetBootcampsInRadius({
    bootcampsRepository,
    geocoder,
})
const uploadBootcampPhoto = makeUploadBootcampPhoto({
    bootcampsRepository,
    parseFile,
    ErrorResponse,
})

const bootcampService = Object.freeze({
    getBootcamp,
    getBootcamps,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    uploadBootcampPhoto,
})

export default bootcampService
export {
    getBootcamp,
    getBootcamps,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    uploadBootcampPhoto,
}
