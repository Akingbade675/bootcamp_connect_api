import { makeAddReview } from './src/application/usecases/reviews/add-review.js'
import { makeReview } from './src/domain/entities/review.js'
import { ErrorResponse } from './src/interfaces/utils/error-response.js'

describe('addReview', () => {
    let bootcampsRepository
    let reviewsRepository
    let addReview

    beforeEach(() => {
        bootcampsRepository = {
            findById: jest.fn(),
        }
        reviewsRepository = {
            findByBootcampIdAndUserId: jest.fn(),
            insert: jest.fn(),
        }
        addReview = makeAddReview({
            bootcampsRepository,
            reviewsRepository,
            ErrorResponse,
        })
    })

    it('should throw an error if bootcampId is not provided', async () => {
        await expect(addReview({ currentUserId: '123' })).rejects.toThrow(
            new ErrorResponse('You must supply a bootcamp id.', 400)
        )
    })

    it('should throw an error if no bootcamp is found with the given id', async () => {
        bootcampsRepository.findById.mockResolvedValue(null)

        await expect(
            addReview({ bootcampId: '123', currentUserId: '456' })
        ).rejects.toThrow(
            new ErrorResponse('No bootcamp with the id of 123', 404)
        )
    })

    it('should throw an error if the bootcamp owner tries to submit a review', async () => {
        bootcampsRepository.findById.mockResolvedValue({ user: '123' })

        await expect(
            addReview({ bootcampId: '123', currentUserId: '123' })
        ).rejects.toThrow(
            new ErrorResponse('The bootcamp owner cannot submit a review', 400)
        )
    })

    it('should throw an error if the user has already submitted a review for the bootcamp', async () => {
        bootcampsRepository.findById.mockResolvedValue({ user: '123' })
        reviewsRepository.findByBootcampIdAndUserId.mockResolvedValue({
            user: '123',
        })

        await expect(
            addReview({ bootcampId: '123', currentUserId: '456' })
        ).rejects.toThrow(
            new ErrorResponse(
                'The user has already submitted a review for this bootcamp',
                400
            )
        )
    })

    it('should insert a new review and return it', async () => {
        const reviewInfo = {
            title: 'Test Review',
            text: 'This is a test review',
            rating: 5,
        }
        const bootcamp = { id: '123', user: '456' }
        const currentUserId = '456'
        const review = makeReview({
            ...reviewInfo,
            bootcamp: bootcamp.id,
            user: currentUserId,
        })
        const insertedReview = {
            id: '789',
            ...reviewInfo,
            bootcamp: bootcamp.id,
            user: currentUserId,
            createdAt: new Date(),
        }

        bootcampsRepository.findById.mockResolvedValue(bootcamp)
        reviewsRepository.findByBootcampIdAndUserId.mockResolvedValue(null)
        reviewsRepository.insert.mockResolvedValue(insertedReview)

        const result = await addReview({
            bootcampId: bootcamp.id,
            currentUserId,
            ...reviewInfo,
        })

        expect(bootcampsRepository.findById).toHaveBeenCalledWith({
            id: bootcamp.id,
        })
        expect(
            reviewsRepository.findByBootcampIdAndUserId
        ).toHaveBeenCalledWith({
            bootcampId: bootcamp.id,
            userId: currentUserId,
        })
        expect(reviewsRepository.insert).toHaveBeenCalledWith({
            title: review.getTitle(),
            text: review.getText(),
            rating: review.getRating(),
            user: review.getUser(),
            bootcamp: review.getBootcamp(),
            createdAt: review.getCreatedDate(),
        })
        expect(result).toEqual(insertedReview)
    })
})
