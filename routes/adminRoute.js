const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");

router
  .route("/?*")
  .all(authController.isAuthenticated)
  .all(authController.isAdmin);

router.get("/dashboard", adminController.getDashboard);
router.get("/reports", adminController.getReports);
router.get("/reports/new", adminController.getNewReport);
router.post(
  "/reports/new",
  adminController.upload.array("files"),
  adminController.postUpload
);
router.get("/reports/:id", adminController.getReport);

module.exports = router;
