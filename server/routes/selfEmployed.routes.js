const express = require("express");
const router = express.Router();

const selfEmployedController = require("../controllers/selfEmployed.controller");

router.get("/", selfEmployedController.getAll);
router.post("/register", selfEmployedController.create);

module.exports = router;
