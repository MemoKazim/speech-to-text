const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { promisify } = require("util");

exports.getSignup = (req, res, next) => {
  res.render("admin/pages/signup");
};
exports.postSignup = (req, res, next) => {
  const newUser = new User({
    username: validator.escape(req.body.username),
    password: validator.escape(req.body.password),
    email: validator.escape(req.body.email),
    role: "user",
  });
  newUser.save();
  res.status(200).redirect("/login");
};

exports.getLogin = async (req, res, next) => {
  res.render("admin/pages/login", { message: undefined });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const cookieOptions = {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    httpOnly: true,
  };
  if (!email || !password) {
    return res.status(401).render("admin/pages/login", {
      message: "Incorrect email or password",
    });
  }
  const user = await User.find({ email: email }).select("+password");
  const result = await user[0].correctPassword(user[0].password, password);
  if (!result || !user) {
    return res.status(401).render("admin/pages/login", {
      message: "Incorrect email or password",
    });
  }
  const token = jwt.sign({ id: user[0]._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  if (user[0].role == "admin") {
    return res
      .status(200)
      .cookie("jwt", token, cookieOptions)
      .redirect("/admin/dashboard");
  } else {
    return res
      .status(200)
      .cookie("jwt", token, cookieOptions)
      .render("error/error_client", {
        status_code: "403",
        message: "Forbidden",
      });
  }
};
exports.forgotPassword = async (req, res) => {
  //
};
exports.isAuthenticated = async (req, res, next) => {
  if (!req.headers.cookie || req.headers.cookie === undefined) {
    return res.status(401).render("error/error_client", {
      status_code: 401,
      message: "Unauthorized",
    });
  }
  let token = req.headers.cookie.split("=")[1];

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = await User.findById(decode.id);
  if (!freshUser) {
    return res.status(401).render("error/error_client", {
      status_code: 401,
      message: "This user with this token is no longer exists",
    });
  }
  next();
};

exports.isAdmin = async (req, res, next) => {
  if (!req.headers.cookie || req.headers.cookie === undefined) {
    return res.status(401).render("error/error_client", {
      status_code: 401,
      message: "Unauthorized",
    });
  }
  let token = req.headers.cookie.split("=")[1];

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = await User.findById(decode.id);
  if (!freshUser) {
    return res.status(401).render("error/error_client", {
      status_code: 401,
      message: "This user with this token is no longer exists",
    });
  }
  if (freshUser.role == "user") {
    return res.status(401).render("error/error_client", {
      status_code: 401,
      message: "Unauthorized",
    });
  }
  next();
};

exports.logoff = async (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).redirect("/");
};

// TODO: Security Failure. Need to change logic
exports.postRegister = async (req, res, next) => {
  const username = "admin";
  const password = "admin";
  const email = "admin@admin.com";
  const role = "admin";
  const newUser = new User({
    username: validator.escape(username),
    password: validator.escape(password),
    email: validator.escape(email),
    role: validator.escape(role),
  });
  newUser.save();
  res.status(200).render("admin/pages/login", { message: null });
};
