const express = require("express");
const Movie = require("../controller/movieController");
const { authorization } = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", Movie.getAll);

router.get("/:id",  Movie.getMoviesById);


router.post("/",  Movie.store);


router.put("/:id",  Movie.update);


router.delete("/:id",  Movie.delete);

module.exports = router;
