const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async (request, response) => {
    const candidate = await User.findOne({ email: request.body.email })

    if (candidate) {
        const passwordSuccess = bcrypt.compareSync(request.body.password, candidate.password)

        if (passwordSuccess) {
            // Генерация токена:
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 3600 })

            response.status(200).json({ token: `Bearer ${token}` })
        } else {
            response.status(401).json({
                message: 'Неверный пароль'
            })
        }
    } else {
        response.status(404).json({
            message: 'Пользователя с таким email не существует!'
        })
    }
}

module.exports.registry = async (request, response) => {
    // Нужно проверить, есть ли в БД юзер с таким email:
    const candidate = await User.findOne({ email: request.body.email })

    if (candidate) {
        response.status(409).json({
            message: 'Пользователь с таким email уже существует!'
        })
    } else {
        // Создадим юзера и сохраним его в базу, зашифровав пароль:
        const { password, email } = request.body
        const salt = bcrypt.genSaltSync(10) // уникальный хэш для шифрования пароля

        const user = new User({
            email,
            password: bcrypt.hashSync(password, salt) // само шифрование + создание хэша
        })

        try {
            await user.save()
            response.status(201).json(user)
        } catch(error) {
            errorHandler(response, error)
        }
    }
}
