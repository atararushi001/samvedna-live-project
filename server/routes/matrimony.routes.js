const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

const matrimonyController = require("../controllers/matrimony.controller");

router.post("/register", matrimonyController.register);
router.post("/login", matrimonyController.login);
router.put("/update", authMiddleware("Matrimony"), matrimonyController.update);
router.get("/users", authMiddleware("Matrimony"), matrimonyController.getUsers);
router.get("/user", authMiddleware("Matrimony"), matrimonyController.getById);
router.get(
  "/user/:id",
  authMiddleware("Matrimony"),
  matrimonyController.getFullUser
);
router.get(
  "/search/:search",
  authMiddleware("Matrimony"),
  matrimonyController.search
);
router.get("/", matrimonyController.getAll);

module.exports = router;
