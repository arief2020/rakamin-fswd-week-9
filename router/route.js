const express = require('express')

const router = express.Router()

const movieRouter = require('./movie')
const userRouter = require('./user')

router.use('/api/movies', movieRouter)
router.use('/api/users', userRouter)

module.exports = router