const pagination = (params) => {
    if (Object.entries(params).length === 0) {
        return ""
    }
    let {limit, page} = params

    limit = limit || 1
    page = page || 10

    return `LIMIT ${limit} OFFSET ${(page - 1) * limit}`
}

module.exports = pagination