const express = require('express')
const authRoutes = require('./routes/auth')
const orderRoutes = require('./routes/order')
const categoryRoutes = require('./routes/category')
const positionRoutes = require('./routes/position')
const analyticsRoutes = require('./routes/analytics')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('Success connection to mean-db!'))
    .catch(error => console.error(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.use('/api/auth', authRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/analytics', analyticsRoutes)

module.exports = app
