const express = require("express");
const Movie = require("../controller/movieController");
const User = require("../controller/userController");

const router = express.Router();

router.get("/", User.getAll);
router.get("/:id", User.getUsersById);

module.exports = router;
