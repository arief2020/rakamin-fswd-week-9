const express = require("express");
const Movie = require("../controller/movieController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Movies:
 *       type: object
 *       properties: 
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         genres:
 *           type: string
 *         year:
 *           type: string
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * tags:
 *   name: Movies
 *   description: movies api
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Retrieve a list of movies
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination (default "1")
 *       - in: query
 *         name: limit
 *         description: The maximum number of movies to return per page (default "10")
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 * 
 *     responses:
 *       '200':
 *         description: A paginated list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movies'
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

router.get("/",  Movie.getAll);
/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get data movie by ID.
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID for movies.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success get data movies by id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movies'
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: Movies not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Movies Not Found
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

router.get("/:id",  Movie.getMoviesById);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create a new movie.
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the movie.
 *               genres:
 *                 type: string
 *                 description: The genres of the movie.
 *               year:
 *                 type: string
 *                 description: The release year of the movie.
 *             required:
 *               - title
 *               - genres
 *               - year
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Success creating a new movie.
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

router.post("/",  Movie.store);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update movie by ID.
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the movie to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the movie.
 *               genres:
 *                 type: string
 *                 description: The updated genres of the movie.
 *               year:
 *                 type: string
 *                 description: The updated release year of the movie.
 *             required:
 *               - title
 *               - genres
 *               - year
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success updating the movie.
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
 *         description: Movie not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Movie Not Found
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

router.put("/:id",  Movie.update);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID.
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the movie to delete.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success deleting the movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: Movie not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Movie not found
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

router.delete("/:id",  Movie.delete);

module.exports = router;
