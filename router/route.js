const express = require('express')

const router = express.Router()

const swaggerRouter = require('../swagger')
const movieRouter = require('./movie')
const userRouter = require('./user')
const User = require('../controller/userController')

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * tags:
 *   name: Auth
 *   description: users api
 */

router.use('/api/movies', movieRouter)
router.use('/api/users', userRouter)
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login users.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the users.
 *               password:
 *                 type: string
 *                 description: The password of the users.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Success login users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: JWT token
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Wrong Password
 *       404:
 *         description: Not Found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Users with this email not found
 */

router.post('/api/login', User.login)
router.use('/api-docs', swaggerRouter)

module.exports = router