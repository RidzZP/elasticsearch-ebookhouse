const express = require("express");
const router = express.Router();
const searchJoinBookhouseController = require("../controllers/searchJoinBookhouseController");

router.get("/", searchJoinBookhouseController.searchBookhouse);

module.exports = router;
