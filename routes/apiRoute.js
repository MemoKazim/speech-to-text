const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const authController = require("../controllers/authController");

router
  .route("/?*")
  .all(authController.isAuthenticated)
  .all(authController.isAdmin);

router.route("/reports").get(apiController.getReports);

router
  .route("/reports/new")
  .get(apiController.getNewReport)
  .post(apiController.postNewReport);

router
  .route("/report/:id")
  .get(apiController.getReport)
  .put(apiController.putReport)
  .delete(apiController.deleteReport);

router.route("/?*").all(apiController.methodNotAllowed);

module.exports = router;
