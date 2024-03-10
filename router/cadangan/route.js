const express = require('express')

const router = express.Router()

const swaggerRouter = require('../swagger')
const movieRouter = require('./movie')
const userRouter = require('./user')
const authRouter = require('./auth')
// const { verifyToken } = require('../middleware/verifyToken')

router.use('/api/auth', authRouter)
router.use('/api-docs', swaggerRouter)

// router.use(verifyToken)
router.use('/api/movies', movieRouter)
router.use('/api/users', userRouter)




module.exports = router