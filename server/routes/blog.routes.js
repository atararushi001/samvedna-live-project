const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blog.controller");

router.get("/", blogController.getAll);
router.get("/:id", blogController.getById);
router.post("/", blogController.create);
router.put("/:id", blogController.update);
router.delete("/:id", blogController.delete);

module.exports = router;
