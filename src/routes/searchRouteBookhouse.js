const express = require("express");
const router = express.Router();
const searchBookhouseController = require("../controllers/searchBookhouseController");

router.get("/", searchBookhouseController.autocompleteBookhouse);

module.exports = router;
