export default advancedResult = async (model, requestQuery, populate) => {
    let query

    // Copy requestQuery
    let reqQuery = { ...requestQuery }
    // console.log(reqQuery);

    // Fields to exclude
    const operators = ['select', 'sort', 'page', 'limit']

    // Loop over operators and remove them from requestQuery
    operators.forEach((operator) => delete requestQuery[operator])

    // Create query string
    let queryStr = JSON.stringify(requestQuery)

    // create operators ($gt, $gte, $lt etc...) from (gt, gte, lt etc...)
    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    )

    // Getting all bootcamp and populating all its courses
    query = model.find(JSON.parse(queryStr))

    if (reqQuery.select) {
        const options = reqQuery.select.replace(',', ' ')
        query = query.select(options)
    }

    if (reqQuery.sort) {
        const options = reqQuery.sort.replace(',', ' ')
        query = query.sort(options)
    } else {
        query = query.sort('-createdAt')
    }

    const page = parseInt(reqQuery.page, 10) || 1
    const limit = parseInt(reqQuery.limit, 10) || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    query = query.skip(startIndex).limit(limit)

    if (populate) {
        query = query.populate(populate)
    }

    const result = await query

    const total = model.countDocuments()

    // Pagination
    let pagination = {}
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        }
    }
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        }
    }

    return {
        pagination,
        data: result,
    }
}
