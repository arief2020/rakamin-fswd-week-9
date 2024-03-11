const express = require("express");
const Movie = require("../controller/movieController");
const { authorization } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", Movie.getAll);

router.get("/:id", Movie.getMoviesById);

router.post("/", authorization, Movie.store);

router.put("/:id", authorization, Movie.update);

router.delete("/:id", authorization, Movie.delete);

module.exports = router;
