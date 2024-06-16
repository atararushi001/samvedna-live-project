const express = require("express");
const router = express.Router();

const matrimonyController = require("../controllers/matrimony.controller");

router.get("/", matrimonyController.getAll);
router.post("/register", matrimonyController.register);
router.post("/login", matrimonyController.login);

module.exports = router;
