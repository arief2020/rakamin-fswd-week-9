const express = require("express");
const User = require("../controller/userController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       properties: 
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *         gender:
 *           type: string
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * tags:
 *   name: Users
 *   description: users api
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination (default "1")
 *       - in: query
 *         name: limit
 *         description: The maximum number of users to return per page (default "10")
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 * 
 *     responses:
 *       '200':
 *         description: A paginated list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                         id:
 *                           type: integer
 *                         email:
 *                           type: string
 *                         role:
 *                           type: string
 *                         gender:
 *                           type: string
 *                 message:
 *                   type: string
 *                   description: Success message
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.get("/", verifyToken, User.getAll);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get data users by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID for users.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success get data users by id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Users'
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: Users not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Users Not Found
 *       500:
 *         description: Error internal server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Internal Server Error
 */
router.get("/:id", User.getUsersById);
/**
 * @swagger
 * /api/users:
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

router.post("/", User.store);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update users by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the users to update.
 *         schema:
 *           type: integer
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success updating the users.
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
 *       404:
 *         description: Users not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Users Not Found
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


router.put("/:id", User.update);
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a users by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the users to delete.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success deleting the users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: Users not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Users not found
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

router.delete("/:id", User.delete);

module.exports = router;
