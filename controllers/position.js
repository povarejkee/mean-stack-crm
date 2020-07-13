const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getAllByCategory = async (request, response) => {
    try {
        const positions = await Position.find({
            category: request.params.categoryId,
            user: request.user.id
        })

        response.status(200).json(positions)
    } catch(error) {
        errorHandler(response, error)
    }
}

module.exports.create = async (request, response) => {
    try {
        const { name, cost, category } = request.body
        const position = await new Position({
            name, cost, category,
            user: request.user.id
        })

        await position.save()

        response.status(201).json(position)
    } catch(error) {
        errorHandler(response, error)
    }
}

module.exports.edit = async (request, response) => {
    try {
        const updatedPosition = await Position.findOneAndUpdate(
                { _id: request.params.id },
                { $set: request.body },
                { new: true } // обязательное действие. Без этого БД отдаст не обновленную позицию
            )

        response.status(200).json(updatedPosition)
    } catch(error) {
        errorHandler(response, error)
    }
}

module.exports.remove = async (request, response) => {
    try {
        await Position.remove({ _id: request.params.id })
        response.status(200).json({ message: 'Позиция была удалена' })
    } catch(error) {
        errorHandler(response, error)
    }
}


