const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blog.controller");
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", blogController.getAll);
router.get("/:id", blogController.getById);
router.post("/", authMiddleware("Admin"), blogController.create);
router.put("/:id", authMiddleware("Admin"), blogController.update);
router.delete("/:id", authMiddleware("Admin"), blogController.delete);

module.exports = router;
