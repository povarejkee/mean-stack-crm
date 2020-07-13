module.exports.analytics = (request, response) => {
    response.status(200).json({
        order: 'from analytics'
    })
}

module.exports.overview = (request, response) => {
    response.status(200).json({
        order: 'from overview'
    })
}
