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
  requestController.getAcceptedByUser
);
router.get(
  "/accepted-others",
  authMiddleware("Matrimony"),
  requestController.getAcceptedByOthers
);
router.get(
  "/rejected",
  authMiddleware("Matrimony"),
  requestController.getRejectedByUser
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
module.exports = router;
