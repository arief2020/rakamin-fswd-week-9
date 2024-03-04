const express = require("express");
const Movie = require("../controller/movieController");

const router = express.Router();

router.get("/", Movie.getAll);
router.get("/:id", Movie.getMoviesById);

module.exports = router;
