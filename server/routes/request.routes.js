const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

const requestController = require("../controllers/request.controller");

router.post(
  "/send-request/:id",
  authMiddleware("Matrimony"),
  requestController.create
);
router.put(
  "/accept-request/:id",
  authMiddleware("Matrimony"),
  requestController.acceptRequest
);
router.put(
  "/reject-request/:id",
  authMiddleware("Matrimony"),
  requestController.rejectRequest
);
router.get(
  "/get-all",
  authMiddleware("Matrimony"),
  requestController.getAllUserRequests
);
router.get(
  "/accepted",
  authMiddleware("Matrimony"),
  requestController.getAcceptedByMe
);
router.get(
  "/accepted-others",
  authMiddleware("Matrimony"),
  requestController.getAcceptedByOthers
);
router.get(
  "/rejected",
  authMiddleware("Matrimony"),
  requestController.getRejectedByMe
);
router.get(
  "/rejected-others",
  authMiddleware("Matrimony"),
  requestController.getRejectedByOthers
);
router.get(
  "/pending",
  authMiddleware("Matrimony"),
  requestController.getAllPending
);
router.delete(
  "/delete/:id",
  authMiddleware("Matrimony"),
  requestController.delete
);
router.get("/", authMiddleware("Matrimony"), requestController.getAllAccpeted);
module.exports = router;
