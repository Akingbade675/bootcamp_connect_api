export default function defineMakeBootcamp({ slugify, ErrorResponse }) {
    const websiteRegex =
        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%._\+~#?&//=]*)$/
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const REQUIRED_CAREERS = [
        'Web Development',
        'Mobile Development',
        'UI/UX',
        'Data Science',
        'Business',
        'Other',
    ]

    return function makeBootcamp({
        name,
        slug,
        description,
        website,
        phone,
        email,
        address,
        location,
        careers = [],
        averageRating,
        averageCost,
        photo = 'no-photo.jpg',
        housing = false,
        jobAssistance = false,
        jobGuarantee = false,
        acceptGi = false,
        createdAt = Date.now(),
        user,
        courses,
    } = {}) {
        if (!name) {
            throw new ErrorResponse('Bootcamp must have a name', 400)
        }

        if (!description) {
            throw new ErrorResponse('Bootcamp must have a description', 400)
        }

        if (website && !websiteRegex.test(website)) {
            throw new ErrorResponse(
                'Bootcamp must have a valid website URL',
                400
            )
        }

        if (phone && (phone.length < 10 || phone.length > 20)) {
            throw new ErrorResponse(
                'Bootcamp phone must be between 10 and 20 characters',
                400
            )
        }

        if (email && !emailRegex.test(email)) {
            throw new ErrorResponse('Bootcamp must have a valid email', 400)
        }

        if (!address) {
            throw new ErrorResponse('Bootcamp must have an address', 400)
        }

        if (careers.length === 0) {
            throw new ErrorResponse(
                'Bootcamp must have at least one career',
                400
            )
        }

        careers.forEach((career) => {
            if (!REQUIRED_CAREERS.includes(career)) {
                throw new ErrorResponse(
                    `Bootcamp career must be one of the following: ${REQUIRED_CAREERS.join(
                        ', '
                    )}`,
                    400
                )
            }
        })

        if (averageRating && (averageRating < 1 || averageRating > 10)) {
            throw new ErrorResponse(
                'Bootcamp average rating must be between 1 and 10',
                400
            )
        }

        if (!user) {
            throw new ErrorResponse(
                'Bootcamp must be associated to a valid user',
                400
            )
        }

        // Generate slug
        slug = slugify(name, { lower: true })

        return Object.freeze({
            getName: () => name,
            getSlug: () => slug,
            getDescription: () => description,
            getWebsite: () => website,
            getPhone: () => phone,
            getEmail: () => email,
            getAddress: () => address,
            getLocation: () => location,
            getCareers: () => careers,
            getAverageRating: () => averageRating,
            getAverageCost: () => averageCost,
            getPhoto: () => photo,
            getHousing: () => housing,
            getJobAssistance: () => jobAssistance,
            getJobGuarantee: () => jobGuarantee,
            getAcceptGi: () => acceptGi,
            getCreatedDate: () => createdAt,
            getCourses: () => courses,
            getUser: () => user,
        })
    }
}
