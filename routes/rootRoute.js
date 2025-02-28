const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Be careful for this function!!!
router.route("/register").post(authController.postRegister);

router.get("/", (req, res) => {
  res.redirect("/login");
});

router
  .route("/login")
  .get(authController.getLogin)
  .post(authController.postLogin);

router
  .route("/signup")
  .get(authController.getSignup)
  .post(authController.postSignup);

router.route("/logoff").get(authController.logoff);

router.get("*", (req, res) => {
  res.render("error/error_client", {
    status_code: 404,
    message: "Page not found!",
  });
});

module.exports = router;
