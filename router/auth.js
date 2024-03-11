const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const Auth = require("../controller/authController");

const router = express.Router();
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

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new users.
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
 *               confirmPassword:
 *                 type: string
 *                 description: The confirm password of the users.
 *               role:
 *                 type: string
 *                 description: The release role of the users.
 *               gender:
 *                 type: string
 *                 description: The release role of the users.
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *               - role
 *               - gender
 *     responses:
 *       201:
 *         description: Success creating a new users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *                   description: Bad Request
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Internal Server Error
 */

router.post("/register", Auth.register);
/**
 * @swagger
 * /api/auth/login:
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

router.post("/login", Auth.login);

module.exports = router;
